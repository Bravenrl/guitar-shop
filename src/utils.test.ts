import { OrderKey, ProductType, SortKey } from './const';
import { CreateFakeComment, fakeProduct } from './mock/fakeData';
import { FilterState, SortState } from './types/state';
import { createFilterQuery, createPageQuery, createQuery, createSortQuery, getCommentsSortByDate, getFormatDate, getSortedProducts } from './utils';

const EXPECT_FILTER_QUERY = 'price_gte=10&price_lte=20&stringCount=6&stringCount=7&type=acoustic&type=electric';
const EXPECT_PAGE_QUERY = '_end=9&_start=0';
const EXPECT_SORT_QUERY = '_order=asc&_sort=price';
const EXPECT_EMBED_QUERY = '_embed=comments';
const PAGE = 1;
const Sort:SortState = {
  sortKey: SortKey.Price,
  orderKey: OrderKey.Asc,
};
const Filter:FilterState = {
  productTypes: [ProductType.Acoustic, ProductType.Electric],
  stringCounts: ['6', '7'],
  priceMin: '10',
  priceMax: '20',
};

const KEY = 'key';


const fakeProductsNonSort = [
  {...fakeProduct, name: 'somekey'},
  {...fakeProduct, name: 'Keys'},
  {...fakeProduct, name: 'key'},
];

const fakeProductsSort = [
  {...fakeProduct, name: 'Keys'},
  {...fakeProduct, name: 'key'},
  {...fakeProduct, name: 'somekey'},
];

const fakeComment = CreateFakeComment();
const fakeCommentNonSort = [
  {...fakeComment, createAt: '2021-10-28T12:32:16.934Z'},
  {...fakeComment, createAt: '2021-11-28T12:32:16.934Z'},
  {...fakeComment, createAt: '2021-10-28T13:32:16.934Z'},
];
const fakeCommentSort = [
  {...fakeComment, createAt: '2021-11-28T12:32:16.934Z'},
  {...fakeComment, createAt: '2021-10-28T13:32:16.934Z'},
  {...fakeComment, createAt: '2021-10-28T12:32:16.934Z'},
];

const DATE = '2022-01-24T12:32:16.934Z';
const FORMAT_DATE = '24 января';


describe('Utils function', () => {
  test('Function: createFilterQuery', () => {
    const filterQuery = createFilterQuery(Filter);
    expect(filterQuery).toEqual(EXPECT_FILTER_QUERY);
  });

  test('Function: createPageQuery', () => {
    const pageQuery = createPageQuery(PAGE);
    expect(pageQuery).toEqual(EXPECT_PAGE_QUERY);
  });
  test('Function: createSortQuery', () => {
    const sortQuery = createSortQuery(Sort);
    expect(sortQuery).toEqual(EXPECT_SORT_QUERY);
  });
  test('Function: createQuery', () => {
    const query = createQuery(PAGE, Filter, Sort);
    expect(query).toEqual(`/?${EXPECT_PAGE_QUERY}&${EXPECT_FILTER_QUERY}&${EXPECT_SORT_QUERY}&${EXPECT_EMBED_QUERY}`);
  });
  test('Function: getSortedProducts', () => {
    const sortedProducts = getSortedProducts(fakeProductsNonSort, KEY);
    expect(sortedProducts).toEqual(fakeProductsSort);
  });
  test('Function: getSortedProducts return []', () => {
    const sortedProducts = getSortedProducts(fakeProductsNonSort, '');
    expect(sortedProducts).toEqual([]);
  });
  test('Function: getCommentsSortByDate', () => {
    const sortedComments = getCommentsSortByDate(fakeCommentNonSort);
    expect(sortedComments).toEqual(fakeCommentSort);
  });
  test('Function: getFormatDate', () => {
    const formatDate = getFormatDate(DATE);
    expect(formatDate).toEqual(FORMAT_DATE);
  });
});
