'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

export default function Sidebar() {
	const pathname = usePathname()

	const sidebarOptions = [
		{
			id: '/',
			href: '/',
			label: 'Dashboard',
			icon: (
				<svg
					xmlns='http://www.w3.org/2000/svg'
					className='h-5 w-5'
					viewBox='0 0 20 20'
					fill='currentColor'>
					<path d='M10 12a2 2 0 100-4 2 2 0 000 4z' />
					<path
						fillRule='evenodd'
						d='M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z'
						clipRule='evenodd'
					/>
				</svg>
			),
			description: 'Overview & Analytics',
		},
		{
			id: '/sensei',
			href: '/sensei',
			label: 'Sensei - Creati',
			icon: (
				<svg
					xmlns='http://www.w3.org/2000/svg'
					className='h-5 w-5'
					viewBox='0 0 20 20'
					fill='currentColor'>
					<path d='M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z' />
				</svg>
			),
			description: 'Training Hub',
		},
		{
			id: '/estimation',
			href: '/estimation',
			label: 'AI Estimation Assistant',
			icon: (
				<svg
					xmlns='http://www.w3.org/2000/svg'
					className='h-5 w-5'
					viewBox='0 0 20 20'
					fill='currentColor'>
					<path
						fillRule='evenodd'
						d='M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z'
						clipRule='evenodd'
					/>
				</svg>
			),
			description: 'Project Intelligence',
		},
	]

	return (
		<div className='fixed left-0 top-0 h-screen w-64 bg-card border-r border-border shadow-sm z-10'>
			<div className='p-6 h-full flex flex-col'>
				<div className='mb-6'>
					<h2 className='text-xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
						MySkills Analytics
					</h2>
				</div>

				<nav className='space-y-2 flex-1'>
					{sidebarOptions.map((option) => {
						const isActive = pathname === option.href

						return (
							<Link
								key={option.id}
								href={option.href}
								className={cn(
									'w-full flex items-center gap-3 p-3 rounded-lg text-left transition-all duration-200 hover:bg-accent hover:text-accent-foreground',
									isActive
										? 'bg-primary text-primary-foreground shadow-sm'
										: 'text-muted-foreground hover:text-foreground',
								)}>
								<div className='shrink-0'>{option.icon}</div>
								<div className='flex-1 min-w-0'>
									<div className='font-medium text-sm'>{option.label}</div>
									<div className='text-xs opacity-75 truncate'>
										{option.description}
									</div>
								</div>
							</Link>
						)
					})}
				</nav>
			</div>
		</div>
	)
}
