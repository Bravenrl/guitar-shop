import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { ProductProperty } from '../const';
import { getFilter } from '../store/app-user/selectors-app-user';

function useDisable(): (stringCount: string) => boolean {
  const {productTypes} = useSelector(getFilter);

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
