import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { getAllGuitars } from '../store/app-data/selectors-app-data';
import { Guitar } from '../types/data';

function useSearch(searchKey: string): Guitar[] | null {
  const allGuitars = useSelector(getAllGuitars);
  const filtredGuitars = useMemo(
    () =>
      searchKey
        ? allGuitars.filter((guitar) => guitar.name.toLowerCase().includes(searchKey.toLowerCase()))
        : null,
    [allGuitars, searchKey]);
  return filtredGuitars;
}

export default useSearch;
