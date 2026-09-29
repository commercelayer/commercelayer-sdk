import type { QueryParamsList } from '@runtime/query'
import type {
  ListResponse,
  Resource,
  ResourceId,
  ResourceRel,
  ResourceSort,
  /* ResourceFilter */ ResourcesConfig,
} from '@runtime/resource'
import { ApiResource } from '@runtime/resource'

import type { EventStore } from './event_stores'

type UserType = 'users'
type UserRel = ResourceRel & { type: UserType }

export type UserSort = Pick<User, 'id' | 'first_name' | 'last_name' | 'email'> & ResourceSort
// export type UserFilter = Pick<User, 'id' | 'first_name' | 'last_name' | 'email'> & ResourceFilter

/**
 * The User object is returned as part of the response body of each successful list or retrieve API call to the /api/users endpoint.
 *
 * @deprecated Last available in API version 2017-08.
 * @link https://docs.commercelayer.io/core-api-reference/users/object
 */
interface User extends Resource {
  readonly type: UserType

  /**
   * The user's first name.
   * @example ```"John"```
   */
  first_name?: string | null
  /**
   * The user's last name.
   * @example ```"Smith"```
   */
  last_name?: string | null
  /**
   * The user's email address.
   * @example ```"john@example.com"```
   */
  email?: string | null

  event_stores?: EventStore[] | null
}

/** @deprecated Last available in API version 2017-08. */
class Users extends ApiResource<User> {
  static readonly TYPE: UserType = 'users' as const

  async event_stores(
    userId: string | User,
    params?: QueryParamsList<EventStore>,
    options?: ResourcesConfig,
  ): Promise<ListResponse<EventStore>> {
    const _userId = (userId as User).id || (userId as string)
    return this.resources.fetch<EventStore>(
      { type: 'event_stores' },
      `users/${_userId}/event_stores`,
      params,
      options,
    ) as unknown as ListResponse<EventStore>
  }

  isUser(resource: any): resource is User {
    return resource.type && resource.type === Users.TYPE
  }

  relationship(id: string | ResourceId | null): UserRel {
    return super.relationshipOneToOne<UserRel>(id)
  }

  relationshipToMany(...ids: string[]): UserRel[] {
    return super.relationshipOneToMany<UserRel>(...ids)
  }

  type(): UserType {
    return Users.TYPE
  }
}

const instance = new Users()
export default instance

export type { User, Users, UserType }
