import { GuitarType, StringType } from './types/data';

export const PRODUCT_LIMIT = 9;
export const FIRST_PRODUCT = 0;
export const DELAY = 180;

export enum Title {
  Catalog = 'Каталог гитар',
  Product = 'Товар',
  Cart = 'Корзина',
}

export enum AppRoute {
  Root = '/',
  Catalog = 'catalog/page_:number',
  Product = 'product/:id',
  Cart = 'cart',
  NotFound = '*',
  Main = 'catalog/page_1',
  About = 'about',
  Where = 'where',
}

export const HeaderLinks = new Map([
  ['catalog', { title: 'Каталог', link: AppRoute.Main }],
  ['where', { title: 'Где купить?', link: AppRoute.Where }],
  ['about', { title: 'О компании', link: AppRoute.About }],
]);

export enum SortKey {
  Rating = 'rating',
  Price = 'price',
}

export enum OrderKey {
  Asc = 'asc',
  Desc = 'desc',
}

export enum ProductType {
  Acoustic = 'acoustic',
  Electric = 'electric',
  Ukulele = 'ukulele',
}

export const StringCount = new Map<string, StringType>([
  ['four', { id: '4-strings', stringCount: '4' }],
  ['six', { id: '6-strings', stringCount: '6' }],
  ['seven', { id: '7-strings', stringCount: '7' }],
  ['tvelwe', { id: '12-strings', stringCount: '12' }],
]);

export const ProductProperty = new Map<string, string[]>([
  ['acoustic', ['6', '7', '12']],
  ['electric', ['4', '6', '7']],
  ['ukulele', ['4']],
]);

export const enum ParamsKey {
  Type = 'type',
  String = 'stringCount',
}

export const GuitarsType = new Map<string, GuitarType>([
  ['acoustic', {id: 'acoustic', title: 'Акустические гитары'}],
  ['electric', {id: 'electric', title: 'Электрогитары'}],
  ['ukulele', {id: 'ukulele', title: 'Укулеле'}],
]);

