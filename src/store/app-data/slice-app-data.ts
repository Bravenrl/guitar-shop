import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Slice } from '../const';
import { Guitar, Product } from '../../types/data';
import { AppData } from '../../types/state';

const initialState: AppData = {
  productsSearch: [],
  productsShow: [],
  priceEnd: 0,
  priceStart: 0,
  productsCount: null,
  isLoading: true,
  currentProduct: {} as Product,
};

const appDataSlice = createSlice({
  name: Slice.AppData,
  initialState,
  reducers: {
    addProductsSearch: (state, action: PayloadAction<Guitar[]>) => {
      state.productsSearch = action.payload;
    },
    clearProductsSearch: (state) => {
      state.productsSearch = initialState.productsSearch;
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
    clearProductsCount: (state) => {
      state.productsCount = initialState.productsCount;
    },
    toggleIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    addCurrentProduct: (state, action: PayloadAction<Product>) => {
      state.currentProduct = action.payload;
    },
    clearCurrentProduct: (state) => {
      state.currentProduct = initialState.currentProduct;
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
  toggleIsLoading,
  clearProductsCount,
  addCurrentProduct,
  clearCurrentProduct,
} = appDataSlice.actions;

export default appDataSlice.reducer;
