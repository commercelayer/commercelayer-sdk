# Commerce Layer JS SDK

[![Version](https://img.shields.io/npm/v/@commercelayer/sdk.svg)](https://npmjs.org/package/@commercelayer/sdk)
[![Downloads/week](https://img.shields.io/npm/dw/@commercelayer/sdk.svg)](https://npmjs.org/package/@commercelayer/sdk)
[![License](https://img.shields.io/npm/l/@commercelayer/sdk.svg)](https://github.com/commercelayer/commercelayer-sdk/blob/master/package.json)
[![semantic-release: angular](https://img.shields.io/badge/semantic--release-angular-e10079?logo=semantic-release)](https://github.com/semantic-release/semantic-release)
[![Release](https://github.com/commercelayer/commercelayer-sdk/actions/workflows/semantic-release.yml/badge.svg)](https://github.com/commercelayer/commercelayer-sdk/actions/workflows/semantic-release.yml)
[![CodeQL](https://github.com/commercelayer/commercelayer-cli/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/commercelayer/commercelayer-cli/actions/workflows/codeql-analysis.yml)

A JavaScript Library wrapper that makes it quick and easy to interact with the [Commerce Layer API](https://docs.commercelayer.io/developers/).

### What is Commerce Layer?

[Commerce Layer](https://commercelayer.io) is a multi-market commerce API and order management system that lets you add global shopping capabilities to any website, mobile app, chatbot, wearable, voice, or IoT device, with ease. Compose your stack with the best-of-breed tools you already mastered and love. Make any experience shoppable, anywhere, through a blazing-fast, enterprise-grade, and secure API.

# Getting started

To get started with Commerce Layer JS SDK you need to install it and then get the credentials that will allow you to perform your API calls.

- [Installation](#installation)
- [Authentication](#authentication)
- [Import](#import)

## Installation

Commerce Layer JS SDK is available as an [npm package](https://www.npmjs.com/package/@commercelayer/sdk):

```shell
// npm
npm install @commercelayer/sdk

// yarn
yarn add @commercelayer/sdk
```

## Authentication

All requests to Commerce Layer API must be authenticated with an [OAuth2](https://oauth.net/2/) bearer token.
Hence, before starting to use this SDK you need to get a valid access token.
Check [our documentation](https://docs.commercelayer.io/developers/authentication) for more information about the available authorization flows.

> Feel free to use [Commerce Layer JS Auth](https://github.com/commercelayer/commercelayer-js-auth), a JavaScript library that helps you wrap our authentication API.

## Import

You can use the ES6 default import with the SDK as follow:

```typescript
import CommerceLayer from '@commercelayer/sdk'

const cl = CommerceLayer({
  organization: 'your-organization-slug',
  accessToken: 'your-access-token'
})
```

> In the following examples, we will use only the the specific resources we're going to access (SKUs and shipping categories).
Check our [API reference](https://docs.commercelayer.io/developers/v/api-reference/) for the complete list of available  
resources and their attributes.

# Usage

The code snippets below show how to use the Commerce Layer JS SDK when performing the standard CRUD operations provided by our REST API on the SKU resource.

- ### Create

  - [How to create an SKU](#how-to-create-an-sku)

- ### Retrieve / List

  - [How to fetch a single SKU](#how-to-fetch-a-single-sku)
  - [How to fetch a collection of SKUs](#how-to-fetch-a-collection-of-skus)
  - [How to paginate a collection of SKUs](#how-to-paginate-a-collection-of-skus)
  - [How to iterate through a collection of SKUs](#how-to-iterate-through-a-collection-of-skus)
  <!-- - [How to build complex queries](#how-to-build-complex-queries) -->
  - [How to fetch resource relationships](#how-to-fetch-resource-relationships)

- ### Update

  - [How to update an existing SKU](#how-to-update-an-existing-sku)

- ### Delete

  - [How to delete an existing SKU](#how-to-delete-an-existing-sku)

## Create

### How to create an SKU

```typescript
  // selects the shipping category (it's a required relationship for the SKU resource)
  const shippingCategories = await cl.shipping_categories.list({ filters: { name_eq: 'Merchandising' } })

  const attributes = {
    code: 'TSHIRTMM000000FFFFFFXL',
    name: 'Black Men T-shirt with White Logo (XL)',
    shipping_category: cl.shipping_categories.relationship(shippingCategories[0].id), // assigns the relationship
  }

  const newSku = await cl.skus.create(attributes)
```

Check our API reference for more information on how to [create an SKU](https://docs.commercelayer.io/developers/v/api-reference/skus/create).

## Retrieve / List

### How to fetch a single SKU

```typescript
  // Fetches the SKU by ID
  const sku = await cl.skus.retrieve('BxAkSVqKEn')

  // Fetches the SKU by code
  const sku = await cl.skus.list({ filters: { code_eq: 'TSHIRTMM000000FFFFFFXLXX' } })

  // Fetches the first SKU of the list
  const sku = (await cl.skus.list()).first()

  // Fetches the last SKU of the list
  const sku = (await cl.skus.list()).last()
```

Check our API reference for more information on how to [retrieve an SKU](https://docs.commercelayer.io/developers/v/api-reference/skus/retrieve).

### How to fetch a collection of SKUs

```typescript
  // LISTING RESULTS

  // Fetches all the SKUs
  const skus = await cl.skus.list()

  // SORTING RESULTS

  // Sorts the results by creation date in ascending order (default)
  const skus = await cl.skus.list({ sort: { created_at: 'asc' } })

  // Sorts the results by creation date in descending order
  const skus = await cl.skus.list({ sort: { created_at: 'desc' } })

  // INCLUDING ASSOCIATIONS

  // Includes an association (prices)
  const skus = await cl.skus.list({ include: [ 'prices' ] })

  // SPARSE FIELDSETS

  // Requests the API to return only specific fields
  const skus = await cl.skus.list({ fields: { skus: [ 'name', 'metadata' ] } })

  // Requests the API to return only specific fields of the included resource
  const skus = await cl.skus.list({ include: [ 'prices' ], fields: { prices: [ 'currency_code', 'formatted_amount' ] } })

  // FILTERING DATA

  // Filters all the SKUs fetching only the ones whose code starts with the string "TSHIRT"
  const skus = await cl.skus.list({ filters: { code_start: 'TSHIRT' } })

  // Filters all the SKUs fetching only the ones whose code ends with the string "XLXX"
  const skus = await cl.skus.list({ filters: { code_end: 'XLXX' } })

  // Filters all the SKUs fetching only the ones whose name contains the string "White Logo"
  const skus = await cl.skus.list({ filters: { name_cont: 'White Logo' } })

  // Filters all the SKUs fetching only the ones created between two specific dates
  // (filters combined according to an AND logic)
  const skus = await cl.skus.list({ filters: { created_at_gt: '2018-01-01', created_at_lt: '2018-01-31'} })

  // Filters all the SKUs fetching only the ones created or updated after a specific date
  // (attributes combined according to an OR logic)
  const skus = await cl.skus.list({ filters: { updated_at_or_created_at_gt: '2019-10-10' } })

  // Filters all the SKUs fetching only the ones whose name contains the string "Black" and whose shipping category 
  // name starts with the string "MERCH"
  const skus = await cl.skus.list({ filters: { name_cont: 'Black', shipping_category_name_start: 'MERCH'} })
```

When fetching a collection of resources you can leverage the `meta` attribute to get its `meta` information:

```typescript
  const skus = await cl.skus.list()
  const meta = skus.meta
```

Check our API reference for more information on how to [list all SKUs](https://docs.commercelayer.io/developers/v/api-reference/skus/list), [sort the results](https://docs.commercelayer.io/developers/sorting-results), use [sparse fieldsets](https://docs.commercelayer.io/developers/sparse-fieldsets), [include associations](https://docs.commercelayer.io/developers/including-associations), and [filter data](https://docs.commercelayer.io/developers/filtering-data).

### How to paginate a collection of SKUs

When you fetch a collection of resources, you get paginated results:

```typescript
  // Fetches the SKUs, setting the page number to 3 and the page size to 5
  const skus = await cl.skus.list({ pageNumber: 3, pageSize: 5 })

  // Gets the total number of SKUs in the collection
  const skuCount = skus.meta.recordCount

  // Gets the total number of pages
  const pageCount = skus.meta.pageCount
```

> The default page number is **1**. The default page size is **10**. The maximum page size allowed is **25**.

Check our API reference for more information on how [pagination](https://docs.commercelayer.io/developers/pagination) works.

### How to iterate through a collection of SKUs

To execute a function for every item of a collection, use the `map()` method:

```typescript
  // Fetches the whole list of SKUs (1st page) and prints their names and codes to console
  const skus = await cl.skus.list()
  skus.map(p => console.log('Product: ' + p.name + ' - Code: ' + p.code))
```

### How to fetch resource relationships

Many resources have relationships with other resources and instead of including these associations as seen above, you can fetch them directly.
In this way, in case of 1-to-N relationship, you can filter or sort the resulting collection as for standard resources.

```typescript
// Fetches 1-to-1 related resource: billing address of an order
const billingAddress = cl.orders.billing_address('xYZkjABcde')

// Fetches 1-to-N related resources: orders associated to a customer
const orders = cl.customers.orders('XyzKjAbCDe', { fields: ['status', 'number'] })
```

## Update

### How to update an existing SKU

```typescript
  const sku = {
    id: 'xYZkjABcde',
    description: 'Updated description.',
    imageUrl: 'https://img.yourdomain.com/skus/new-image.png'
  }

  cl.skus.update(sku) // updates the SKU on the server
```

Check our API reference for more information on how to [update an SKU](https://docs.commercelayer.io/developers/v/api-reference/skus/update).

## Delete

### How to delete an existing SKU

```typescript
  cl.skus.delete('xYZkjABcde') // persisted deletion
```

Check our API reference for more information on how to [delete an SKU](https://docs.commercelayer.io/developers/v/api-reference/skus/delete).

# Overriding credentials

If needed, Commerce Layer JS SDK lets you change the client configuration set it at a request level.
To do that, just use the `config()` method or pass the `options` parameter and authenticate the API call with the desired credentials:

```typescript
  // Permanently change configuration at client level
  cl.config({ organization: 'you-organization-slug', accessToken: 'your-access-token' })
  const skus = await cl.skus.list()

  or

  // Use configuration at request level
  cl.skus.list({}, { organization: 'you-organization-slug', accessToken: 'your-access-token' })
```

# Handling validation errors

Commerce Layer API returns specific errors (with extra information) on each attribute of a single resource. You can inspect them to properly handle validation errors (if any). To do that, use the `errors` attribute of the catched error:

```typescript
  // logs error messages to console:

  const attributes = { code: 'TSHIRTMM000000FFFFFFXL', name: '' }

  const newSku = await cl.skus.create(attributes).catch(error => console.log(error.errors))

  /*
  [
    {
      title: "can't be blank",
      detail: "name - can't be blank",
      code: 'VALIDATION_ERROR',
      source: { pointer: '/data/attributes/name' },
      status: '422',
      meta: { error: 'blank' }
    },
    {
      title: 'has already been taken',
      detail: 'code - has already been taken',
      code: 'VALIDATION_ERROR',
      source: { pointer: '/data/attributes/code' },
      status: '422',
      meta: { error: 'taken', value: 'TSHIRTMM000000FFFFFFXL' }
    },
    {
      title: "can't be blank",
      detail: "shipping_category - can't be blank",
      code: 'VALIDATION_ERROR',
      source: { pointer: '/data/relationships/shipping_category' },
      status: '422',
      meta: { error: 'blank' }
    }
  ]
  */

```

Check our API reference for more information about the [errors](https://docs.commercelayer.io/developers/handling-errors) returned by the API.

---

### License

This repository is published under the [MIT](LICENSE) license.
