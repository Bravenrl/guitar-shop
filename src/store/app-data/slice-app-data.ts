import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Slice } from '../const';
import { Guitar } from '../../types/data';
import { AppData } from '../../types/state';

const initialState: AppData = {
  productsInit: [],
  productsShow: [],
};

const appDataSlice = createSlice({
  name: Slice.AppData,
  initialState,
  reducers: {
    addProductsInit: (state, action: PayloadAction<Guitar[]>) => {
      state.productsInit = action.payload;
    },
    addProductsShow: (state, action: PayloadAction<Guitar[]>) => {
      state.productsShow = action.payload;
    },
  },
});

export const { addProductsInit, addProductsShow } = appDataSlice.actions;

export default appDataSlice.reducer;
