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
};

export const ROOT = `${TestReg.Root}`;
export const WIP = `${TestReg.WipPage}`;
export const Main =`${TestReg.Main}`;
