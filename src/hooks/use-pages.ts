import { useMemo } from 'react';
import { PAGE_COUNT } from '../const';

function usePages (page: number): number[] {
  return useMemo(() => {
    let lastPage = 0;
    for (let i = page; i < page + PAGE_COUNT; i++) {
      if (i % PAGE_COUNT === 0) {
        lastPage = i;
        break;
      }
    }
    return Array(PAGE_COUNT).fill(null).map(() => lastPage--).reverse();
  }, [page]);
}

export default usePages;
