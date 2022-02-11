import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppUser, FilterState, SortState } from '../../types/state';
import { Slice } from '../const';

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
};

const appUserSlice = createSlice({
  name: Slice.AppUser,
  initialState,
  reducers: {
    setSort: (state, action: PayloadAction<SortState>) => {
      state.sort = action.payload;
    },
    setFilter: (state, action: PayloadAction<FilterState>) => {
      state.filter = action.payload;
    },
    resetFilter: (state) => {
      state.filter = initialState.filter;
    },
    resetSort: (state) => {
      state.sort = initialState.sort;
    },
    setSearchKey: (state, action: PayloadAction<string>) => {
      state.searchKey = action.payload;
    },
    resetSearchKey: (state) => {
      state.searchKey = initialState.searchKey;
    },
    addToCart: (state, action: PayloadAction<number>) => {
      state.inCart[action.payload]
        ? (state.inCart[action.payload] = state.inCart[action.payload] + 1)
        : (state.inCart[action.payload] = 1);
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.inCart[action.payload] = state.inCart[action.payload] - 1;
      if (state.inCart[action.payload] < 1) {
        delete state.inCart[action.payload];
      }
    },
  },
});

export const {
  setSort,
  setFilter,
  setSearchKey,
  resetSort,
  resetFilter,
  resetSearchKey,
  addToCart,
  removeFromCart,
} = appUserSlice.actions;

export default appUserSlice.reducer;
