import type { QueryParamsList, QueryParamsRetrieve } from '@runtime/query'
import type {
  ListResponse,
  Resource,
  ResourceCreate,
  ResourceId,
  ResourceRel,
  ResourceSort,
  /* ResourceFilter */ ResourcesConfig,
  ResourceUpdate,
} from '@runtime/resource'
import { ApiResource } from '@runtime/resource'
import type { Agreement, AgreementType } from './agreements'
import type { EventStore } from './event_stores'
import type { InboundMessage } from './inbound_messages'
import type { Order } from './orders'
import type { Organization } from './organizations'
import type { User, UserType } from './users'

type AgentType = 'agents'
type AgentRel = ResourceRel & { type: AgentType }
type UserRel = ResourceRel & { type: UserType }
type AgreementRel = ResourceRel & { type: AgreementType }

export type AgentSort = Pick<Agent, 'id' | 'name' | 'slug' | 'inbound_email' | 'kind' | 'pipeline' | 'disabled_at'> &
  ResourceSort
// export type AgentFilter = Pick<Agent, 'id' | 'name' | 'slug' | 'inbound_email' | 'kind' | 'pipeline' | 'disabled_at'> & ResourceFilter

/**
 * The Agent object is returned as part of the response body of each successful list, retrieve, create or update API call to the /api/agents endpoint.
 *
 * @deprecated Last available in API version 2017-08.
 * @link https://docs.commercelayer.io/core-api-reference/agents/object
 */
interface Agent extends Resource {
  readonly type: AgentType

  /**
   * The agent display name.
   * @example ```"Mail to order"```
   */
  name: string
  /**
   * Unique inbox local-part, set on create and immutable afterwards. Generated from the name when omitted (underscores, no spaces). Letters, numbers, underscores, and hyphens only.
   * @example ```"mail_to_order"```
   */
  slug?: string | null
  /**
   * The inbound inbox address derived from the slug and AGENTS_EMAIL_DOMAIN. Not writable.
   * @example ```"mail_to_order@agents.commercelayer.ai"```
   */
  inbound_email?: string | null
  /**
   * The agent kind. One of 'system'.
   * @example ```"system"```
   */
  kind?: 'system' | null
  /**
   * The predefined system pipeline this agent runs. Required when kind is 'system'. One of 'mail_to_order_b2b'.
   * @example ```"mail_to_order_b2b"```
   */
  pipeline?: 'mail_to_order_b2b' | null
  /**
   * Automatically place high-confidence orders created by this agent. Lower-confidence orders always remain pending for review.
   */
  auto_place?: boolean | null
  /**
   * Time at which this resource was disabled.
   * @example ```"2018-01-01T12:00:00.000Z"```
   */
  disabled_at?: string | null

  organization?: Organization | null
  user?: User | null
  agreement?: Agreement | null
  orders?: Order[] | null
  inbound_messages?: InboundMessage[] | null
  event_stores?: EventStore[] | null
}

interface AgentCreate extends ResourceCreate {
  /**
   * The agent display name.
   * @example ```"Mail to order"```
   */
  name: string
  /**
   * Unique inbox local-part, set on create and immutable afterwards. Generated from the name when omitted (underscores, no spaces). Letters, numbers, underscores, and hyphens only.
   * @example ```"mail_to_order"```
   */
  slug?: string | null
  /**
   * The agent kind. One of 'system'.
   * @example ```"system"```
   */
  kind?: 'system' | null
  /**
   * The predefined system pipeline this agent runs. Required when kind is 'system'. One of 'mail_to_order_b2b'.
   * @example ```"mail_to_order_b2b"```
   */
  pipeline?: 'mail_to_order_b2b' | null
  /**
   * Automatically place high-confidence orders created by this agent. Lower-confidence orders always remain pending for review.
   */
  auto_place?: boolean | null
  /**
   * Send this attribute if you want to mark this resource as disabled.
   * @example ```true```
   */
  _disable?: boolean | null
  /**
   * Send this attribute if you want to mark this resource as enabled.
   * @example ```true```
   */
  _enable?: boolean | null

  user: UserRel
  agreement?: AgreementRel | null
}

interface AgentUpdate extends ResourceUpdate {
  /**
   * The agent display name.
   * @example ```"Mail to order"```
   */
  name?: string | null
  /**
   * The agent kind. One of 'system'.
   * @example ```"system"```
   */
  kind?: 'system' | null
  /**
   * The predefined system pipeline this agent runs. Required when kind is 'system'. One of 'mail_to_order_b2b'.
   * @example ```"mail_to_order_b2b"```
   */
  pipeline?: 'mail_to_order_b2b' | null
  /**
   * Automatically place high-confidence orders created by this agent. Lower-confidence orders always remain pending for review.
   */
  auto_place?: boolean | null
  /**
   * Send this attribute if you want to mark this resource as disabled.
   * @example ```true```
   */
  _disable?: boolean | null
  /**
   * Send this attribute if you want to mark this resource as enabled.
   * @example ```true```
   */
  _enable?: boolean | null

  user?: UserRel | null
  agreement?: AgreementRel | null
}

/** @deprecated Last available in API version 2017-08. */
class Agents extends ApiResource<Agent> {
  static readonly TYPE: AgentType = 'agents' as const

  async create(resource: AgentCreate, params?: QueryParamsRetrieve<Agent>, options?: ResourcesConfig): Promise<Agent> {
    return this.resources.create<AgentCreate, Agent>({ ...resource, type: Agents.TYPE }, params, options)
  }

  async update(resource: AgentUpdate, params?: QueryParamsRetrieve<Agent>, options?: ResourcesConfig): Promise<Agent> {
    return this.resources.update<AgentUpdate, Agent>({ ...resource, type: Agents.TYPE }, params, options)
  }

  async organization(
    agentId: string | Agent,
    params?: QueryParamsRetrieve<Organization>,
    options?: ResourcesConfig,
  ): Promise<Organization> {
    const _agentId = (agentId as Agent).id || (agentId as string)
    return this.resources.fetch<Organization>(
      { type: 'organizations' },
      `agents/${_agentId}/organization`,
      params,
      options,
    ) as unknown as Organization
  }

  async user(agentId: string | Agent, params?: QueryParamsRetrieve<User>, options?: ResourcesConfig): Promise<User> {
    const _agentId = (agentId as Agent).id || (agentId as string)
    return this.resources.fetch<User>({ type: 'users' }, `agents/${_agentId}/user`, params, options) as unknown as User
  }

  async agreement(
    agentId: string | Agent,
    params?: QueryParamsRetrieve<Agreement>,
    options?: ResourcesConfig,
  ): Promise<Agreement> {
    const _agentId = (agentId as Agent).id || (agentId as string)
    return this.resources.fetch<Agreement>(
      { type: 'agreements' },
      `agents/${_agentId}/agreement`,
      params,
      options,
    ) as unknown as Agreement
  }

  async orders(
    agentId: string | Agent,
    params?: QueryParamsList<Order>,
    options?: ResourcesConfig,
  ): Promise<ListResponse<Order>> {
    const _agentId = (agentId as Agent).id || (agentId as string)
    return this.resources.fetch<Order>(
      { type: 'orders' },
      `agents/${_agentId}/orders`,
      params,
      options,
    ) as unknown as ListResponse<Order>
  }

  async inbound_messages(
    agentId: string | Agent,
    params?: QueryParamsList<InboundMessage>,
    options?: ResourcesConfig,
  ): Promise<ListResponse<InboundMessage>> {
    const _agentId = (agentId as Agent).id || (agentId as string)
    return this.resources.fetch<InboundMessage>(
      { type: 'inbound_messages' },
      `agents/${_agentId}/inbound_messages`,
      params,
      options,
    ) as unknown as ListResponse<InboundMessage>
  }

  async event_stores(
    agentId: string | Agent,
    params?: QueryParamsList<EventStore>,
    options?: ResourcesConfig,
  ): Promise<ListResponse<EventStore>> {
    const _agentId = (agentId as Agent).id || (agentId as string)
    return this.resources.fetch<EventStore>(
      { type: 'event_stores' },
      `agents/${_agentId}/event_stores`,
      params,
      options,
    ) as unknown as ListResponse<EventStore>
  }

  async _disable(id: string | Agent, params?: QueryParamsRetrieve<Agent>, options?: ResourcesConfig): Promise<Agent> {
    return this.resources.update<AgentUpdate, Agent>(
      { id: typeof id === 'string' ? id : id.id, type: Agents.TYPE, _disable: true },
      params,
      options,
    )
  }

  async _enable(id: string | Agent, params?: QueryParamsRetrieve<Agent>, options?: ResourcesConfig): Promise<Agent> {
    return this.resources.update<AgentUpdate, Agent>(
      { id: typeof id === 'string' ? id : id.id, type: Agents.TYPE, _enable: true },
      params,
      options,
    )
  }

  isAgent(resource: any): resource is Agent {
    return resource.type && resource.type === Agents.TYPE
  }

  relationship(id: string | ResourceId | null): AgentRel {
    return super.relationshipOneToOne<AgentRel>(id)
  }

  relationshipToMany(...ids: string[]): AgentRel[] {
    return super.relationshipOneToMany<AgentRel>(...ids)
  }

  type(): AgentType {
    return Agents.TYPE
  }
}

const instance = new Agents()
export default instance

export type { Agent, AgentCreate, Agents, AgentType, AgentUpdate }
