import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CouponInit } from '../../const';
import { AppUser, Coupon, FilterState, SortState } from '../../types/state';
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
  totalPrice: {},
  coupon: CouponInit,
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
    setQuantityCart: (state, action: PayloadAction<{id:number, quantity: number}>) => {
      state.inCart[action.payload.id] = action.payload.quantity;
    },
    deleteFromCart: (state, action: PayloadAction<number>) => {
      delete state.inCart[action.payload];
      delete state.totalPrice[action.payload];
    },
    clearCart: (state) => {
      state.inCart = initialState.inCart;
      state.totalPrice = initialState.totalPrice;
    },
    setTotalPrice: (state, action: PayloadAction<{id:number, price: number}>) => {
      state.totalPrice[action.payload.id] = action.payload.price;
    },
    addCoupon: (state, action: PayloadAction<Coupon>) => {
      state.coupon = action.payload;
    },
    clearCoupon: (state) => {
      state.coupon = initialState.coupon;
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
  setQuantityCart,
  deleteFromCart,
  clearCart,
  setTotalPrice,
  addCoupon,
  clearCoupon,
} = appUserSlice.actions;

export default appUserSlice.reducer;
