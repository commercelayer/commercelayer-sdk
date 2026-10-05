import type { TargetConfig } from '@commercelayer/sdk-generator/target'

/**
 * Core API target. Declares everything the public resources schema cannot
 * express.
 */
const config: TargetConfig = {
  name: 'core',
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
  // Base class defined in src/commercelayer.ts, extended by the generated
  // bundle client. Public via ./single-client, so it cannot be renamed.
  clientBaseName: 'CommerceLayerSingleClient',
  staticName: 'CommerceLayerStatic',
  // sdk6 consumers imported `CommerceLayerBundle`; kept as a deprecated alias.
  bundleAlias: 'CommerceLayerBundle',
  // Core publishes the tree-shakeable single-client entry alongside the bundle.
  singleClient: true,
  taggable: true,
  // The Core API has no custom actions: every non-CRUD operation it exposes is
  // an underscore-prefixed trigger attribute, which the schema does describe.
  actions: {},
}

export default config
