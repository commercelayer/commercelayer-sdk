import type { TargetConfig } from '@commercelayer/sdk-generator/target'

/**
 * Provisioning API target. Declares everything the public resources schema
 * cannot express — see docs/adr/0005.
 */
const config: TargetConfig = {
  environments: {
    production: 'provisioning.commercelayer.io',
    staging: 'provisioning.commercelayer.co',
    staging1: 'provisioning.stg1.commercelayer.co',
    staging2: 'provisioning.stg2.commercelayer.co',
    staging3: 'provisioning.stg3.commercelayer.co',
  },
  // Not organization-scoped: requests go to provisioning.<domain>/api
  apiSubdomain: 'provisioning',
  docsPath: 'provisioning-api-reference',
  clientName: 'CommerceLayerProvisioning',
  clientBaseName: 'CommerceLayerProvisioningBaseClient',
  staticName: 'CommerceLayerProvisioningStatic',
  // Bundle client only. 2.10.2 published a single entry point and gains no
  // tree-shakeable single-client surface — see docs/adr/0007.
  singleClient: false,
  // The Provisioning API has no `tags` resource, so the taggable machinery is
  // omitted rather than generated empty.
  taggable: false,
  // No deprecated bundle alias: provisioning has no sdk6-era history.
  // Present in the schema but deliberately not exposed.
  exclude: ['subscriptions', 'billing_profiles', 'plans'],
  // Non-CRUD endpoints the schema cannot describe — see docs/adr/0005.
  actions: {
    memberships: [{ name: 'resend', method: 'POST', path: 'resend' }],
    organizations: [
      { name: 'transfer_ownership', method: 'PATCH', path: 'transfer_ownership', payload: 'TransferOwnershipDataType' },
    ],
  },
}

export default config
