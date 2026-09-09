import type { QueryParamsRetrieve } from '@runtime/query'
import type {
  Resource,
  ResourceId,
  ResourceRel,
  ResourceSort,
  /* ResourceFilter */ ResourcesConfig,
  SingletonUpdate,
} from '@runtime/resource'
import { ApiSingleton } from '@runtime/resource'

type UserType = 'users'
type UserRel = ResourceRel & { type: UserType }

export type UserSort = Pick<User, 'id' | 'email' | 'first_name' | 'last_name'> & ResourceSort
// export type UserFilter = Pick<User, 'id' | 'email' | 'first_name' | 'last_name' | 'time_zone'> & ResourceFilter

/**
 * The User object is returned as part of the response body of each successful retrieve or update API call to the /api/user endpoint.
 *
 * @link https://docs.commercelayer.io/provisioning-api-reference/users/object
 */
interface User extends Resource {
  readonly type: UserType

  /**
   * The user email.
   * @example ```"user@commercelayer.io"```
   */
  email: string
  /**
   * The user first name.
   * @example ```"John"```
   */
  first_name: string
  /**
   * The user last name.
   * @example ```"Doe"```
   */
  last_name: string
  /**
   * The user preferred timezone.
   * @example ```"UTC"```
   */
  time_zone?: string | null
  /**
   * The user 2FA setting.
   * @example ```true```
   */
  otp_required_for_login?: boolean | null
}

interface UserUpdate extends SingletonUpdate {
  /**
   * The user email.
   * @example ```"user@commercelayer.io"```
   */
  email?: string | null
  /**
   * The user first name.
   * @example ```"John"```
   */
  first_name?: string | null
  /**
   * The user last name.
   * @example ```"Doe"```
   */
  last_name?: string | null
  /**
   * The user preferred timezone.
   * @example ```"UTC"```
   */
  time_zone?: string | null
}

class Users extends ApiSingleton<User> {
  static readonly TYPE: UserType = 'users' as const

  async update(resource: UserUpdate, params?: QueryParamsRetrieve<User>, options?: ResourcesConfig): Promise<User> {
    return this.resources.update<UserUpdate, User>({ ...resource, type: Users.TYPE }, params, options, this.path())
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

  path(): string {
    return 'user'
  }
}

const instance = new Users()
export default instance

export type { User, Users, UserType, UserUpdate }
