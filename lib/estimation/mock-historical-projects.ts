import { HistoricalProject } from './types'

export const historicalProjects: HistoricalProject[] = [
	{
		id: 'p1',
		name: 'Retail Pulse',
		techStack: ['React', 'Node.js', 'AWS'],
		features: [
			{
				name: 'Auth + roles',
				complexity: 'High',
				estimatedHours: 40,
				realHours: 52,
			},
			{
				name: 'Real-time notifications',
				complexity: 'High',
				estimatedHours: 36,
				realHours: 48,
			},
			{
				name: 'Catalog CRUD',
				complexity: 'Low',
				estimatedHours: 10,
				realHours: 12,
			},
			{
				name: 'Admin dashboard KPIs',
				complexity: 'Medium',
				estimatedHours: 24,
				realHours: 28,
			},
		],
	},
	{
		id: 'p2',
		name: 'FinOps Console',
		techStack: ['React', 'Node.js', 'AWS', 'DevOps'],
		features: [
			{
				name: 'Payments integration',
				complexity: 'High',
				estimatedHours: 44,
				realHours: 60,
			},
			{
				name: 'Reporting API',
				complexity: 'Medium',
				estimatedHours: 22,
				realHours: 25,
			},
			{
				name: 'CI/CD pipeline',
				complexity: 'Medium',
				estimatedHours: 18,
				realHours: 21,
			},
			{
				name: 'Search + filters',
				complexity: 'Medium',
				estimatedHours: 20,
				realHours: 27,
			},
		],
	},
	{
		id: 'p3',
		name: 'CareConnect',
		techStack: ['.NET', 'Azure'],
		features: [
			{
				name: 'Catalog CRUD',
				complexity: 'Low',
				estimatedHours: 12,
				realHours: 11,
			},
			{
				name: 'RBAC + audit log',
				complexity: 'Medium',
				estimatedHours: 26,
				realHours: 30,
			},
			{
				name: 'Auth (OIDC)',
				complexity: 'High',
				estimatedHours: 38,
				realHours: 50,
			},
			{
				name: 'Reporting endpoints',
				complexity: 'Medium',
				estimatedHours: 20,
				realHours: 19,
			},
		],
	},
	{
		id: 'p4',
		name: 'Logistics Live',
		techStack: ['Node.js', 'AWS', 'DevOps'],
		features: [
			{
				name: 'CI/CD + environments',
				complexity: 'Medium',
				estimatedHours: 20,
				realHours: 24,
			},
			{
				name: 'Real-time tracking',
				complexity: 'High',
				estimatedHours: 46,
				realHours: 58,
			},
			{
				name: 'Search service',
				complexity: 'Medium',
				estimatedHours: 18,
				realHours: 22,
			},
			{
				name: 'Ops dashboard',
				complexity: 'Medium',
				estimatedHours: 24,
				realHours: 29,
			},
		],
	},
	{
		id: 'p5',
		name: 'Insights Hub',
		techStack: ['React', 'Data Science', 'AI/ML'],
		features: [
			{
				name: 'Analytics dashboard',
				complexity: 'Medium',
				estimatedHours: 26,
				realHours: 32,
			},
			{
				name: 'User segmentation',
				complexity: 'High',
				estimatedHours: 42,
				realHours: 54,
			},
			{
				name: 'CSV export',
				complexity: 'Low',
				estimatedHours: 8,
				realHours: 9,
			},
			{
				name: 'Model monitoring panel',
				complexity: 'High',
				estimatedHours: 40,
				realHours: 57,
			},
		],
	},
	{
		id: 'p6',
		name: 'Banking KYC',
		techStack: ['.NET', 'Azure', 'DevOps'],
		features: [
			{
				name: 'Auth + MFA',
				complexity: 'High',
				estimatedHours: 45,
				realHours: 55,
			},
			{
				name: 'Audit trail',
				complexity: 'Medium',
				estimatedHours: 20,
				realHours: 23,
			},
			{
				name: 'Catalog CRUD',
				complexity: 'Low',
				estimatedHours: 11,
				realHours: 13,
			},
			{
				name: 'CI/CD hardening',
				complexity: 'Medium',
				estimatedHours: 22,
				realHours: 26,
			},
		],
	},
	{
		id: 'p7',
		name: 'MarketPlace Pro',
		techStack: ['React', 'Node.js'],
		features: [
			{
				name: 'Checkout + webhooks',
				complexity: 'High',
				estimatedHours: 38,
				realHours: 49,
			},
			{
				name: 'Search + suggestions',
				complexity: 'Medium',
				estimatedHours: 18,
				realHours: 24,
			},
			{
				name: 'Admin KPIs',
				complexity: 'Medium',
				estimatedHours: 22,
				realHours: 27,
			},
			{
				name: 'Catalog CRUD',
				complexity: 'Low',
				estimatedHours: 9,
				realHours: 10,
			},
		],
	},
	{
		id: 'p8',
		name: 'IoT Fleet Manager',
		techStack: ['Node.js', 'AWS'],
		features: [
			{
				name: 'Real-time events pipeline',
				complexity: 'High',
				estimatedHours: 48,
				realHours: 62,
			},
			{
				name: 'Device search',
				complexity: 'Medium',
				estimatedHours: 16,
				realHours: 20,
			},
			{
				name: 'Reporting API',
				complexity: 'Medium',
				estimatedHours: 20,
				realHours: 24,
			},
			{
				name: 'Permissions model',
				complexity: 'High',
				estimatedHours: 34,
				realHours: 46,
			},
		],
	},
	{
		id: 'p9',
		name: 'HR Self-Service',
		techStack: ['React', 'Node.js', 'AWS'],
		features: [
			{
				name: 'Auth + SSO',
				complexity: 'High',
				estimatedHours: 42,
				realHours: 53,
			},
			{
				name: 'Notifications',
				complexity: 'Medium',
				estimatedHours: 16,
				realHours: 18,
			},
			{
				name: 'Reporting',
				complexity: 'Medium',
				estimatedHours: 20,
				realHours: 23,
			},
			{
				name: 'Catalog CRUD',
				complexity: 'Low',
				estimatedHours: 10,
				realHours: 12,
			},
		],
	},
	{
		id: 'p10',
		name: 'Supply Chain Control',
		techStack: ['.NET', 'Azure', 'React'],
		features: [
			{
				name: 'Ops dashboard',
				complexity: 'Medium',
				estimatedHours: 28,
				realHours: 33,
			},
			{
				name: 'Search + filters',
				complexity: 'Medium',
				estimatedHours: 18,
				realHours: 23,
			},
			{
				name: 'Auth + MFA',
				complexity: 'High',
				estimatedHours: 44,
				realHours: 56,
			},
			{
				name: 'Catalog CRUD',
				complexity: 'Low',
				estimatedHours: 12,
				realHours: 14,
			},
		],
	},
	{
		id: 'p11',
		name: 'DevPortal',
		techStack: ['React', 'Node.js', 'DevOps'],
		features: [
			{
				name: 'CI/CD templates',
				complexity: 'Medium',
				estimatedHours: 16,
				realHours: 19,
			},
			{
				name: 'API docs + OpenAPI',
				complexity: 'Low',
				estimatedHours: 8,
				realHours: 10,
			},
			{
				name: 'Auth + RBAC',
				complexity: 'High',
				estimatedHours: 40,
				realHours: 51,
			},
			{
				name: 'Search',
				complexity: 'Medium',
				estimatedHours: 18,
				realHours: 22,
			},
		],
	},
	{
		id: 'p12',
		name: 'Telemetry Studio',
		techStack: ['Data Science', 'Node.js', 'AWS'],
		features: [
			{
				name: 'Aggregated reporting',
				complexity: 'Medium',
				estimatedHours: 24,
				realHours: 31,
			},
			{
				name: 'Anomaly alerts',
				complexity: 'High',
				estimatedHours: 46,
				realHours: 63,
			},
			{
				name: 'Dashboard KPIs',
				complexity: 'Medium',
				estimatedHours: 22,
				realHours: 26,
			},
			{
				name: 'CSV export',
				complexity: 'Low',
				estimatedHours: 7,
				realHours: 8,
			},
		],
	},
	{
		id: 'p13',
		name: 'Customer Support Suite',
		techStack: ['React', 'Node.js', 'AWS'],
		features: [
			{
				name: 'Notifications (in-app)',
				complexity: 'High',
				estimatedHours: 34,
				realHours: 44,
			},
			{
				name: 'Search + saved filters',
				complexity: 'Medium',
				estimatedHours: 20,
				realHours: 26,
			},
			{
				name: 'Reporting API',
				complexity: 'Medium',
				estimatedHours: 18,
				realHours: 22,
			},
			{
				name: 'Auth + MFA',
				complexity: 'High',
				estimatedHours: 43,
				realHours: 54,
			},
		],
	},
	{
		id: 'p14',
		name: 'Partner Onboarding',
		techStack: ['React', 'Node.js', 'AWS'],
		features: [
			{
				name: 'Auth + MFA',
				complexity: 'High',
				estimatedHours: 41,
				realHours: 52,
			},
			{
				name: 'KYC flow',
				complexity: 'High',
				estimatedHours: 48,
				realHours: 65,
			},
			{
				name: 'Catalog CRUD',
				complexity: 'Low',
				estimatedHours: 9,
				realHours: 11,
			},
			{
				name: 'Reporting',
				complexity: 'Medium',
				estimatedHours: 18,
				realHours: 21,
			},
		],
	},
	{
		id: 'p15',
		name: 'Promo Engine',
		techStack: ['Node.js', 'AWS'],
		features: [
			{
				name: 'Rules editor',
				complexity: 'High',
				estimatedHours: 44,
				realHours: 59,
			},
			{
				name: 'Search promos',
				complexity: 'Medium',
				estimatedHours: 16,
				realHours: 19,
			},
			{
				name: 'Reporting',
				complexity: 'Medium',
				estimatedHours: 18,
				realHours: 22,
			},
			{
				name: 'Admin dashboard',
				complexity: 'Medium',
				estimatedHours: 22,
				realHours: 27,
			},
		],
	},
	{
		id: 'p16',
		name: 'Cloud Migration Tracker',
		techStack: ['.NET', 'Azure', 'DevOps'],
		features: [
			{
				name: 'CI/CD baseline',
				complexity: 'Medium',
				estimatedHours: 20,
				realHours: 23,
			},
			{
				name: 'Auth (enterprise)',
				complexity: 'High',
				estimatedHours: 46,
				realHours: 58,
			},
			{
				name: 'Reporting',
				complexity: 'Medium',
				estimatedHours: 18,
				realHours: 20,
			},
			{
				name: 'Catalog CRUD',
				complexity: 'Low',
				estimatedHours: 10,
				realHours: 11,
			},
		],
	},
	{
		id: 'p17',
		name: 'Omnichannel Retail',
		techStack: ['React', 'Node.js', 'AWS'],
		features: [
			{
				name: 'Auth + MFA',
				complexity: 'High',
				estimatedHours: 42,
				realHours: 55,
			},
			{
				name: 'Real-time notifications',
				complexity: 'High',
				estimatedHours: 35,
				realHours: 47,
			},
			{
				name: 'Search + filters',
				complexity: 'Medium',
				estimatedHours: 18,
				realHours: 23,
			},
			{
				name: 'Analytics dashboard',
				complexity: 'Medium',
				estimatedHours: 24,
				realHours: 30,
			},
		],
	},
	{
		id: 'p18',
		name: 'Ticketing Platform',
		techStack: ['React', 'Node.js', 'AWS'],
		features: [
			{
				name: 'Auth + MFA',
				complexity: 'High',
				estimatedHours: 39,
				realHours: 50,
			},
			{
				name: 'Notifications',
				complexity: 'High',
				estimatedHours: 33,
				realHours: 45,
			},
			{
				name: 'Reporting API',
				complexity: 'Medium',
				estimatedHours: 20,
				realHours: 24,
			},
			{
				name: 'Catalog CRUD',
				complexity: 'Low',
				estimatedHours: 10,
				realHours: 12,
			},
		],
	},
]
