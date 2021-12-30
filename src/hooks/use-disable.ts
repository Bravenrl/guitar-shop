import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ProductProperty } from '../const';
import {
  getProductTypes,
  getStringCounts
} from '../store/app-user/selectors-app-user';
import { setStringCounts } from '../store/app-user/slice-app-user';

function useDisable(): (stringCount: string) => boolean {
  const productTypes = useSelector(getProductTypes);
  const stringCounts = useSelector(getStringCounts);
  const dispatch = useDispatch();
  const checkIsDisable = useCallback(
    (stringCount: string) => {
      if (productTypes.length === 0) {
        return false;
      }
      const isDisable = !productTypes
        .reduce((acc: string[], item: string) => {
          const arr = ProductProperty.get(item) || [];
          return [...acc, ...arr];
        }, [])
        .includes(stringCount);

      if (isDisable && stringCounts.includes(stringCount)) {
        dispatch(
          setStringCounts(stringCounts.filter((value) => value !== stringCount)));
      }
      return isDisable;
    },
    [dispatch, productTypes, stringCounts]);

  return checkIsDisable;
}

export default useDisable;
