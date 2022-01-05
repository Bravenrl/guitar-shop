import { useEffect } from 'react';
import {  useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import queryString from 'query-string';
import { getFilter } from '../store/app-user/selectors-app-user';
import { setFilter } from '../store/app-user/slice-app-user';

function useQueryParams(): URLSearchParams {
  const { productTypes, stringCounts, priceMax, priceMin } =
    useSelector(getFilter);
  const dispatch = useDispatch();

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (productTypes.length !==0 || stringCounts.length !==0 || priceMax !== '' || priceMin !=='') {
      return;
    }
    const typesSearch = searchParams.getAll('type');
    const strigCountsSearch = searchParams.getAll('stringCount');
    const priceMinSearch = searchParams.get('price_gte');
    const priceMaxSearch = searchParams.get('price_lte');
    if (
      typesSearch.length !== 0 ||
      strigCountsSearch.length !== 0 ||
      priceMinSearch !== null||
      priceMaxSearch !== null
    ) {
      dispatch(
        setFilter({
          productTypes: typesSearch,
          stringCounts: strigCountsSearch,
          priceMin: priceMinSearch ?? '',
          priceMax: priceMaxSearch ?? '',
        }));
    }
  }, [dispatch, priceMax, priceMin, productTypes.length, searchParams, stringCounts.length]);



  return searchParams;
}

export default useQueryParams;
