import { combineReducers } from '@reduxjs/toolkit';
import { Reducer } from './const';
import appDataReducer from './app-data/slice-app-data';

export const RootReducer = combineReducers({
  [Reducer.Data]: appDataReducer,
});

export type RootState = ReturnType<typeof RootReducer>;
