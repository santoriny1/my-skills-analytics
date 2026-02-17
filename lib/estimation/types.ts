export type Complexity = 'Low' | 'Medium' | 'High'

export type HistoricalProjectFeature = {
	name: string
	complexity: Complexity
	estimatedHours: number
	realHours: number
}

export type HistoricalProject = {
	id: string
	name: string
	techStack: string[]
	features: HistoricalProjectFeature[]
}

export type BacklogItem = {
	id: string
	title: string
	description: string
	techRequired: string[]
	complexity: Complexity
}
