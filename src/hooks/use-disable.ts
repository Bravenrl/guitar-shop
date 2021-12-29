import { useCallback } from 'react';
import { ProductProperty } from '../const';
import { Params } from '../types/params';

function useDisable(params: Params): (stringCount: string) => boolean {

  const checkIsDisable = useCallback(
    (stringCount: string) => {
      if (params.type.length === 0) {
        return false;
      }
      const isDisable = !params.type
        .reduce((acc: string[], item: string) => {
          const arr = ProductProperty.get(item) || [];
          return [...acc, ...arr];
        }, [])
        .includes(stringCount);
      return isDisable;
    },
    [params.type],
  );

  return checkIsDisable;
}

export default useDisable;
