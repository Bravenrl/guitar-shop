import { renderHook, act} from '@testing-library/react-hooks';
import { useToggle } from './use-toggle';

const INIT_VALUE = false;
const EXPECT_VALUE = true;
test('should return EXPECT_VALUE', () => {
  const { result } = renderHook(
    () => useToggle(INIT_VALUE));
  const [value, toggleValue] = result.current;
  expect(value).toEqual(INIT_VALUE);
  act(() => {
    toggleValue();
  });
  expect(result.current[0]).toEqual(EXPECT_VALUE);
});
