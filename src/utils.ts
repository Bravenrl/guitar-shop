import dayjs from 'dayjs';
import queryString from 'query-string';
import { PRODUCT_PAGE_LIMIT } from './const';
import { Comment, Guitar } from './types/data';
import { FilterState, SortState } from './types/state';
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
  return `/?${fullQuery}`;
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
