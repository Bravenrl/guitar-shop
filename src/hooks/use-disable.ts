import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ProductProperty } from '../const';
import { Params } from '../types/params';

function useDisable(params: Params): (stringCount: string) => boolean {
  const [, setSearchParams] = useSearchParams();

  const checkIsDisable = useCallback(
    (stringCount: string) => {
      if (params.type.length === 0) {
        return false;
      }
      const isDisable = !!params.type.find(
        (item) => !ProductProperty.get(item)?.includes(stringCount),
      );
      if (params.stringCount.includes(stringCount) && isDisable) {
        setSearchParams({
          ...params,
          stringCount: params.stringCount.filter(
            (value) => value !== stringCount,
          ),
        });
      }
      return isDisable;
    },
    [params, setSearchParams],
  );

  return checkIsDisable;
}

export default useDisable;
