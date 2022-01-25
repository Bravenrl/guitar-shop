import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppProcess } from '../../types/state';
import { Slice } from '../const';

const initialState: AppProcess = {
  isReviewOpen: false,
  isSuccessOpen: false,
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
    closeAllModals: (state) => {
      state.isReviewOpen = initialState.isReviewOpen;
      state.isSuccessOpen = initialState.isSuccessOpen;
    },
  },
});

export const {
  toggleIsReviewOpen,
  toggleIsSuccessOpen,
  closeAllModals,
} = appProcessSlice.actions;

export default appProcessSlice.reducer;
