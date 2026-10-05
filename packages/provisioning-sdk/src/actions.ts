/**
 * Payload types for the Provisioning API's custom actions.
 *
 * Hand-written on purpose: these endpoints are not described by the public
 * resources schema, so the target config names the type and this module
 * declares it. Generated resources import from here.
 */

/** Payload for `PATCH organizations/:id/transfer_ownership`. */
export type TransferOwnershipDataType = {
  type: 'organizations'
  id: string
  new_owner_email: string
}
