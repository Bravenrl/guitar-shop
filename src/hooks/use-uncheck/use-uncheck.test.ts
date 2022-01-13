import { renderHook, act} from '@testing-library/react-hooks';
import { ProductType } from '../../const';
import useUncheck from './use-uncheck';

import { MockUSER } from '../../mock/mockStore';


const CURRENT_STRINGS = ['4', '6', '12'];
const EXPECT_STRINGS = ['4', '6'];
const TYPES = [ProductType.Ukulele, ProductType.Electric];
const filter = MockUSER.filter;

test('should return EXPECT_STRINGS', () => {
  const currFilter = {...filter, stringCounts: CURRENT_STRINGS};

  const { result } = renderHook(
    () => useUncheck(currFilter));
  let counts;
  act(() => {
    counts = result.current(TYPES);
  });
  expect(counts).toEqual(EXPECT_STRINGS);
});
