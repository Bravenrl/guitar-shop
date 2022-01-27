export const API_URL = 'https://accelerator-guitar-shop-api-v1.glitch.me';

export const HEADER_TOTAL_COUNT = 'x-total-count';

export enum ErrorMessage {
  NetworkError = 'Network Error',
  Redirect = 'Redirect',
  BadRequest = 'Request failed with status code 400',
  Incorrect = 'Incorrect data entered',
  NotFound = 'Request failed with status code 404',
}

export enum ApiRoute {
  Products = '/guitars',
  Comments = '/comments',
}

export const enum HttpCode {
  NotFound = 404,
  OK = 200,
  BadRequest = 400,
}
