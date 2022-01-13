import { renderHook, act } from '@testing-library/react-hooks';
import { ProductType } from '../../const';

import { MockUSER } from '../../mock/mockStore';
import useDisable from './use-disable';

const CURRENT_TYPES = [ProductType.Electric, ProductType.Ukulele];
const ENABLE_STRING = '4';
const DISABLE_STRING = '12';
const filter = MockUSER.filter;

describe('useDisable', () => {
  it('should return true if DISABLE_STRING', () => {
    const currFilter = { ...filter, productTypes: CURRENT_TYPES };
    const { result } = renderHook(() => useDisable(currFilter));
    let counts;
    act(() => {
      counts = result.current(DISABLE_STRING);
    });
    expect(counts).toBeTruthy();
  });

  it('should return false if ENABLE_STRING', () => {
    const currFilter = { ...filter, productTypes: CURRENT_TYPES };
    const { result } = renderHook(() => useDisable(currFilter));
    let counts;
    act(() => {
      counts = result.current(ENABLE_STRING);
    });
    expect(counts).toBeFalsy();
  });
});
