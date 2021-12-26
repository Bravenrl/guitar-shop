import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppUser } from '../../types/state';
import { Slice } from '../const';

const initialState: AppUser = {
  sort: '',
  order: '',
  type: '',
  priceStart: null,
  priceEnd: null,
};

const appUserSlice = createSlice({
  name: Slice.AppUser,
  initialState,
  reducers: {
    setSorting: (state, action: PayloadAction<string>) => {
      state.sort = action.payload;
    },
    setOrder: (state, action: PayloadAction<string>) => {
      state.order = action.payload;
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

export const { setSorting, setOrder, setType, setPriceEnd, setPriceStart } =
  appUserSlice.actions;

export default appUserSlice.reducer;
