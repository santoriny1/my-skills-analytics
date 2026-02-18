import { Employee } from '@/lib/employees'
import {
	BacklogItem,
	Complexity,
	HistoricalProject,
	HistoricalProjectFeature,
} from './types'

type Percentiles = {
	p20: number
	p50: number
	p80: number
}

function clamp(value: number, min: number, max: number) {
	return Math.max(min, Math.min(max, value))
}

function roundHours(value: number) {
	return Math.max(1, Math.round(value))
}

function intersectionSize(a: string[], b: string[]) {
	const set = new Set(a)
	let count = 0
	for (const item of b) {
		if (set.has(item)) count += 1
	}
	return count
}

function techOverlapScore(required: string[], stack: string[]) {
	if (required.length === 0) return 0
	const overlap = intersectionSize(required, stack)
	return overlap / required.length
}

function complexityMultiplier(complexity: Complexity) {
	switch (complexity) {
		case 'Low':
			return 0.75
		case 'Medium':
			return 1.0
		case 'High':
			return 1.35
	}
}

function seniorityWeight(seniority: Employee['seniority']) {
	switch (seniority) {
		case 'Junior':
			return 0.85
		case 'Mid':
			return 1.0
		case 'Senior':
			return 1.15
	}
}

function percentile(sorted: number[], p: number) {
	if (sorted.length === 0) return 0
	const idx = (sorted.length - 1) * p
	const lo = Math.floor(idx)
	const hi = Math.ceil(idx)
	if (lo === hi) return sorted[lo]
	const w = idx - lo
	return sorted[lo] * (1 - w) + sorted[hi] * w
}

function computePercentiles(values: number[]): Percentiles {
	const sorted = [...values].sort((a, b) => a - b)
	return {
		p20: percentile(sorted, 0.2),
		p50: percentile(sorted, 0.5),
		p80: percentile(sorted, 0.8),
	}
}

function featureVariancePercent(feature: HistoricalProjectFeature) {
	if (feature.estimatedHours <= 0) return 0
	return (
		((feature.realHours - feature.estimatedHours) / feature.estimatedHours) *
		100
	)
}

export type SimilarProject = {
	project: HistoricalProject
	overlapScore: number
	matchingFeatures: HistoricalProjectFeature[]
}

export type EstimationResult = {
	minHours: number
	maxHours: number
	projectCount: number
	featureSampleSize: number
	aiNarrative: string
	confidenceLabel: 'High' | 'Medium' | 'Low'
	avgHistoricalVariancePercent: number
	matchingEmployees: {
		total: number
		juniors: number
		mids: number
		seniors: number
	}
	similarProjects: SimilarProject[]
}

export function findSimilarProjects(
	backlogItem: BacklogItem,
	historicalProjects: HistoricalProject[],
): SimilarProject[] {
	const scored = historicalProjects
		.map((project) => {
			const overlapScore = techOverlapScore(
				backlogItem.techRequired,
				project.techStack,
			)
			const matchingFeatures = project.features.filter(
				(f) => f.complexity === backlogItem.complexity,
			)
			return { project, overlapScore, matchingFeatures }
		})
		.filter((p) => p.overlapScore > 0)
		.sort((a, b) => b.overlapScore - a.overlapScore)

	return scored
}

export function estimateBacklogItem(args: {
	backlogItem: BacklogItem
	employees: Employee[]
	historicalProjects: HistoricalProject[]
}): EstimationResult {
	const { backlogItem, employees, historicalProjects } = args

	const similarProjects = findSimilarProjects(backlogItem, historicalProjects)
	const topSimilar = similarProjects.slice(0, 17) // keeps the “based on X” narrative realistic

	const comparableFeatures: HistoricalProjectFeature[] = []
	const variances: number[] = []

	for (const sim of topSimilar) {
		for (const feature of sim.project.features) {
			const overlap = intersectionSize(
				backlogItem.techRequired,
				sim.project.techStack,
			)
			if (overlap === 0) continue

			if (feature.complexity !== backlogItem.complexity) continue

			comparableFeatures.push(feature)
			variances.push(featureVariancePercent(feature))
		}
	}

	// Fallback: si no hay features con misma complejidad, usar features con overlap por tech.
	if (comparableFeatures.length === 0) {
		for (const sim of topSimilar) {
			for (const feature of sim.project.features) {
				comparableFeatures.push(feature)
				variances.push(featureVariancePercent(feature))
			}
		}
	}

	const historicalHours = comparableFeatures.map((f) => f.realHours)
	const stats = computePercentiles(historicalHours)

	const matched = employees.filter((emp) =>
		emp.skills.some((s) => backlogItem.techRequired.includes(s)),
	)

	const juniors = matched.filter((m) => m.seniority === 'Junior').length
	const mids = matched.filter((m) => m.seniority === 'Mid').length
	const seniors = matched.filter((m) => m.seniority === 'Senior').length

	const avgWeight =
		matched.length === 0
			? 0.95
			: matched.reduce((acc, emp) => acc + seniorityWeight(emp.seniority), 0) /
				matched.length

	// Ajustes (simulación "IA"):
	// - Complejidad: escalado suave
	// - Equipo: más senioridad -> menor tiempo
	const comp = complexityMultiplier(backlogItem.complexity)
	const teamFactor = 1 / clamp(avgWeight, 0.85, 1.15)

	const minHours = roundHours(stats.p20 * comp * teamFactor)
	const maxHours = roundHours(stats.p80 * comp * teamFactor)

	const projectCount = topSimilar.length
	const featureSampleSize = comparableFeatures.length

	const avgHistoricalVariancePercent =
		variances.length === 0
			? 0
			: variances.reduce((a, b) => a + b, 0) / variances.length

	const confidenceLabel: EstimationResult['confidenceLabel'] =
		projectCount >= 12 && featureSampleSize >= 18
			? 'High'
			: projectCount >= 6
				? 'Medium'
				: 'Low'

	const aiNarrative =
		`Based on ${projectCount} similar project(s), ` +
		`this feature will take between ${minHours}–${maxHours} hours. ` +
		`AI calibration applied using complexity, stack overlap, and seniority signal.`

	return {
		minHours: Math.min(minHours, maxHours),
		maxHours: Math.max(minHours, maxHours),
		projectCount,
		featureSampleSize,
		aiNarrative,
		confidenceLabel,
		avgHistoricalVariancePercent,
		matchingEmployees: {
			total: matched.length,
			juniors,
			mids,
			seniors,
		},
		similarProjects: topSimilar,
	}
}
