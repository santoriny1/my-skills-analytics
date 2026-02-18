'use client'

import { useMemo, useState } from 'react'
import KPICard from '@/components/kpi-card'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'

import { employees } from '@/lib/employees'
import { backlog } from '@/lib/estimation/mock-backlog'
import { historicalProjects } from '@/lib/estimation/mock-historical-projects'
import { estimateBacklogItem } from '@/lib/estimation/estimator'

function pillClasses(tech: string) {
	// Tailwind utility-only palette (no custom CSS).
	switch (tech) {
		case 'React':
			return 'bg-sky-500/15 text-sky-700 dark:text-sky-300 border border-sky-500/20'
		case 'Node.js':
			return 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20'
		case 'AWS':
			return 'bg-amber-500/15 text-amber-800 dark:text-amber-300 border border-amber-500/20'
		case 'Azure':
			return 'bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 border border-indigo-500/20'
		case '.NET':
			return 'bg-violet-500/15 text-violet-700 dark:text-violet-300 border border-violet-500/20'
		case 'DevOps':
			return 'bg-rose-500/15 text-rose-700 dark:text-rose-300 border border-rose-500/20'
		case 'Data Science':
			return 'bg-cyan-500/15 text-cyan-800 dark:text-cyan-300 border border-cyan-500/20'
		case 'AI/ML':
			return 'bg-fuchsia-500/15 text-fuchsia-700 dark:text-fuchsia-300 border border-fuchsia-500/20'
		default:
			return 'bg-muted text-muted-foreground border border-border'
	}
}

function TechPills({ items }: { items: string[] }) {
	return (
		<div className='flex flex-wrap gap-2'>
			{items.map((t) => (
				<span
					key={t}
					className={`text-xs px-2 py-1 rounded-md ${pillClasses(t)}`}>
					{t}
				</span>
			))}
		</div>
	)
}

export default function EstimationPage() {
	const [selectedBacklogId, setSelectedBacklogId] = useState<string>(
		backlog[0]?.id ?? '',
	)

	const selectedItem = useMemo(() => {
		return backlog.find((b) => b.id === selectedBacklogId) ?? backlog[0]
	}, [selectedBacklogId])

	const estimation = useMemo(() => {
		if (!selectedItem) return null
		return estimateBacklogItem({
			backlogItem: selectedItem,
			employees,
			historicalProjects,
		})
	}, [selectedItem])

	const topSimilarProjects = useMemo(() => {
		if (!estimation) return []
		return estimation.similarProjects.slice(0, 6)
	}, [estimation])

	return (
		<div className='space-y-6'>
			{/* Header */}
			<div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
				<div>
					<h1 className='text-4xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
						AI Estimation Assistant
					</h1>
					<p className='text-muted-foreground mt-1'>
						Estimate real development effort using historical projects, the
						current backlog, and MySkills signals
					</p>
				</div>

				<div className='flex items-center gap-3'>
					<label
						htmlFor='backlog'
						className='text-sm font-medium'>
						Backlog item:
					</label>
					<Select
						value={selectedBacklogId}
						onValueChange={setSelectedBacklogId}>
						<SelectTrigger
							id='backlog'
							className='w-80'>
							<SelectValue placeholder='Select an item' />
						</SelectTrigger>
						<SelectContent>
							{backlog.map((item) => (
								<SelectItem
									key={item.id}
									value={item.id}>
									{item.title}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
			</div>

			{/* KPI Row */}
			{estimation && selectedItem && (
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
					<KPICard
						title='Similar Projects'
						value={estimation.projectCount}
						description='Used for calibration'
					/>
					<KPICard
						title='Estimated Range'
						value={`${estimation.minHours}–${estimation.maxHours}h`}
						description={`Confidence: ${estimation.confidenceLabel}`}
					/>
					<KPICard
						title='Historical Variance'
						value={`${Math.round(estimation.avgHistoricalVariancePercent)}%`}
						description='Avg (actual vs estimated)'
					/>
					<KPICard
						title='Team Fit (MySkills)'
						value={estimation.matchingEmployees.total}
						description='Devs with required skills'
					/>
				</div>
			)}

			{/* Content */}
			{selectedItem && estimation && (
				<div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
					<div className='lg:col-span-2 space-y-6'>
						<div className='rounded-2xl bg-linear-to-r from-blue-600 to-purple-600 p-px shadow-sm'>
							<Card className='rounded-2xl'>
								<CardHeader>
									<CardTitle className='text-xl'>AI Estimate</CardTitle>
								</CardHeader>
								<CardContent className='space-y-3'>
									<p className='text-sm text-muted-foreground'>
										{estimation.aiNarrative}
									</p>
									<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
										<div className='rounded-lg border bg-card p-4'>
											<div className='text-sm font-medium'>Backlog item</div>
											<div className='text-sm text-muted-foreground mt-1'>
												{selectedItem.description}
											</div>
										</div>
										<div className='rounded-lg border bg-card p-4 space-y-2'>
											<div className='text-sm font-medium'>Signals used</div>
											<div className='text-xs text-muted-foreground'>
												Complexity:{' '}
												<span className='font-medium'>
													{selectedItem.complexity}
												</span>
											</div>
											<div className='text-xs text-muted-foreground'>
												Sample:{' '}
												<span className='font-medium'>
													{estimation.featureSampleSize}
												</span>{' '}
												comparable features
											</div>
											<div className='text-xs text-muted-foreground'>
												Seniority calibration:{' '}
												<span className='font-medium'>MySkills</span>
											</div>
										</div>
									</div>
								</CardContent>
							</Card>
						</div>

						<Card className='rounded-2xl shadow-sm'>
							<CardHeader>
								<CardTitle className='text-xl'>
									Similar project comparison
								</CardTitle>
							</CardHeader>
							<CardContent className='space-y-4'>
								<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
									<div className='rounded-lg border bg-card p-4 space-y-2'>
										<div className='text-sm font-medium'>Required stack</div>
										<TechPills items={selectedItem.techRequired} />
									</div>
									<div className='rounded-lg border bg-card p-4 space-y-2'>
										<div className='text-sm font-medium'>
											Top historical matches
										</div>
										<div className='text-sm text-muted-foreground'>
											{topSimilarProjects.length === 0
												? 'Not enough comparable projects in the sample.'
												: 'Projects with the highest stack overlap.'}
										</div>
									</div>
								</div>

								<div className='space-y-3'>
									{topSimilarProjects.map((sim) => (
										<div
											key={sim.project.id}
											className='rounded-lg border bg-card p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3'>
											<div className='min-w-0'>
												<div className='text-sm font-medium truncate'>
													{sim.project.name}
												</div>
												<div className='text-xs text-muted-foreground mt-1'>
													Overlap: {(sim.overlapScore * 100).toFixed(0)}% •
													Comparable features: {sim.matchingFeatures.length}
												</div>
											</div>
											<div className='md:text-right'>
												<TechPills items={sim.project.techStack} />
											</div>
										</div>
									))}
								</div>
							</CardContent>
						</Card>
					</div>

					<div className='space-y-6'>
						<Card className='rounded-2xl shadow-sm'>
							<CardHeader>
								<CardTitle className='text-xl'>Current backlog</CardTitle>
							</CardHeader>
							<CardContent className='space-y-3'>
								<div>
									<div className='text-sm font-medium'>
										{selectedItem.title}
									</div>
									<div className='text-sm text-muted-foreground mt-1'>
										{selectedItem.description}
									</div>
								</div>
								<div className='text-xs text-muted-foreground'>
									Complexity:{' '}
									<span className='font-medium'>{selectedItem.complexity}</span>
								</div>
								<div className='space-y-2'>
									<div className='text-sm font-medium'>Required tech</div>
									<TechPills items={selectedItem.techRequired} />
								</div>
							</CardContent>
						</Card>

						<Card className='rounded-2xl shadow-sm'>
							<CardHeader>
								<CardTitle className='text-xl'>Developers (MySkills)</CardTitle>
							</CardHeader>
							<CardContent className='space-y-3'>
								<div className='text-sm text-muted-foreground'>
									Matched by required tech and seniority.
								</div>

								<div className='grid grid-cols-3 gap-3'>
									<div className='rounded-lg border bg-card p-3'>
										<div className='text-xs text-muted-foreground'>Junior</div>
										<div className='text-lg font-bold'>
											{estimation.matchingEmployees.juniors}
										</div>
									</div>
									<div className='rounded-lg border bg-card p-3'>
										<div className='text-xs text-muted-foreground'>Mid</div>
										<div className='text-lg font-bold'>
											{estimation.matchingEmployees.mids}
										</div>
									</div>
									<div className='rounded-lg border bg-card p-3'>
										<div className='text-xs text-muted-foreground'>Senior</div>
										<div className='text-lg font-bold'>
											{estimation.matchingEmployees.seniors}
										</div>
									</div>
								</div>

								<div className='text-xs text-muted-foreground'>
									Note: this simulates a delivery-speed signal (more seniors →
									fewer hours).
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			)}
		</div>
	)
}
