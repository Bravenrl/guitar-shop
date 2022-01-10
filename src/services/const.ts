export const API_URL = 'https://accelerator-guitar-shop-api-v1.glitch.me';

export const HEADER_TOTAL_COUNT = 'x-total-count';

export enum ApiRoute {
  Products = '/guitars',

}

export const enum HttpCode {
  BadRequest = 400,
  NotFound = 404,
  OK = 200,
}
