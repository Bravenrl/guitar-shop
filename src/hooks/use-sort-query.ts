import { useSelector } from 'react-redux';
import { getSort } from '../store/app-user/selectors-app-user';
import { SortState } from '../types/state';
import queryString from 'query-string';

function useSortQuery(): (sort: SortState) => string {
  const sort = useSelector(getSort);

  const setSortQuery =  (actualSort?: SortState) => {
    const {sortKey, orderKey} = actualSort ?? sort;
    const sortQuery = queryString.stringify(
      {
        _sort: sortKey,
        _order: orderKey,
      },
      { skipEmptyString: true, skipNull: true },
    );
    return sortQuery;
  };
  return setSortQuery;
}

export default useSortQuery;
