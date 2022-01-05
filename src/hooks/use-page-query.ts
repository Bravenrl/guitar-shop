import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { PRODUCT_LIMIT } from '../const';
import queryString from 'query-string';

function usePageQuery(): string {
  const { number } = useParams();
  const productEnd = number ? +number * PRODUCT_LIMIT : PRODUCT_LIMIT;
  const productStart = productEnd - PRODUCT_LIMIT;
  const generateQuery = useMemo(() => {
    const query = queryString.stringify(
      {
        _start: productStart,
        _end: productEnd,
      },
      { skipEmptyString: true, skipNull: true },
    );
    return `/?${query}`;
  }, [productStart, productEnd]);
  return generateQuery;
}

export default usePageQuery;

