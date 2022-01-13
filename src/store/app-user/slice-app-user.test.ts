
import { OrderKey, ProductType, SortKey } from '../../const';
import { AppUser } from '../../types/state';
import appUser, { setSort, resetSort, setFilter, resetFilter} from './slice-app-user';

const initialState: AppUser = {
  sort: {
    sortKey: '',
    orderKey: '',
  },
  filter: {
    productTypes: [],
    stringCounts: [],
    priceMin: '',
    priceMax: '',
  },
};

const FAKE_SORT = {
  sortKey: SortKey.Price,
  orderKey: OrderKey.Asc,
};
const FAKE_FILTER = {
  productTypes: [ProductType.Acoustic, ProductType.Electric],
  stringCounts: ['4', '12'],
  priceMin: '1',
  priceMax: '10',
};


describe('Reducer: appUser', () => {
  let state = initialState;
  it('without additional parameters should return initial state', () => {
    expect(appUser(void 0, { type: 'UNKNOWN_ACTION' }))
      .toEqual(state);
  });
  it('should update sort by setSort', () => {
    expect(appUser(state, setSort(FAKE_SORT)))
      .toEqual({ ...state, sort: FAKE_SORT });
  });
  it('should clear sort by resetSort', () => {
    state = {...state, sort: FAKE_SORT };
    expect(appUser(state, resetSort()))
      .toEqual(initialState);
  });
  it('should update filter by setFilter', () => {
    expect(appUser(state, setFilter(FAKE_FILTER)))
      .toEqual({ ...state, filter: FAKE_FILTER });
  });
  it('should clear filter by resetFilter', () => {
    state = {...initialState, filter: FAKE_FILTER };
    expect(appUser(state, resetFilter()))
      .toEqual(initialState);
  });
});
