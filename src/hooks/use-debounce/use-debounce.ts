import { useCallback, useRef } from 'react';
import { CallbackType } from '../../types/callback';
import { ThunkActionResult } from '../../types/state';


function useDebounce(callback: CallbackType, delay: number, searchKey?: string) {

  const timeout = useRef<NodeJS.Timeout | null>(null);

  const debouncedCallback = useCallback((thunkAction:ThunkActionResult<Promise<void>>) => {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
    if (searchKey==='') {
      return;
    }

    timeout.current = setTimeout(() => {
      callback(thunkAction);
    }, delay);
  }, [callback, delay, searchKey]);
  return debouncedCallback;
}

export default useDebounce;
