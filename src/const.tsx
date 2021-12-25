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
  MainPage = 'catalog/page_1',
  NotFoundPage = '/notfound'
}
