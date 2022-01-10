import { configureStore } from '@reduxjs/toolkit';
import { api } from '../services/api';
import { redirect } from './middlewares/redirect';
import { RootReducer } from './root-reducer';

export const store = configureStore({
  reducer: RootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: { extraArgument: api } }).concat(redirect),
});


