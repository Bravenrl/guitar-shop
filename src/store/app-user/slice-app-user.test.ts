import { OrderKey, ProductType, SortKey } from '../../const';
import { AppUser } from '../../types/state';
import appUser, {
  setSort,
  resetSort,
  setFilter,
  resetFilter,
  resetSearchKey,
  setSearchKey,
  addToCart,
  deleteFromCart,
  clearCart,
  setQuantityCart,
  setTotalPrice
} from './slice-app-user';

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
  searchKey: '',
  inCart: {},
  totalPrice: {},
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
const FAKE_KEY = 'key';
const FAKE_PRICE = 10;
const FAKE_QUANTITY = 10;
describe('Reducer: appUser', () => {
  let state = initialState;
  it('without additional parameters should return initial state', () => {
    expect(appUser(void 0, { type: 'UNKNOWN_ACTION' })).toEqual(state);
  });
  it('should update sort by setSort', () => {
    expect(appUser(state, setSort(FAKE_SORT))).toEqual({
      ...state,
      sort: FAKE_SORT,
    });
  });
  it('should clear sort by resetSort', () => {
    state = { ...state, sort: FAKE_SORT };
    expect(appUser(state, resetSort())).toEqual(initialState);
  });
  it('should update filter by setFilter', () => {
    expect(appUser(state, setFilter(FAKE_FILTER))).toEqual({
      ...state,
      filter: FAKE_FILTER,
    });
  });
  it('should clear filter by resetFilter', () => {
    state = { ...initialState, filter: FAKE_FILTER };
    expect(appUser(state, resetFilter())).toEqual(initialState);
  });
  it('should clear searchKey by resetSearchKey', () => {
    state = { ...initialState, searchKey: FAKE_KEY };
    expect(appUser(state, resetSearchKey())).toEqual(initialState);
  });
  it('should update searchKey by setSearchKey', () => {
    state = { ...initialState, searchKey: FAKE_KEY };
    expect(appUser(state, setSearchKey(FAKE_KEY))).toEqual({
      ...initialState,
      searchKey: FAKE_KEY,
    });
  });

  it('should update inCart by addToCart', () => {
    state = { ...initialState, inCart: { '1': 1 } };
    expect(appUser(state, addToCart(1))).toEqual({
      ...initialState,
      inCart: { '1': 2 },
    });
  });
  it('should add new key inCart by addToCart', () => {
    state = { ...initialState, inCart: { '1': 1 } };
    expect(appUser(state, addToCart(2))).toEqual({
      ...initialState,
      inCart: {
        '1': 1,
        '2': 1,
      },
    });
  });

  it('should delete inCart by deleteFromCart', () => {
    state = {
      ...initialState,
      inCart: {
        '1': 2,
        '2': 1,
      },
      totalPrice: {
        '1': FAKE_PRICE,
      },
    };
    expect(appUser(state, deleteFromCart(1))).toEqual({
      ...initialState,
      inCart: {
        '2': 1,
      },
    });
  });
  it('should clear InCart by clearCart', () => {
    state = {
      ...state,
      inCart: {
        '1': 2,
        '2': 1,
      },
      totalPrice: {
        '1': FAKE_PRICE,
        '2': FAKE_PRICE,
      },
    };
    expect(appUser(state, clearCart())).toEqual(initialState);
  });
  it('should update inCart by setQuantityCart', () => {
    state = { ...initialState, inCart: { '1': 1 } };
    expect(
      appUser(state, setQuantityCart({ id: 1, quantity: FAKE_QUANTITY })),
    ).toEqual({
      ...initialState,
      inCart: { '1': FAKE_QUANTITY },
    });
  });
  it('should update totalPrice by setTotalPrice', () => {
    state = { ...initialState, totalPrice: {} };
    expect(appUser(state, setTotalPrice({ id: 1, price: FAKE_PRICE }))).toEqual(
      {
        ...initialState,
        totalPrice: { '1': FAKE_PRICE },
      },
    );
  });
});
