import { useCallback, useRef } from 'react';
import { CallbackType } from '../../types/callback';
import { ThunkActionResult } from '../../types/state';


function useDebounce(callback: CallbackType, delay: number) {

  const timeout = useRef<NodeJS.Timeout | null>(null);

  const debouncedCallback = useCallback((thunkAction:ThunkActionResult<Promise<void>>) => {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
    timeout.current = setTimeout(() => {
      callback(thunkAction);
    }, delay);
  }, [callback, delay]);
  return debouncedCallback;
}

export default useDebounce;
