# Commerce Layer JS SDK

A JavaScript Library wrapper that makes it quick and easy to interact with the [Commerce Layer API](https://docs.commercelayer.io/api/).

### What is Commerce Layer?

[Commerce Layer](https://commercelayer.io) is a multi-market commerce API and order management system that lets you add global shopping capabilities to any website, mobile app, chatbot, wearable, voice, or IoT device, with ease. Compose your stack with the best-of-breed tools you already mastered and love. Make any experience shoppable, anywhere, through a blazing-fast, enterprise-grade, and secure API.

# Getting started

To get started with Commerce Layer JS SDK you need to install it and then get the credentials that will allow you to perform your API calls.

- [Installation](#installation)
- [Authentication](#authentication)
- [Import](#import)

## Installation

Commerce Layer JS SDK is available as an [npm package](https://www.npmjs.com/package/@commercelayer/sdk):

```
// npm
npm install @commercelayer/sdk

// yarn
yarn add @commercelayer/sdk
```

## Authentication

All requests to Commerce Layer API must be authenticated with an [OAuth2](https://oauth.net/2/) bearer token. Hence, before starting to use this SDK you need to get a valid access token. Check [our documentation](https://docs.commercelayer.io/api/authentication) for more information about the available authorization flows.

> Feel free to use [Commerce Layer JS Auth](https://github.com/commercelayer/commercelayer-js-auth), a JavaScript library that helps you wrap our authentication API.

## Import

You can use the ES6 default import with the SDK as follow:

```
import CommerceLayer from '@commercelayer/sdk'

const cl = CommerceLayer({
  organization: 'your-organization-slug',
  accessToken: 'your-access-token'
})
```

> In the following examples, we will use only the the specific resources we're going to access (SKUs and shipping categories). Check our [API reference](https://docs.commercelayer.io/api/) for the complete list of available resources and their attributes.

# Usage

The code snippets below show how to use the Commerce Layer JS SDK when performing the standard CRUD operations provided by our REST API on the SKU resource.

- ### Create
  - [How to create an SKU](#how-to-create-an-sku)
- ### Retrieve
  - [How to fetch a single SKU](#how-to-fetch-a-single-sku)
  - [How to fetch a collection of SKUs](#how-to-fetch-a-collection-of-skus)
  - [How to paginate a collection of SKUs](#how-to-paginate-a-collection-of-skus)
  - [How to iterate through a collection of SKUs](#how-to-iterate-through-a-collection-of-skus)
  - [How to build complex queries](#how-to-build-complex-queries)
- ### Update
  - [How to update an existing SKU](#how-to-update-an-existing-sku)
- ### Delete
  - [How to delete an existing SKU](#how-to-delete-an-existing-sku)

## Create

### How to create an SKU

```
  // selects the shipping category (it's a required relationship for the SKU resource)
  const shippingCategories = await cl.shipping_categories.list({ filters: { name_eq: 'Merchandising' } })

  const attributes = {
	  code: 'TSHIRTMM000000FFFFFFXL',
	  name: 'Black Men T-shirt with White Logo (XL)',
	  shipping_category: cl.shipping_categories.relationship(shippingCategories[0].id), // assigns the relationship
  }

  const newSku = await cl.skus.create(attributes)
```

Check our API reference for more information on how to [create an SKU](https://docs.commercelayer.io/api/resources/skus/create_sku).

## Retrieve

### How to fetch a single SKU

```
  // Fetches the SKU by ID
  const sku = await cl.skus.retrieve('BxAkSVqKEn')

  // Fetches the SKU by code
  const sku = await cl.skus.list({ filters: { code_eq: 'TSHIRTMM000000FFFFFFXLXX' } })

  // Fetches the first SKU of the list
  const sku = (await cl.skus.list()).first()

  // Fetches the last SKU of the list
  const sku = (await cl.skus.list()).last()
```

Check our API reference for more information on how to [retrieve an SKU](https://docs.commercelayer.io/api/resources/skus/retrieve_sku).

### How to fetch a collection of SKUs

```
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
  const skus = await cl.skus.list({ filters: { created_at_gt: '2018-01-01', created_at_lt: '2018-01-31'} }) // filters combined according to an AND logic

  // Filters all the SKUs fetching only the ones created or updated after a specific date
  const skus = await cl.skus.list({ filters: { updated_at_or_created_at_gt: '2019-10-10' } }) // attributes combined according to an OR logic

  // Filters all the SKUs fetching only the ones whose name contains the string "Black" and whose shipping category name starts with the string "MERCH"
  const skus = await cl.skus.list({ filters: { name_cont: 'Black', shipping_category_name_start: 'MERCH'} })
```

When fetching a collection of resources you can leverage the `meta` attribute to get its `meta` information:

```
  const skus = await cl.skus.list()
  const meta = skus.meta
```

Check our API reference for more information on how to [list all SKUs](https://docs.commercelayer.io/api/resources/skus/list_skus), [sort the results](https://docs.commercelayer.io/api/sorting-results), use [sparse fieldsets](https://docs.commercelayer.io/api/sparse-fieldsets), [include associations](https://docs.commercelayer.io/api/including-associations), and [filter data](https://docs.commercelayer.io/api/filtering-data).

### How to paginate a collection of SKUs

When you fetch a collection of resources, you get paginated results:

```
  // Fetches the SKUs, setting the page number to 3 and the page size to 5
  const skus = await cl.skus.list({ pageNumber: 3, pageSize: 5 })

  // Gets the total number of SKUs in the collection
  const skuCount = skus.meta.recordCount

  // Gets the total number of pages
  const pageCount = skus.meta.pageCount
```

> The default page number is **1**. The default page size is **10**. The maximum page size allowed is **25**.

Check our API reference for more information on how [pagination](https://docs.commercelayer.io/api/pagination) works.

### How to iterate through a collection of SKUs

To execute a function for every item of a collection, use the `map()` method:

```
  // Fetches the whole list of SKUs and prints their names and codes to console
  const skus = await cl.skus.list()
  skus.map(p => console.log('Product: ' + p.name + ' - Code: ' + p.code))
```

## Update

### How to update an existing SKU

```
  const sku = {
    id: 'xYZkjABcde',
    description: 'Updated description.',
    imageUrl: 'https://img.yourdomain.com/skus/new-image.png'
  }

  cl.skus.update(sku) // updates the SKU on the server
```

Check our API reference for more information on how to [update an SKU](https://docs.commercelayer.io/api/resources/skus/update_sku).

## Delete

### How to delete an existing SKU

```
  cl.skus.delete('xYZkjABcde') // persisted deletion
```

Check our API reference for more information on how to [delete an SKU](https://docs.commercelayer.io/api/resources/skus/delete_sku).

# Overriding credentials

If needed, Commerce Layer JS SDK lets you change the client configuration set it at a request level. To do that, just use the `config()` method or pass the `options` parameter and authenticate the API call with the desired credentials:

```
  // Permanently change configuration at client level
  cl.config({ organization: 'you-organization-slug', accessToken: 'your-access-token' })
  const skus = await cl.skus.list()

  or

  // Use configuration at request level
  cl.skus.list({}, { organization: 'you-organization-slug', accessToken: 'your-access-token' })
```

# Handling validation errors

Commerce Layer API returns specific errors (with extra information) on each attribute of a single resource. You can inspect them to properly handle validation errors (if any). To do that, use the `errors` attribute of the catched error:

```
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

Check our API reference for more information about the [errors](https://docs.commercelayer.io/api/handling-errors) returned by the API.

---

### License

This repository is published under the [MIT](LICENSE) license.
