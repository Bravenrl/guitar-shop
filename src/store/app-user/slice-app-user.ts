import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppUser } from '../../types/state';
import { Slice } from '../const';

const initialState: AppUser = {
  sortKey: '',
  orderKey: '',
  type: '',
  priceStart: null,
  priceEnd: null,
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
    setType: (state, action: PayloadAction<string>) => {
      state.type = action.payload;
    },
    setPriceStart: (state, action: PayloadAction<number>) => {
      if (!state.priceStart) {
        state.priceStart = action.payload;
      } else if (state.priceStart > action.payload) {
        state.priceStart = action.payload;
      }
    },
    setPriceEnd: (state, action: PayloadAction<number>) => {
      if (!state.priceEnd) {
        state.priceEnd = action.payload;
      } else if (state.priceEnd < action.payload) {
        state.priceEnd = action.payload;
      }
    },
  },
});

export const { setSortKey, setOrderKey, setType, setPriceEnd, setPriceStart } =
  appUserSlice.actions;

export default appUserSlice.reducer;
