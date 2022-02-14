import dayjs from 'dayjs';
import queryString from 'query-string';
import { PRODUCT_PAGE_LIMIT } from './const';
import { Comment, Guitar } from './types/data';
import { FilterState, InCart, SortState } from './types/state';
import 'dayjs/locale/ru';

export const createFilterQuery = (filter: FilterState) : string =>  {
  const {productTypes, stringCounts, priceMax, priceMin} = filter;
  return queryString.stringify(
    {
      type: productTypes,
      stringCount: stringCounts,
      'price_gte': priceMin,
      'price_lte': priceMax,
    },
    { skipEmptyString: true, skipNull: true },
  );
};

export const createSortQuery =  (sort: SortState) => {
  const {sortKey, orderKey} = sort;
  return queryString.stringify(
    {
      _sort: sortKey,
      _order: orderKey,
    },
    { skipEmptyString: true, skipNull: true },
  );
};

export const createPageQuery = (page: number | undefined): string => {
  const productEnd = page ? + page * PRODUCT_PAGE_LIMIT : PRODUCT_PAGE_LIMIT;
  const productStart = productEnd - PRODUCT_PAGE_LIMIT;
  return queryString.stringify(
    {
      _start: productStart,
      _end: productEnd,
    },
    { skipEmptyString: true, skipNull: true },
  );
};

export const createQuery = (page: number | undefined, filter: FilterState, sort: SortState):string => {
  const pageQuery = createPageQuery(page);
  const filterQuery = createFilterQuery(filter);
  const sortQuery = createSortQuery(sort);

  const fullQuery = [pageQuery, filterQuery, sortQuery].filter((query) => query !== '').join('&');
  return `/?${fullQuery}&_embed=comments`;
};

export const getSortedProducts = (products: Guitar[], key: string): Guitar[] => {
  if (key === '') {
    return [];
  }
  const searchKey = key.toLowerCase();
  return [...products].sort((a,b)=>a.name.toLowerCase().indexOf(searchKey)-b.name.toLowerCase().indexOf(searchKey));
};

export const getCommentsSortByDate = (comments: Comment[]): Comment[] =>
  [...comments].sort((objA, objB) => Date.parse(objB.createAt) - Date.parse(objA.createAt));

export const getFormatDate = (date: string): string => dayjs(date).locale('ru').format('D MMMM');

export const isEscEvent = (evt: KeyboardEvent): boolean =>
  evt.key === 'Escape' || evt.key === 'Esc';

export const getSumValues = (object: InCart): number => {
  const values = Object.values(object);
  return values.length !==0
    ? values.reduce((sum, item) => sum = sum+item)
    : 0;
};

export const getAllIds = (object: InCart): number[] =>
  Object.entries(object)
    .reduce((allIds: number[], [key, value]) => {
      const currentIds = new Array(value).fill(Number(key));
      return [...allIds, ...currentIds];
    }, [] as number[]);

