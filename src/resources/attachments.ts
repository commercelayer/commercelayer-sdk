/**
 * ©2021 Commerce Layer Inc.
 * Source code generated automatically by SDK codegen from OpenAPI schema 2.3.0
 * Generation date: 22-07-2021
 **/

import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId } from '../resource'
import { /* QueryBuilderRetrieve, QueryBuilderList, */QueryParamsList, QueryParamsRetrieve } from '../query'



type AttachmentRel = ResourceId & { type: 'attachments' }


interface Attachment extends Resource {
	
	name?: string
	description?: string
	url?: string

	attachable?: Attachment

}


interface AttachmentCreate extends ResourceCreate {
	
	name: string
	description?: string
	url?: string

	attachable?: AttachmentRel

}


interface AttachmentUpdate extends ResourceUpdate {
	
	name?: string
	description?: string
	url?: string

	attachable?: AttachmentRel

}


class Attachments extends ApiResource {

	static readonly TYPE: 'attachments' = 'attachments'
	// static readonly PATH = 'attachments'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<Attachment[]> {
		return this.resources.list({ type: Attachments.TYPE }, params, options)
	}

	async create(resource: AttachmentCreate, options?: ResourcesConfig): Promise<Attachment> {
		return this.resources.create(Object.assign(resource, { type: Attachments.TYPE }) , options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Attachment> {
		return this.resources.retrieve<Attachment>({ type: Attachments.TYPE, id }, params, options)
	}

	async update(resource: AttachmentUpdate, options?: ResourcesConfig): Promise<Attachment> {
		return this.resources.update({ ...resource, type: Attachments.TYPE }, options)
	}

	async delete(id: string, options?: ResourcesConfig): Promise<void> {
		this.resources.delete({ type: Attachments.TYPE, id }, options)
	}


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isAttachment(resource: any): resource is Attachment {
		return resource.type && (resource.type === Attachments.TYPE)
	}

	/*
	filter(): QueryBuilderRetrieve {
		return new QueryBuilderRetrieve(Attachments.TYPE)
	}
	*/

	/*
	filterList(): QueryBuilderList {
		return new QueryBuilderList(Attachments.TYPE)
	}
	*/

	relationship(id: string): ResourceId & { type: typeof Attachments.TYPE } {
		return { id, type: Attachments.TYPE }
	}

}


export default Attachments

export { Attachment, AttachmentCreate, AttachmentUpdate }
