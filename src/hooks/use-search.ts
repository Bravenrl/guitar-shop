import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { getProductsInit } from '../store/app-data/selectors-app-data';
import { Guitar } from '../types/data';

function useSearch(searchKey: string): Guitar[] | null {
  const productsInit = useSelector(getProductsInit);
  const getFiltredProducts = useMemo(
    () =>
      searchKey
        ? productsInit.filter((product) => product.name.toLowerCase().includes(searchKey.toLowerCase()))
        : null,
    [productsInit, searchKey]);
  return getFiltredProducts;
}

export default useSearch;
