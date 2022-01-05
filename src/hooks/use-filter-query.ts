import { useCallback } from 'react';
import { FilterState } from '../types/state';
import useSortQuery from './use-sort-query';
import queryString from 'query-string';

function useFilterQuery(): (filter: FilterState) => string {
  const sortQuery = useSortQuery();

  const setFilterQuery = useCallback(
    (filter: FilterState) => {
      const {productTypes, stringCounts, priceMax, priceMin} = filter;

      const query = queryString.stringify(
        {
          'type': productTypes,
          'stringCount': stringCounts,
          'price_gte': priceMin,
          'price_lte': priceMax,
        },
        { skipEmptyString: true, skipNull: true },
      );

      return [sortQuery, query].join('&');
    },
    [sortQuery]);

  return setFilterQuery;
}

export default useFilterQuery;
