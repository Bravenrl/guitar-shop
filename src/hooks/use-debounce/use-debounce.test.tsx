import { renderHook } from '@testing-library/react-hooks';
import { DELAY } from '../../const';
import { CallbackType } from '../../types/callback';
import useDebounce from './use-debounce';

describe('useDebounce', () => {
  it('should dispatch thunkAction', async () => {
    const dispatch = jest.fn() as CallbackType;
    const thunkAction = jest.fn();
    const { result, waitFor } = renderHook(() =>
      useDebounce(dispatch, DELAY));

    await waitFor(() => result.current(thunkAction()), { timeout: DELAY });
    expect(thunkAction).toHaveBeenCalledTimes(1);
  });
});
