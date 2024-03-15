// export type ApiMode = 'test' | 'live'


const config = {
	default: {
		// environment: 'test',
		domain: 'commercelayer.io',
		pageNumber: 1,
		pageSize: 10,
	},
	client: {
		timeout: 15000,
		requiredAttributes: ['organization', 'accessToken'],
	},
	jsonapi: {
		maxResourceIncluded: 2
	}
} as const


export default config
