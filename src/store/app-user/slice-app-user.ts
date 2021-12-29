import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Params } from '../../types/params';
import { AppUser } from '../../types/state';
import { Slice } from '../const';

const initialState: AppUser = {
  sortKey: '',
  orderKey: '',
  params: {
    types: [],
    stringCounts:[],
    priceMax: '',
    priceMin: '',
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
    setParams: (state, action: PayloadAction<Params>) => {
      state.params = action.payload;
    },
  },
});

export const { setSortKey, setOrderKey, setParams } =
  appUserSlice.actions;

export default appUserSlice.reducer;
