export const TestReg = {
  BackToRoot: new RegExp('Перейти главную страницу', 'i'),
  NotFoundPage: new RegExp('404. Этой страницы не существует', 'i'),
  Root: new RegExp('root', 'i'),
  WipPage: new RegExp('Эта страница находится в разработке', 'i'),
};

export const ROOT = `${TestReg.Root}`;
