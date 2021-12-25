import { configureStore } from '@reduxjs/toolkit';
import { api } from '../services/api';
import { RootReducer } from './root-reducer';

export const store = configureStore({
  reducer: RootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: { extraArgument: api } }),
});


