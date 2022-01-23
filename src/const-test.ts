export const TestReg = {
  BackToRoot: new RegExp('Перейти главную страницу', 'i'),
  NotFoundPage: new RegExp('404. Этой страницы не существует', 'i'),
  Root: new RegExp('root', 'i'),
  WipPage: new RegExp('Эта страница находится в разработке', 'i'),
  BreadcrumbsMain: new RegExp('Главная', 'i'),
  BreadcrumbsCatalog: new RegExp('Каталог', 'i'),
  Logo: new RegExp('Логотип', 'i'),
  FooterAbout: new RegExp('О нас', 'i'),
  Where: new RegExp('Где купить?', 'i'),
  About: new RegExp('О компании', 'i'),
  FooterBlog: new RegExp('Блог', 'i'),
  FooterQuestion: new RegExp('Вопрос - ответ', 'i'),
  FooterBack: new RegExp('Возврат', 'i'),
  FooterService: new RegExp('Сервис-центр', 'i'),
  FooterConstacts: new RegExp('Контакты', 'i'),
  FooterWork: new RegExp('Режим работы:', 'i'),
  SearchPlaceholder: new RegExp('что вы ищите?', 'i'),
  SearchLabel: new RegExp('Поиск', 'i'),
  CartLabel: new RegExp('Корзина', 'i'),
  Catalog: new RegExp('Каталог', 'i'),
  Main: new RegExp('Main', 'i'),
  AboutProduct: new RegExp('Подробнее', 'i'),
  NextPage: new RegExp('Далее', 'i'),
  PrevPage: new RegExp('Назад', 'i'),
  ByPrice: new RegExp('по цене', 'i'),
  ByRating: new RegExp('по популярности', 'i'),
  Ascending: new RegExp('По возрастанию', 'i'),
  Descending: new RegExp('По убыванию', 'i'),
  PriceTitle: new RegExp('Цена, ₽', 'i'),
  TypeTitle: new RegExp('Тип гитар', 'i'),
  StringTitle: new RegExp('Количество струн', 'i'),
  Electric: new RegExp('Электрогитары', 'i'),
  Acoustic: new RegExp('Акустические гитары', 'i'),
  Ukulele: new RegExp('Укулеле', 'i'),
  StringFour: new RegExp('4', 'i'),
  StringSix: new RegExp('6', 'i'),
  StringSeven: new RegExp('7', 'i'),
  StringTwelve: new RegExp('12', 'i'),
  FilterTitle: new RegExp('Фильтр', 'i'),
  Preloader: new RegExp('Loading', 'i'),
  NoProduct: new RegExp('Нет гитар с заданными параметрами', 'i'),
};

export const ROOT = `${TestReg.Root}`;
export const WIP = `${TestReg.WipPage}`;
export const Main =`${TestReg.Main}`;

export const enum TestID {
  Pagination = 'pagination',
  Back = 'back',
  Next = 'next',
  PriceMin = 'priceMin',
  PriceMax = 'priceMax',
  Acoustic = 'acoustic',
  Electric = 'electric',
  Ukulele = 'ukulele',
  Four = '4-strings',
  Six = '6-strings',
  Seven = '7-strings',
  Twelve = '12-strings',
  Star = 'star',
  FullStar = 'fullStar',
}
