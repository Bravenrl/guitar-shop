import queryString from 'query-string';
import { PRODUCT_PAGE_LIMIT } from './const';
import { FilterState, SortState } from './types/state';

const createFilterQuery = (filter: FilterState) : string =>  {
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

const createSortQuery =  (sort: SortState) => {
  const {sortKey, orderKey} = sort;
  return queryString.stringify(
    {
      _sort: sortKey,
      _order: orderKey,
    },
    { skipEmptyString: true, skipNull: true },
  );
};

const createPageQuery = (page: number | undefined): string => {
  const productEnd = page ? + page * PRODUCT_PAGE_LIMIT : PRODUCT_PAGE_LIMIT;
  const productStart = productEnd - PRODUCT_PAGE_LIMIT;
  return queryString.stringify(
    {
      _end: productEnd,
      _start: productStart,
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
