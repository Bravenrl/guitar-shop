import { useCallback } from 'react';
import { ProductProperty } from '../../const';
import { FilterState } from '../../types/state';

function useUncheck(filter: FilterState): (productTypes: string[]) => string[] {
  const {stringCounts} = filter;

  const setUnchecked = useCallback(
    (productTypes: string[]) => {
      if ((stringCounts.length === 0)||(productTypes.length === 0)) {
        return stringCounts;
      }
      const allCounts = productTypes
        .reduce((acc: string[], item: string) => {
          const counts = ProductProperty.get(item) || [];
          return [...acc, ...counts];
        }, []);

      const actualCounts = stringCounts.filter((count) => allCounts.includes(count));

      return actualCounts;
    },
    [stringCounts]);

  return setUnchecked;
}

export default useUncheck;
