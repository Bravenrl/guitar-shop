import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppUser } from '../../types/state';
import { Slice } from '../const';

const initialState: AppUser = {
  sortKey: '',
  orderKey: '',
  productTypes: [],
  stringCounts: [],
  priceMin: null,
  priceMax: null,
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
    setProductTypes: (state, action: PayloadAction<string[]>) => {
      state.productTypes = action.payload;
    },
    setStringCounts: (state, action: PayloadAction<string[]>) => {
      state.stringCounts = action.payload;
    },
    setPriceMin: (state, action: PayloadAction<string|null>) => {
      state.priceMin = action.payload;
    },
    setPriceMax: (state, action: PayloadAction<string|null>) => {
      state.priceMax = action.payload;
    },
  },
});

export const {
  setSortKey,
  setOrderKey,
  setPriceMin,
  setPriceMax,
  setProductTypes,
  setStringCounts,
} = appUserSlice.actions;

export default appUserSlice.reducer;
