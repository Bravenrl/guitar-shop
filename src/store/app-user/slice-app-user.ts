import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppUser } from '../../types/state';
import { Slice } from '../const';

const initialState: AppUser = {
  sortKey: '',
  orderKey: '',
  type: '',
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
  },
});

export const { setSortKey, setOrderKey, setType } =
  appUserSlice.actions;

export default appUserSlice.reducer;
