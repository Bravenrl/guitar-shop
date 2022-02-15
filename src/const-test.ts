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
  LeaveReviewBtn: new RegExp('Оставить отзыв', 'i'),
  ShowMoreBtn: new RegExp('Показать еще отзывы', 'i'),
  ScrollBtn: new RegExp('Наверх', 'i'),
  AddCartBtn: new RegExp('Добавить в корзину', 'i'),
  Price: new RegExp('Цена', 'i'),
  Rating: new RegExp('Рейтинг', 'i'),
  Characteristics: new RegExp('Характеристики', 'i'),
  Description: new RegExp('Описание', 'i'),
  Reviews: new RegExp('Отзывы', 'i'),
  NoReviews: new RegExp('Отзывов ещё нет', 'i'),
  Comment: new RegExp('Комментарий', 'i'),
  SuccessBtn: new RegExp('К покупкам!', 'i'),
  SubmitBtn: new RegExp('Отправить отзыв', 'i'),
  ValidErrorText: new RegExp('Заполните поле', 'i'),
  ValidErrorStar: new RegExp('Поставьте оценку', 'i'),
  ToCart: new RegExp('Перейти в корзину', 'i'),
  CartSuccessMessage: new RegExp('Товар успешно добавлен в корзину', 'i'),
  CartSuccessRedirect: new RegExp('Перейти в корзину', 'i'),
  CartResume: new RegExp('Продолжить покупки', 'i'),
  CartAddTitle: new RegExp('Добавить товар в корзину', 'i'),
  CartAddBtn: new RegExp('Добавить в корзину', 'i'),
  CartDeleteTitle: new RegExp('Удалить этот товар?', 'i'),
  CartDeleteRemove: new RegExp('Удалить товар', 'i'),
  OrderBtn: new RegExp('Оформить заказ', 'i'),
  QuantAdd: new RegExp('Увеличить количество', 'i'),
  QuantRemove: new RegExp('Уменьшить количество', 'i'),
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
  ModalCloseBtn = 'modalCloseBtn',
  InputName = 'userName',
  InputStar = 'star',
  InputAdv = 'adv',
  InputDisadv = 'disadv',
  InputComment = 'comment',
  ModalOverlay = 'modalOverlay',
  ModalWrap = 'modalWrap',
  Submit = 'submit',
  Discount = 'discount',
  Quantity = 'quantity'
}
