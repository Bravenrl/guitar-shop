import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppProcess } from '../../types/state';
import { Slice } from '../const';

const initialState: AppProcess = {
  isReviewOpen: false,
  isSuccessOpen: false,
  isCartAddOpen: false,
  isCartDeleteOpen: false,
  isCartSuccessOpen: false,
};

const appProcessSlice = createSlice({
  name: Slice.AppProcess,
  initialState,
  reducers: {
    toggleIsReviewOpen: (state, action: PayloadAction<boolean>) => {
      state.isReviewOpen = action.payload;
    },
    toggleIsSuccessOpen: (state, action: PayloadAction<boolean>) => {
      state.isSuccessOpen = action.payload;
    },
    toggleIsCartAddOpen: (state, action: PayloadAction<boolean>) => {
      state.isCartAddOpen = action.payload;
    },
    toggleIsCartDeleteOpen: (state, action: PayloadAction<boolean>) => {
      state.isCartDeleteOpen = action.payload;
    },
    toggleIsCartSuccessOpen: (state, action: PayloadAction<boolean>) => {
      state.isCartSuccessOpen = action.payload;
    },
    closeAllModals: () => initialState,
  },
});

export const {
  toggleIsReviewOpen,
  toggleIsSuccessOpen,
  toggleIsCartAddOpen,
  toggleIsCartDeleteOpen,
  toggleIsCartSuccessOpen,
  closeAllModals,
} = appProcessSlice.actions;

export default appProcessSlice.reducer;
