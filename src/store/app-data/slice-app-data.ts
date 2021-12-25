import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Slice } from '../const';
import { Guitar } from '../../types/data';
import { AppData } from '../../types/state';

const initialState: AppData = {
  allGuitars: [],
};

const appDataSlice = createSlice({
  name: Slice.AppData,
  initialState,
  reducers: {
    addAllGuitars: (state, action: PayloadAction<Guitar[]>) => {
      state.allGuitars = action.payload;
    },
  },
});

export const { addAllGuitars } = appDataSlice.actions;

export default appDataSlice.reducer;
