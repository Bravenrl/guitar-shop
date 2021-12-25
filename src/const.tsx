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
  NotFoundPage = '*',
  Main = 'catalog/page_1',
  NotFound = '/notfound',
  About = 'about',
  Where = 'where',
}

export const HeaderLinks = new Map([
  ['catalog', { title: 'Каталог', link: AppRoute.Main }],
  ['where', { title: 'Где купить?', link: AppRoute.Where }],
  ['about', { title: 'О компании', link: AppRoute.About }],
]);
