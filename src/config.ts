import type { ApiClientInitConfig } from "./client"

const config = {
	default: {
		domain: 'commercelayer.io',
		pageNumber: 1,
		pageSize: 10,
	},
	client: {
		timeout: 15000,
		requiredAttributes: ['organization', 'accessToken'] as Array<keyof ApiClientInitConfig>,
	},
	jsonapi: {
		maxResourceIncluded: 2
	}
} as const


export default config
