import { OrderKey, ProductType, SortKey } from './const';
import { CreateFakeProduct } from './mock/fakeData';
import { FilterState, SortState } from './types/state';
import { createFilterQuery, createPageQuery, createQuery, createSortQuery, getSortedProducts } from './utils';

const EXPECT_FILTER_QUERY = 'price_gte=10&price_lte=20&stringCount=6&stringCount=7&type=acoustic&type=electric';
const EXPECT_PAGE_QUERY = '_end=9&_start=0';
const EXPECT_SORT_QUERY = '_order=asc&_sort=price';
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

const fakeProduct = CreateFakeProduct();
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
    expect(query).toEqual(`/?${EXPECT_PAGE_QUERY}&${EXPECT_FILTER_QUERY}&${EXPECT_SORT_QUERY}`);
  });
  test('Function: getSortedProducts', () => {
    const sortedProducts = getSortedProducts(fakeProductsNonSort, KEY);
    expect(sortedProducts).toEqual(fakeProductsSort);
  });
});
