import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { DELAY } from '../const';
import {
  getPriceMax,
  getPriceMin,
  getProductTypes,
  getStringCounts
} from '../store/app-user/selectors-app-user';
import queryString from 'query-string';
import {
  setPriceMax,
  setPriceMin,
  setProductTypes,
  setStringCounts
} from '../store/app-user/slice-app-user';

function useQueryParams(): URLSearchParams {
  const productTypes = useSelector(getProductTypes);
  const stringCounts = useSelector(getStringCounts);
  const priceMin = useSelector(getPriceMin);
  const priceMax = useSelector(getPriceMax);
  const dispatch = useDispatch();

  const [searchParams, setSearchParams] = useSearchParams();
  const timeout = useRef<NodeJS.Timeout | null>(null);
  //   const params = queryString.stringify(
  //   {
  //     'type': [],
  //     'stringCount': stringCounts,
  //     'price_gte': priceMin,
  //     'price_lte': priceMax,
  //   },
  //   { skipEmptyString: true },
  // );


  useEffect(() => {
    const typesSearch = searchParams.getAll('type');
    const strigCountsSearch = searchParams.getAll('stringCount');
    const priceMinSearch = searchParams.get('price_gte');
    const priceMaxSearch = searchParams.get('price_lte');
    if (typesSearch.length !== 0) {dispatch(setProductTypes(typesSearch));}
    if (strigCountsSearch.length !== 0) {dispatch(setStringCounts(strigCountsSearch));}
    if (priceMinSearch) {dispatch(setPriceMin(priceMinSearch));}
    if (priceMaxSearch) {dispatch(setPriceMax(priceMaxSearch));}
  }, [dispatch, searchParams]);

  useEffect(() => {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
    timeout.current = setTimeout(() => {
      const params = queryString.stringify(
        {
          'type': productTypes,
          'stringCount': stringCounts,
          'price_gte': priceMin,
          'price_lte': priceMax,
        },
        { skipEmptyString: true,
          skipNull: true,
        },
      );
      setSearchParams(params);
    }, DELAY);
  }, [priceMax, priceMin, productTypes, setSearchParams, stringCounts]);

  // (() => {
  //   // if(shallowEqual(params)) {
  //   //   return;
  //   // }
  //   if (timeout.current) {
  //     clearTimeout(timeout.current);
  //   }
  //   timeout.current = setTimeout(() => {
  //     setSearchParams(params);
  //   }, DELAY);}, [params, setSearchParams]);
  // (() => {
  //   // if (
  //   //   productTypes.length === 0 &&
  //   //   stringCounts.length === 0 &&
  //   //   priceMin === '' &&
  //   //   priceMax === ''
  //   // ) {
  //   //   const searchTypes = searchParams.getAll('type');
  //   //   const searchStringCounts = searchParams.getAll('stringCount');
  //   //   const searchPriceMin = searchParams.get('price_gte');
  //   //   const searchPriceMax = searchParams.get('price_lte');

  //   //   if (searchTypes.length !== 0) {
  //   //     dispatch(setProductTypes(searchTypes));
  //   //   }
  //   //   if (searchStringCounts.length !== 0) {
  //   //     dispatch(setStringCounts(searchStringCounts));
  //   //   }
  //   //   if (searchPriceMin) {
  //   //     dispatch(setPriceMin(searchPriceMin));
  //   //   }
  //   //   if (searchPriceMax) {
  //   //     dispatch(setPriceMax(searchPriceMax));
  //   //   }
  //   // }


  // }, [params, setSearchParams]);

  return searchParams;
}

export default useQueryParams;
