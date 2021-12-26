export const API_URL = 'https://accelerator-guitar-shop-api-v1.glitch.me';

export enum ApiRoute {
  ProductsInit = '/guitars?_sort=price',
  ProductsShow = '/guitars',
}

export const enum HttpCode {
  BadRequest = 400,
  NotFound = 404,
  OK = 200,
}
