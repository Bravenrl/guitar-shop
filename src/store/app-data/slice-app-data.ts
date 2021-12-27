import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Slice } from '../const';
import { Guitar } from '../../types/data';
import { AppData } from '../../types/state';

const initialState: AppData = {
  productsSearch: [],
  productsShow: [],
  priceEnd: null,
  priceStart: null,
  productsCount: null,
};

const appDataSlice = createSlice({
  name: Slice.AppData,
  initialState,
  reducers: {
    addProductsSearch: (state, action: PayloadAction<Guitar[]>) => {
      state.productsSearch = action.payload;
    },
    clearProductsSearch: (state) => {
      state.productsSearch = [];
    },
    addProductsShow: (state, action: PayloadAction<Guitar[]>) => {
      state.productsShow = action.payload;
    },
    addPriceStart: (state, action: PayloadAction<number>) => {
      state.priceStart = action.payload;
    },
    addPriceEnd: (state, action: PayloadAction<number>) => {
      state.priceEnd = action.payload;
    },
    addProductsCount: (state, action: PayloadAction<number>) => {
      state.productsCount = action.payload;
    },
  },
});

export const {
  addProductsSearch,
  clearProductsSearch,
  addProductsShow,
  addPriceEnd,
  addPriceStart,
  addProductsCount,
} = appDataSlice.actions;

export default appDataSlice.reducer;
