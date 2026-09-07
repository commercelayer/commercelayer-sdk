import type { TargetConfig } from '@commercelayer/sdk-generator/target'

/**
 * Core API target. Declares everything the public resources schema cannot
 * express — see docs/adr/0005.
 */
const config: TargetConfig = {
  // Each target owns its host map, so CI can pass `--env=staging1` without
  // knowing which API it is generating.
  environments: {
    production: 'core.commercelayer.io',
    staging: 'core.commercelayer.co',
    staging1: 'core.stg1.commercelayer.co',
    staging2: 'core.stg2.commercelayer.co',
    staging3: 'core.stg3.commercelayer.co',
  },
  docsPath: 'core-api-reference',
  clientName: 'CommerceLayer',
  staticName: 'CommerceLayerStatic',
  // Core publishes the tree-shakeable single-client entry alongside the bundle.
  singleClient: true,
  taggable: true,
  // The Core API has no custom actions: every non-CRUD operation it exposes is
  // an underscore-prefixed trigger attribute, which the schema does describe.
  actions: {},
}

export default config
