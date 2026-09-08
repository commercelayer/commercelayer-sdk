import Debug from '@runtime/debug'
import type { ResourceAdapter } from '@runtime/resource'
import { type CommerceLayerInitConfig, CommerceLayerProvisioningBaseClient } from '../src/commercelayer'
import * as api from './api'

const debug = Debug('bundle')

class CommerceLayerProvisioningClient extends CommerceLayerProvisioningBaseClient {
  // ##__CL_RESOURCES_DEF_START__##
  // ##__CL_RESOURCES_DEF_TEMPLATE:: ##__TAB__#####__RESOURCE_TYPE__##?: api.##__RESOURCE_CLASS__##
  #api_credentials?: api.ApiCredentials
  #application_memberships?: api.ApplicationMemberships
  #identity_providers?: api.IdentityProviders
  #memberships?: api.Memberships
  #membership_profiles?: api.MembershipProfiles
  #organizations?: api.Organizations
  #permissions?: api.Permissions
  #roles?: api.Roles
  #user?: api.Users
  #versions?: api.Versions
  // ##__CL_RESOURCES_DEF_STOP__##

  public constructor(config: CommerceLayerInitConfig) {
    super(config)
    debug('new commercelayer bundle instance %O', config)

    // ##__CL_RESOURCES_INIT_START__##
    // ##__CL_RESOURCES_INIT_TEMPLATE:: ##__TAB__####__TAB__##this.##__RESOURCE_TYPE__## = new api.##__RESOURCE_CLASS__##(this.#adapter)
    // ##__CL_RESOURCES_INIT_STOP__##
  }

  static get(config?: CommerceLayerInitConfig): CommerceLayerProvisioningClient {
    if (config) return (CommerceLayerProvisioningClient.cl = new CommerceLayerProvisioningClient(config))
    else if (!CommerceLayerProvisioningClient.cl)
      throw new Error('CommerceLayerProvisioning bundle client not initialized')
    return CommerceLayerProvisioningClient.cl as CommerceLayerProvisioningClient
  }

  // Bundle clients are isolated: route this instance's requests, config and
  // interceptors through the adapter built for it, not the process-global
  // static one. The resource accessors below bind to this same adapter.
  protected override get adapter(): ResourceAdapter {
    return this.instanceAdapter
  }

  // ##__CL_RESOURCES_LAZY_LOADING_START__##
  // ##__CL_RESOURCES_LAZY_LOADING_TEMPLATE:: ##__TAB__##get ##__RESOURCE_TYPE__##(): api.##__RESOURCE_CLASS__## { return this.###__RESOURCE_TYPE__## || (this.###__RESOURCE_TYPE__## = api.##__RESOURCE_TYPE__##.withAdapter(this.adapter)) }
  get api_credentials(): api.ApiCredentials {
    return this.#api_credentials || (this.#api_credentials = api.api_credentials.withAdapter(this.adapter))
  }
  get application_memberships(): api.ApplicationMemberships {
    return (
      this.#application_memberships ||
      (this.#application_memberships = api.application_memberships.withAdapter(this.adapter))
    )
  }
  get identity_providers(): api.IdentityProviders {
    return this.#identity_providers || (this.#identity_providers = api.identity_providers.withAdapter(this.adapter))
  }
  get memberships(): api.Memberships {
    return this.#memberships || (this.#memberships = api.memberships.withAdapter(this.adapter))
  }
  get membership_profiles(): api.MembershipProfiles {
    return this.#membership_profiles || (this.#membership_profiles = api.membership_profiles.withAdapter(this.adapter))
  }
  get organizations(): api.Organizations {
    return this.#organizations || (this.#organizations = api.organizations.withAdapter(this.adapter))
  }
  get permissions(): api.Permissions {
    return this.#permissions || (this.#permissions = api.permissions.withAdapter(this.adapter))
  }
  get roles(): api.Roles {
    return this.#roles || (this.#roles = api.roles.withAdapter(this.adapter))
  }
  get user(): api.Users {
    return this.#user || (this.#user = api.user.withAdapter(this.adapter))
  }
  get versions(): api.Versions {
    return this.#versions || (this.#versions = api.versions.withAdapter(this.adapter))
  }
  // ##__CL_RESOURCES_LAZY_LOADING_STOP__##

  // ##__CL_RESOURCES_ACCESSORS_ONLY_START__##
  // ##__CL_RESOURCES_ACCESSORS_ONLY_TEMPLATE:: ##__TAB__##get ##__RESOURCE_TYPE__##(): api.##__RESOURCE_CLASS__## { return api.##__RESOURCE_TYPE__## }
  // ##__CL_RESOURCES_ACCESSORS_ONLY_STOP__##
}

function CommerceLayerProvisioning(config: CommerceLayerInitConfig): CommerceLayerProvisioningClient {
  return CommerceLayerProvisioningClient.get(config)
}

export default CommerceLayerProvisioning
export { CommerceLayerProvisioning, type CommerceLayerProvisioningClient }
