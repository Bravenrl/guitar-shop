import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { PRODUCT_LIMIT } from '../const';
import { getOrderKey, getSortKey } from '../store/app-user/selectors-app-user';

function useQuery(query: string): string {
  // eslint-disable-next-line no-console
  console.log(query);
  const { number } = useParams();
  const sortKey = useSelector(getSortKey);
  const orderKey = useSelector(getOrderKey);
  const productEnd = number ? +number * PRODUCT_LIMIT : PRODUCT_LIMIT;
  const productStart = productEnd - PRODUCT_LIMIT;
  const generateQuery = useMemo(() => {
    const startQuery = `_start=${productStart}&_end=${productEnd}`;
    const sortQuery = sortKey !== '' ? `_sort=${sortKey}` : null;
    const orderQuery = orderKey !== '' ? `_order=${orderKey}` : null;
    return `/?${[startQuery, sortQuery, orderQuery].filter((value) => !!value).join('&')}`;
  }, [productStart, productEnd, sortKey, orderKey]);
  return generateQuery;
}

export default useQuery;

