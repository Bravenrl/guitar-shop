import queryString from 'query-string';
import { PRODUCT_LIMIT } from './const';
import { FilterState, SortState } from './types/state';

export const setFilterQuery = (filter: FilterState) : string =>  {
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

export const setSortQuery =  (sort: SortState) => {
  const {sortKey, orderKey} = sort;
  return queryString.stringify(
    {
      _sort: sortKey,
      _order: orderKey,
    },
    { skipEmptyString: true, skipNull: true },
  );
};

export const setPageQuery = (page: number | undefined): string => {
  const productEnd = page ? + page * PRODUCT_LIMIT : PRODUCT_LIMIT;
  const productStart = productEnd - PRODUCT_LIMIT;
  return queryString.stringify(
    {
      _start: productStart,
      _end: productEnd,
    },
    { skipEmptyString: true, skipNull: true },
  );
};
