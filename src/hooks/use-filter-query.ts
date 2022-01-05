import { FilterState } from '../types/state';
import queryString from 'query-string';
import { getFilter } from '../store/app-user/selectors-app-user';
import { useSelector } from 'react-redux';

function useFilterQuery(): (filter?: FilterState) => string {
  const filter = useSelector(getFilter);

  const setFilterQuery =  (actualFilter?: FilterState) => {
    const {productTypes, stringCounts, priceMax, priceMin} = actualFilter ?? filter;

    const filterQuery = queryString.stringify(
      {
        'type': productTypes,
        'stringCount': stringCounts,
        'price_gte': priceMin,
        'price_lte': priceMax,
      },
      { skipEmptyString: true, skipNull: true },
    );

    return filterQuery;
  };

  return setFilterQuery;
}

export default useFilterQuery;
