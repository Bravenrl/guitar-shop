import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppUser, FilterState } from '../../types/state';
import { Slice } from '../const';

const initialState: AppUser = {
  sortKey: '',
  orderKey: '',
  filter: {
    productTypes: [],
    stringCounts: [],
    priceMin: '',
    priceMax: '',
  },
};

const appUserSlice = createSlice({
  name: Slice.AppUser,
  initialState,
  reducers: {
    setSortKey: (state, action: PayloadAction<string>) => {
      state.sortKey = action.payload;
    },
    setOrderKey: (state, action: PayloadAction<string>) => {
      state.orderKey = action.payload;
    },
    setFilter: (state, action: PayloadAction<FilterState>) => {
      state.filter = action.payload;
    },
  },
});

export const { setSortKey, setOrderKey, setFilter } = appUserSlice.actions;

export default appUserSlice.reducer;
