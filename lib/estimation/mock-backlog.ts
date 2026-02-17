import { BacklogItem } from './types'

export const backlog: BacklogItem[] = [
	{
		id: 'b1',
		title: 'Authentication + MFA',
		description:
			'Email/password login, optional SSO, and second factor (TOTP/SMS) with account recovery.',
		techRequired: ['React', 'Node.js', 'AWS'],
		complexity: 'High',
	},
	{
		id: 'b2',
		title: 'Real-time notifications',
		description:
			'In-app notifications via WebSockets, per-user preferences, retries, and basic delivery guarantees.',
		techRequired: ['React', 'Node.js', 'AWS'],
		complexity: 'High',
	},
	{
		id: 'b3',
		title: 'Payments integration',
		description:
			'Checkout, webhooks, basic reconciliation, and a transaction status panel.',
		techRequired: ['React', 'Node.js'],
		complexity: 'High',
	},
	{
		id: 'b4',
		title: 'Analytics dashboard',
		description:
			'KPIs and charts with date filters, CSV export, and feature-level usage metrics.',
		techRequired: ['React', 'Data Science'],
		complexity: 'Medium',
	},
	{
		id: 'b5',
		title: 'Advanced search',
		description:
			'Full-text search with filters, relevance, pagination, and suggestions.',
		techRequired: ['Node.js', 'AWS'],
		complexity: 'Medium',
	},
	{
		id: 'b6',
		title: 'Standard CI/CD pipeline',
		description:
			'Build, test, deploy with environments (dev/stage/prod), approvals, and basic rollback.',
		techRequired: ['DevOps', 'AWS'],
		complexity: 'Medium',
	},
	{
		id: 'b7',
		title: 'Reporting API',
		description:
			'Aggregated endpoints, caching, rate limiting, and OpenAPI documentation.',
		techRequired: ['Node.js'],
		complexity: 'Medium',
	},
	{
		id: 'b8',
		title: 'Simple catalog CRUD',
		description:
			'Entity CRUD with validations, minimal auditing, and basic roles.',
		techRequired: ['.NET', 'Azure'],
		complexity: 'Low',
	},
]
