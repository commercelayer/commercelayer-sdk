/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-undef */
// Not transpiled with TypeScript or Babel, so use plain Es6/Node.js!
const replace = require('@rollup/plugin-replace')

module.exports = {
	// This function will run for each entry/format/env combination
	rollup(config, options) {
		config.plugins = config.plugins = config.plugins.map(p =>
			p.name === 'replace' ?
				replace({
					'process.env.NODE_ENV': JSON.stringify(options.env),
					preventAssignment: true,
				}) : p
		)
		return config; // always return a config.
	},
}
