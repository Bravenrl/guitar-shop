export const PRODUCT_LIMIT = 9;
export const FIRST_PRODUCT = 0;

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

