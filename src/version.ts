import pkg from '../package.json' with { type: 'json' }

export const SDK_VERSION: string = pkg.version
