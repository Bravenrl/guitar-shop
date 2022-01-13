import { useCallback } from 'react';
import { ProductProperty } from '../../const';
import { FilterState } from '../../types/state';


function useDisable(filter: FilterState): (stringCount: string) => boolean {
  const {productTypes} = filter;

  const checkIsDisable = useCallback(
    (stringCount: string) => {
      if (productTypes.length === 0) {
        return false;
      }
      const isDisable = !productTypes
        .reduce((acc: string[], item: string) => {
          const counts = ProductProperty.get(item) || [];
          return [...acc, ...counts];
        }, [])
        .includes(stringCount);

      return isDisable;
    },
    [productTypes]);

  return checkIsDisable;
}

export default useDisable;
