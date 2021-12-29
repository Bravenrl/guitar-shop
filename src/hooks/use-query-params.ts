import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { DELAY } from '../const';
import { getParams } from '../store/app-user/selectors-app-user';

function useQueryParams() {
  const params = useSelector(getParams);
  const [searchParams, setSearchParams] = useSearchParams();
  const timeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
    timeout.current = setTimeout(() => {
      setSearchParams(params);
    }, DELAY);
  }, [params, setSearchParams]);

  const value = searchParams.toString();
  return value;
}

export default useQueryParams;
