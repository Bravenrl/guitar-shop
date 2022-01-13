import { renderHook } from '@testing-library/react-hooks';
import usePages from './use-pages';

const CURRENT_PAGE_3 = 3;
const CURRENT_PAGE_7 = 7;

const EXPECTED_PAGES_3 = [1, 2, 3];
const EXPECTED_PAGES_7 = [7, 8, 9];


describe('useDisable', () => {
  it('should return EXPECTED_PAGES_3 if CURRENT_PAGE_3', () => {
    const { result } = renderHook(() => usePages(CURRENT_PAGE_3));
    expect(result.current).toEqual(EXPECTED_PAGES_3);
  });

  it('should return EXPECTED_PAGES_7 if CURRENT_PAGE_7', () => {
    const { result } = renderHook(() => usePages(CURRENT_PAGE_7));
    expect(result.current).toEqual(EXPECTED_PAGES_7);
  });
});
