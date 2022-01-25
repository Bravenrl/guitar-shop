import { combineReducers } from '@reduxjs/toolkit';
import { Reducer } from './const';
import appDataReducer from './app-data/slice-app-data';
import appUserReducer from './app-user/slice-app-user';
import appProcessReducer from './app-process/slice-app-process';

export const RootReducer = combineReducers({
  [Reducer.Data]: appDataReducer,
  [Reducer.User]: appUserReducer,
  [Reducer.Process]: appProcessReducer,
});

export type RootState = ReturnType<typeof RootReducer>;
