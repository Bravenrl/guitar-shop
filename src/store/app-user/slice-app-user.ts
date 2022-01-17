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
  },
});

export const { setSort, setFilter, setSearchKey, resetSort, resetFilter, resetSearchKey } = appUserSlice.actions;

export default appUserSlice.reducer;
