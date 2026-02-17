'use client'

import { useMemo, useState } from 'react'
import { employees, Employee } from '@/lib/employees'
import { analyzeEmployees, generateInsights } from '@/lib/analytics'
import KPICard from '@/components/kpi-card'
import SkillDistributionChart from '@/components/skill-distribution-chart'
import IndustryChart from '@/components/industry-chart'
import RiskAlerts from '@/components/risk-alerts'
import StrategicInsights from '@/components/strategic-insights'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'

type Region = 'All' | 'US' | 'LATAM' | 'EU'

export default function DashboardPage() {
	const [selectedRegion, setSelectedRegion] = useState<Region>('All')

	const filteredEmployees = useMemo(() => {
		if (selectedRegion === 'All') {
			return employees
		}
		return employees.filter((emp) => emp.region === selectedRegion)
	}, [selectedRegion])

	const analytics = useMemo(() => {
		return analyzeEmployees(filteredEmployees)
	}, [filteredEmployees])

	const insights = useMemo(() => {
		return generateInsights(analytics)
	}, [analytics])

	return (
		<div className='space-y-6'>
			{/* Header */}
			<div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
				<div>
					<h1 className='text-4xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
						Dashboard
					</h1>
					<p className='text-muted-foreground mt-1'>
						Workforce Intelligence Overview
					</p>
				</div>

				<div className='flex items-center gap-3'>
					<label
						htmlFor='region-filter'
						className='text-sm font-medium'>
						Region:
					</label>
					<Select
						value={selectedRegion}
						onValueChange={(value: string) =>
							setSelectedRegion(value as Region)
						}>
						<SelectTrigger
							id='region-filter'
							className='w-45'>
							<SelectValue placeholder='Select region' />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value='All'>All Regions</SelectItem>
							<SelectItem value='US'>United States</SelectItem>
							<SelectItem value='LATAM'>Latin America</SelectItem>
							<SelectItem value='EU'>Europe</SelectItem>
						</SelectContent>
					</Select>
				</div>
			</div>

			{/* Section 1: KPI Cards */}
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
				<KPICard
					title='Total Employees'
					value={analytics.totalEmployees}
					description='Active workforce'
					icon={
						<svg
							xmlns='http://www.w3.org/2000/svg'
							className='h-4 w-4'
							viewBox='0 0 20 20'
							fill='currentColor'>
							<path d='M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z' />
						</svg>
					}
				/>
				<KPICard
					title='Active Technologies'
					value={analytics.activeTechnologies}
					description='Skill areas tracked'
					icon={
						<svg
							xmlns='http://www.w3.org/2000/svg'
							className='h-4 w-4'
							viewBox='0 0 20 20'
							fill='currentColor'>
							<path
								fillRule='evenodd'
								d='M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z'
								clipRule='evenodd'
							/>
						</svg>
					}
				/>
				<KPICard
					title='Top Industry'
					value={analytics.topIndustry}
					description='Largest sector coverage'
					icon={
						<svg
							xmlns='http://www.w3.org/2000/svg'
							className='h-4 w-4'
							viewBox='0 0 20 20'
							fill='currentColor'>
							<path
								fillRule='evenodd'
								d='M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z'
								clipRule='evenodd'
							/>
							<path d='M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z' />
						</svg>
					}
				/>
				<KPICard
					title='Critical Skill Gaps'
					value={analytics.criticalSkillGaps}
					description='Skills with <5 employees'
					icon={
						<svg
							xmlns='http://www.w3.org/2000/svg'
							className='h-4 w-4'
							viewBox='0 0 20 20'
							fill='currentColor'>
							<path
								fillRule='evenodd'
								d='M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z'
								clipRule='evenodd'
							/>
						</svg>
					}
				/>
			</div>

			{/* Section 2: Charts */}
			<div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
				<SkillDistributionChart data={analytics.skillDistribution} />
				<IndustryChart data={analytics.industryDistribution} />
			</div>

			{/* Section 3: Risk Alerts */}
			<RiskAlerts skillGaps={analytics.skillGaps} />

			{/* Section 4: Strategic Insights */}
			<StrategicInsights insights={insights} />
		</div>
	)
}
