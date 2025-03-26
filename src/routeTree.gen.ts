/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as TodoImport } from './routes/todo'
import { Route as ProductImport } from './routes/product'
import { Route as CartImport } from './routes/cart'
import { Route as IndexImport } from './routes/index'
import { Route as ProductProductNameProductIdImport } from './routes/product_.$productName.$productId'

// Create/Update Routes

const TodoRoute = TodoImport.update({
  id: '/todo',
  path: '/todo',
  getParentRoute: () => rootRoute,
} as any)

const ProductRoute = ProductImport.update({
  id: '/product',
  path: '/product',
  getParentRoute: () => rootRoute,
} as any)

const CartRoute = CartImport.update({
  id: '/cart',
  path: '/cart',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const ProductProductNameProductIdRoute =
  ProductProductNameProductIdImport.update({
    id: '/product_/$productName/$productId',
    path: '/product/$productName/$productId',
    getParentRoute: () => rootRoute,
  } as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/cart': {
      id: '/cart'
      path: '/cart'
      fullPath: '/cart'
      preLoaderRoute: typeof CartImport
      parentRoute: typeof rootRoute
    }
    '/product': {
      id: '/product'
      path: '/product'
      fullPath: '/product'
      preLoaderRoute: typeof ProductImport
      parentRoute: typeof rootRoute
    }
    '/todo': {
      id: '/todo'
      path: '/todo'
      fullPath: '/todo'
      preLoaderRoute: typeof TodoImport
      parentRoute: typeof rootRoute
    }
    '/product_/$productName/$productId': {
      id: '/product_/$productName/$productId'
      path: '/product/$productName/$productId'
      fullPath: '/product/$productName/$productId'
      preLoaderRoute: typeof ProductProductNameProductIdImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/cart': typeof CartRoute
  '/product': typeof ProductRoute
  '/todo': typeof TodoRoute
  '/product/$productName/$productId': typeof ProductProductNameProductIdRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/cart': typeof CartRoute
  '/product': typeof ProductRoute
  '/todo': typeof TodoRoute
  '/product/$productName/$productId': typeof ProductProductNameProductIdRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/cart': typeof CartRoute
  '/product': typeof ProductRoute
  '/todo': typeof TodoRoute
  '/product_/$productName/$productId': typeof ProductProductNameProductIdRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/cart'
    | '/product'
    | '/todo'
    | '/product/$productName/$productId'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/cart' | '/product' | '/todo' | '/product/$productName/$productId'
  id:
    | '__root__'
    | '/'
    | '/cart'
    | '/product'
    | '/todo'
    | '/product_/$productName/$productId'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  CartRoute: typeof CartRoute
  ProductRoute: typeof ProductRoute
  TodoRoute: typeof TodoRoute
  ProductProductNameProductIdRoute: typeof ProductProductNameProductIdRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  CartRoute: CartRoute,
  ProductRoute: ProductRoute,
  TodoRoute: TodoRoute,
  ProductProductNameProductIdRoute: ProductProductNameProductIdRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/cart",
        "/product",
        "/todo",
        "/product_/$productName/$productId"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/cart": {
      "filePath": "cart.tsx"
    },
    "/product": {
      "filePath": "product.tsx"
    },
    "/todo": {
      "filePath": "todo.tsx"
    },
    "/product_/$productName/$productId": {
      "filePath": "product_.$productName.$productId.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
