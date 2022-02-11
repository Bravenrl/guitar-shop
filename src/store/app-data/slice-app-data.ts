import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Slice } from '../const';
import { Comment, Guitar, Product } from '../../types/data';
import { AppData } from '../../types/state';
import { INIT_COMMENTS_COUNT } from '../../const';

const initialState: AppData = {
  productsSearch: [],
  productsShow: [],
  priceEnd: 0,
  priceStart: 0,
  productsCount: null,
  isLoading: true,
  currentProduct: {} as Guitar,
  currentComments: [],
  commentsCounter: INIT_COMMENTS_COUNT,
  tempItemCart: {} as Guitar,
  productsInCart: [],
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
    addProductsShow: (state, action: PayloadAction<Product[]>) => {
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
    addCurrentProduct: (state, action: PayloadAction<Guitar>) => {
      state.currentProduct = action.payload;
    },
    clearCurrentProduct: (state) => {
      state.currentProduct = initialState.currentProduct;
    },
    addCurrentComments: (state, action: PayloadAction<Comment[]>) => {
      state.currentComments = action.payload;
    },
    addNewComment: (state, action: PayloadAction<Comment>) => {
      state.currentComments = [action.payload, ...state.currentComments];
    },
    clearCurrentComments: (state) => {
      state.currentComments = initialState.currentComments;
    },
    incrementCommentsCounter: (state) => {
      if (state.commentsCounter > state.currentComments.length) {
        return;
      }
      state.commentsCounter = state.commentsCounter + INIT_COMMENTS_COUNT;
    },
    resetCommentsCounter: (state) => {
      state.commentsCounter = initialState.commentsCounter;
    },
    addTempItemCart: (state, action: PayloadAction<Guitar>) => {
      state.tempItemCart = action.payload;
    },
    resetTempItemCart: (state) => {
      state.tempItemCart = initialState.tempItemCart;
    },
    addProductsInCart: (state, action: PayloadAction<Guitar[]>) => {
      state.productsInCart = action.payload;
    },
    clearCart: (state) => {
      state.productsInCart = initialState.productsInCart;
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
  addCurrentComments,
  clearCurrentComments,
  addNewComment,
  incrementCommentsCounter,
  resetCommentsCounter,
  addTempItemCart,
  resetTempItemCart,
  addProductsInCart,
  clearCart,
} = appDataSlice.actions;

export default appDataSlice.reducer;
