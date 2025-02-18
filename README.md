# Commerce Layer JS SDK

[![Version](https://img.shields.io/npm/v/@commercelayer/sdk.svg)](https://npmjs.org/package/@commercelayer/sdk)
[![Downloads/week](https://img.shields.io/npm/dw/@commercelayer/sdk.svg)](https://npmjs.org/package/@commercelayer/sdk)
[![License](https://img.shields.io/npm/l/@commercelayer/sdk.svg)](https://github.com/commercelayer/commercelayer-sdk/blob/master/package.json)
[![semantic-release: angular](https://img.shields.io/badge/semantic--release-angular-e10079?logo=semantic-release)](https://github.com/semantic-release/semantic-release)
[![Release](https://github.com/commercelayer/commercelayer-sdk/actions/workflows/semantic-release.yml/badge.svg)](https://github.com/commercelayer/commercelayer-sdk/actions/workflows/semantic-release.yml)
[![CodeQL](https://github.com/commercelayer/commercelayer-cli/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/commercelayer/commercelayer-cli/actions/workflows/codeql-analysis.yml)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript%205-%230074c1.svg)](https://www.typescriptlang.org/)

A JavaScript Library wrapper that makes it quick and easy to interact with the [Commerce Layer API](https://docs.commercelayer.io/developers).

## What is Commerce Layer?

[Commerce Layer](https://commercelayer.io) is a multi-market commerce API and order management system that lets you add global shopping capabilities to any website, mobile app, chatbot, wearable, voice, or IoT device, with ease. Compose your stack with the best-of-breed tools you already mastered and love. Make any experience shoppable, anywhere, through a blazing-fast, enterprise-grade, and secure API.

## Table of contents

- [Getting started](#getting-started)
- [Installation](#installation)
- [Authentication](#authentication)
- [Import](#import)
- [Options](#options)
- [SDK usage](#sdk-usage)
- [Overriding credentials](#overriding-credentials)
- [Handling validation errors](#handling-validation-errors)
- [Using interceptors](#using-interceptors)
- [Refreshing access token](#refreshing-access-token)
- [Contributors guide](#contributors-guide)
- [Need help?](#need-help)
- [License](#license)

---

## Getting started

To get started with Commerce Layer JS SDK you need to install it, get the credentials that will allow you to perform your API calls, and import the SDK into your application's code. The sections below explain how to achieve this.

> If you want, you can also read [this tutorial](https://commercelayer.io/blog/getting-started-with-commerce-layer-javascript-sdk) from Commerce Layer's blog.

### Installation

Commerce Layer JS SDK is available as an [npm](https://www.npmjs.com/package/@commercelayer/sdk) and [yarn](https://yarnpkg.com/package/@commercelayer/sdk) package that you can install with the command below:

```shell
npm install @commercelayer/sdk

// or

yarn add @commercelayer/sdk
```

### Authentication

All requests to Commerce Layer API must be authenticated with an [OAuth2](https://oauth.net/2) bearer token. Hence, before starting to use this SDK you need to get a valid access token. Kindly check [our documentation](https://docs.commercelayer.io/developers/authentication) for more information about the available authorization flows.

> Feel free to use [Commerce Layer JS Auth](https://github.com/commercelayer/commercelayer-js-auth), a JavaScript library that helps you wrap our authentication API.

### Import

You can use the ES6 default import with the SDK like so:

```javascript
import CommerceLayer from '@commercelayer/sdk'

const cl = CommerceLayer({
  organization: 'your-organization-slug',
  accessToken: 'your-access-token'
})
```

### Options

When instantiating a new SDK client you can pass some options to initialize it:

```javascript
{
  organization: string        // The organization slug
  accessToken: string         // A valid API access token
  timeout?: number            // A custom request timout (<= 15 secs [default])
  headers?: RequestHeaders    // Custom request headers
  userAgent?: string          // Custom user-agent useful in certaing contexts but often not allowed by browsers
  fetch?: Fetch               // A specific fetch implementation 
  refreshToken?: RefreshToken // A function responsible for token refresh
}
```

Same options can be changed after SDK initialization or passed at runtime while executing an API call:

```javascript
  const options = { ... }

  // Instantiate the client using desired options
  const cl = CommerceLayer(options)

  // Change configuration after client cteation
  cl.config(options)

  // Use runtime configuration without persisting settings
  cl.customers.list({}, options)
```

## SDK usage

The JavaScript SDK is a wrapper around Commerce Layer API which means you would still be making API requests but with a different syntax. For now, we don't have comprehensive SDK documentation for every single resource our API supports (about 400+ endpoints), hence you will need to rely on our comprehensive [API Reference](https://docs.commercelayer.io/core/v/api-reference) as you go about using this SDK. So for example, if you want to create an order, take a look at the [Order object](https://docs.commercelayer.io/core/v/api-reference/orders/object) or the [Create an order](https://docs.commercelayer.io/core/v/api-reference/orders/create) documentation to see the required attributes and/or relationships. The same goes for every other supported resource.

To show you how things work, we will use the [SKUs](https://docs.commercelayer.io/core/v/api-reference/skus) and [Shipping Categories](https://docs.commercelayer.io/core/v/api-reference/shipping_categories) resource in the following examples. The code snippets below show how to use the SDK when performing the standard CRUD operations provided by our REST API. Kindly check our [API reference](https://docs.commercelayer.io/core/v/api-reference) for the complete list of available **resources** and their **attributes**.

### Create

<details>
<summary>How to create an SKU</summary>
<br />

```javascript
  // Select the shipping category (it's a required relationship for the SKU resource)
  const shippingCategories = await cl.shipping_categories.list({ filters: { name_eq: 'Merchandising' } })

  const attributes = {
    code: 'TSHIRTMM000000FFFFFFXL',
    name: 'Black Men T-shirt with White Logo (XL)',
    description: "A very beautiful and cozy mens t-shirt",
    weight: "500",
    unit_of_weight: "gr"
    shipping_category: cl.shipping_categories.relationship(shippingCategories[0].id), // assigns the relationship
  }

  const newSku = await cl.skus.create(attributes)
```

ℹ️ Check our API reference for more information on how to [create an SKU](https://docs.commercelayer.io/developers/v/api-reference/skus/create).
</details>

### Retrieve / List

<details>
<summary>How to fetch a single SKU</summary>
<br />

```javascript
  // Fetch the SKU by ID
  const sku = await cl.skus.retrieve('BxAkSVqKEn')

  // Fetch all SKUs and filter by code
  const sku = await cl.skus.list({ filters: { code_eq: 'TSHIRTMM000000FFFFFFXLXX' } })

  // Fetch the first SKU of the list
  const sku = (await cl.skus.list()).first()

  // Fetch the last SKU of the list
  const sku = (await cl.skus.list()).last()
```

ℹ️ Check our API reference for more information on how to [retrieve an SKU](https://docs.commercelayer.io/developers/v/api-reference/skus/retrieve).
</details>

<details>
<summary>How to fetch a collection of SKUs</summary>
<br />

```javascript
  // Fetch all the SKUs
  const skus = await cl.skus.list()
```

When fetching a collection of resources you can leverage the `meta` attribute to get its `meta` information like so:

```javascript
  const skus = await cl.skus.list()
  const meta = skus.meta
```

ℹ️ Check our API reference for more information on how to [list all SKUs](https://docs.commercelayer.io/developers/v/api-reference/skus/list).
</details>

<details>
<summary>How to fetch a collection of SKUs and sort the results</summary>
<br />

```javascript
  // Sort the results by creation date in ascending order (default)
  const skus = await cl.skus.list({ sort: { created_at: 'asc' } })

  // Sort the results by creation date in descending order
  const skus = await cl.skus.list({ sort: { created_at: 'desc' } })
  ```

ℹ️ Check our API reference for more information on how to [sort results](https://docs.commercelayer.io/developers/sorting-results).
</details>

<details>
<summary>How to fetch a collection of SKUs and include associations</summary>
<br />

```javascript
  // Include an association (prices)
  const skus = await cl.skus.list({ include: [ 'prices' ] })

  // Include an association (stock items)
  const skus = await cl.skus.list({ include: [ 'stock_items' ] })
  ```

ℹ️ Check our API reference for more information on how to [include associations](https://docs.commercelayer.io/developers/including-associations).
</details>

<details>
<summary>How to fetch a collection of SKUs and return specific fields (sparse fieldsets)</summary>
<br />

```javascript
  // Request the API to return only specific fields
  const skus = await cl.skus.list({ fields: { skus: [ 'name', 'metadata' ] } })

  // Request the API to return only specific fields of the included resource
  const skus = await cl.skus.list({ include: [ 'prices' ], fields: { prices: [ 'currency_code', 'formatted_amount' ] } })
  ```

ℹ️ Check our API reference for more information on how to [use sparse fieldsets](https://docs.commercelayer.io/developers/sparse-fieldsets).
</details>

<details>
<summary>How to fetch a collection of SKUs and filter data</summary>
<br />

```javascript
  // Filter all the SKUs fetching only the ones whose code starts with the string "TSHIRT"
  const skus = await cl.skus.list({ filters: { code_start: 'TSHIRT' } })

  // Filter all the SKUs fetching only the ones whose code ends with the string "XLXX"
  const skus = await cl.skus.list({ filters: { code_end: 'XLXX' } })

  // Filter all the SKUs fetching only the ones whose name contains the string "White Logo"
  const skus = await cl.skus.list({ filters: { name_cont: 'White Logo' } })

  // Filter all the SKUs fetching only the ones created between two specific dates
  // (filters combined according to the AND logic)
  const skus = await cl.skus.list({ filters: { created_at_gt: '2018-01-01', created_at_lt: '2018-01-31'} })

  // Filters all the SKUs fetching only the ones created or updated after a specific date
  // (attributes combined according to the OR logic)
  const skus = await cl.skus.list({ filters: { updated_at_or_created_at_gt: '2019-10-10' } })

  // Filters all the SKUs fetching only the ones whose name contains the string "Black"
  // and whose shipping category name starts with the string "MERCH"
  const skus = await cl.skus.list({ filters: { name_cont: 'Black', shipping_category_name_start: 'MERCH'} })
  ```

ℹ️ Check our API reference for more information on how to [filter data](https://docs.commercelayer.io/developers/filtering-data).
</details>

<details>
<summary>How to paginate a collection of SKUs</summary>
<br />

When you fetch a collection of resources, you get paginated results. You can request specific pages or items in a page like so:

```javascript
  // Fetch the SKUs, setting the page number to 3 and the page size to 5
  const skus = await cl.skus.list({ pageNumber: 3, pageSize: 5 })

  // Get the total number of SKUs in the collection
  const skuCount = skus.meta.recordCount

  // Get the total number of pages
  const pageCount = skus.meta.pageCount
```

> PS: the default page number is **1**, the default page size is **10**, and the maximum page size allowed is **25**.

ℹ️ Check our API reference for more information on how [pagination](https://docs.commercelayer.io/developers/pagination) works.
</details>

<details>
<summary>How to iterate through a collection of SKUs</summary>
<br />

To execute a function for every item of a collection, use the `map()` method like so:

```javascript
  // Fetch the whole list of SKUs (1st page) and print their names and codes to console
  const skus = await cl.skus.list()
  skus.map(p => console.log('Product: ' + p.name + ' - Code: ' + p.code))
```

</details>

<!-- <details>
<summary>How to build complex queries</summary>
<br />

Coming soon...
</details> -->

<details>
<summary>How to fetch resource relationships</summary>
<br />

Many resources have relationships with other resources and instead of including these associations as seen above, you can fetch them directly. This way, in the case of 1-to-N relationships, you can filter or sort the resulting collection as standard resources.

```javascript
// Fetch 1-to-1 related resource: billing address of an order
const billingAddress = await cl.orders.billing_address('xYZkjABcde')

// Fetch 1-to-N related resources: orders associated to a customer
const orders = await cl.customers.orders('XyzKjAbCDe', { fields: ['status', 'number'] })
```

In general:

- An API endpoint like `/api/customers` or `/api/customers/<customerId>` translates to `cl.customers` or `cl.customers('<customerId>')` with the SDK.
- 1-to-1 relationship API endpoints like `/api/orders/<orderId>/shipping_address` translates to `cl.orders('<orderId>', { include: ['shipping_address'] }}` with the SDK.
- 1-to-N relationship API endpoints like  `/api/customers/<customerId>?include=orders` or `/api/customers/<customerId>/orders` translates to `cl.customers.retrieve('<customerId>', { include: ['orders'] })` or `cl.customers.orders('<customerId>')` with the SDK.

ℹ️ Check our API reference for more information on how to [fetch relationships](https://docs.commercelayer.io/core/fetching-relationships).
</details>

<details>
<summary>How to count resources</summary>
<br />

Many times you simply need to count how many resources exist with
certain characteristics. You can then call the special `count`
function passing a filter to get as result the total number of
resources.

```javascript
// Get the total number of placed orders
const placedOrders = await cl.orders.count({ filters: { status_eq: 'placed' } })

```

</details>

### Update

<details>
<summary>How to update an existing SKU</summary>
<br />

```javascript
  const sku = {
    id: 'xYZkjABcde',
    description: 'Updated description...',
    imageUrl: 'https://img.yourdomain.com/skus/new-image.png'
  }

  cl.skus.update(sku) // updates the SKU on the server
```

ℹ️ Check our API reference for more information on how to [update an SKU](https://docs.commercelayer.io/developers/v/api-reference/skus/update).
</details>

### Delete

<details>
<summary>How to delete an existing SKU</summary>
<br />

```javascript
  cl.skus.delete('xYZkjABcde') // persisted deletion
```

ℹ️ Check our API reference for more information on how to [delete an SKU](https://docs.commercelayer.io/developers/v/api-reference/skus/delete).
</details>

## Overriding credentials

If needed, Commerce Layer JS SDK lets you change the client configuration and set it at a request level. To do that, just use the `config()` method or pass the `options` parameter and authenticate the API call with the desired credentials:

```javascript
  // Permanently change configuration at client level
  cl.config({ organization: 'you-organization-slug', accessToken: 'your-access-token' })
  const skus = await cl.skus.list()

  or

  // Use configuration at request level
  cl.skus.list({}, { organization: 'you-organization-slug', accessToken: 'your-access-token' })
```

## Handling validation errors

Commerce Layer API returns specific errors (with extra information) on each attribute of a single resource. You can inspect them to properly handle validation errors (if any). To do that, use the `errors` attribute of the catched error:

```javascript
  // Log error messages to console:
  const attributes = { code: 'TSHIRTMM000000FFFFFFXL', name: '' }

  const newSku = await cl.skus.create(attributes).catch(error => console.log(error.errors))

  // Logged errors
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

ℹ️ Check our API reference for more information about the [errors](https://docs.commercelayer.io/developers/handling-errors) returned by the API.

## Using interceptors

You can use interceptors to intercept SDK messages and modify them on the fly before the request is sent to the API or before the response is parsed and returned by the client. You can also access the error object before it is thrown by the SDK.

Interceptors are special functions that are able to handle SDK messages and return a (eventually) modified version of them for use by the client.

```javascript
  const requestInterceptor = (request: RequestObj): RequestObj => {
    console.log(request)
    return request
  }

  const responseInterceptor = (response: ResponseObj): ResponseObj => {
    console.log(response)
    return response
  }

  const errorInterceptor = (error: ErrorObj): ErrorObj => {
    console.log(error)
    return error
  }
```

Here an example of how to use them:

```javascript
  // Add the interceptors (only one or all if needed)
  cl.addRequestInterceptor(requestInterceptor)
  cl.addResponseInterceptor(responseInterceptor, errorInterceptor)

  const customers = await cl.customers.list()

  // Remove interceptors
  // Tt is possible to remove only a specific interceptor: cl.removeInterceptor('request')
  cl.removeInterceptors()
```

#### Raw Response Reader

The *RawResponseReader* is a special interceptor that allows to catch the original message coming frome the API before it is parsed and translated in SDK objects.

```javascript
  // Add a RawResponseReader capable of capturing also response headers
  const rrr = cl.addRawResponseReader({ headers: true })
  
  const customers = await cl.customers.list()

  cl.removeRawResponseReader()

  console.log(rrr.rawResponse)
  console.log(rrr.headers)
```

## Refreshing access token

It is possible that you are using an access token that is about to expire especially if it has been used for many API calls.
In this case you can define a special function that takes care of refreshing the token when a call fails because it has expired.

```javascript
  async function myRefreshTokenFunction(espiredToken: string): Promise<string> {
    // Get a new access token using for example our js-auth library
    return (await getAccessToken()).accessToken
  }

  cl.config({ refreshToken: myRefreshTokenFunction })

  // If needed you can later retrieve the new access token
  const newToken = cl.currentAccessToken
```

## Contributors guide

1. Fork [this repository](https://github.com/commercelayer/commercelayer-sdk) (learn how to do this [here](https://help.github.com/articles/fork-a-repo)).

2. Clone the forked repository like so:

    ```shell
    git clone https://github.com/<your username>/commercelayer-sdk.git && cd commercelayer-sdk
    ```

3. Make your changes and create a pull request ([learn how to do this](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request)).

4. Someone will attend to your pull request and provide some feedback.

## Need help?

- Join [Commerce Layer's Discord community](https://discord.gg/commercelayer).
- Ping us on [Bluesky](https://bsky.app/profile/commercelayer.io), [X (formerly Twitter)](https://x.com/commercelayer), or [LinkedIn](https://www.linkedin.com/company/commerce-layer).
- Is there a bug? Create an [issue](https://github.com/commercelayer/commercelayer-sdk/issues) on this repository.

## License

This repository is published under the [MIT](LICENSE) license.
