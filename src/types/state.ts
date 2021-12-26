import { Action, ThunkAction } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { RootState } from '../store/root-reducer';
import { store } from '../store/store';
import { Guitar } from './data';

export type State = RootState;

type AppStore = typeof store;

export type AppDispatch = AppStore['dispatch'];

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Action>;

export type AppData = {
  allGuitars: Guitar[];
};

export type AppUser = {
  sort: string,
  order: string;
  type: string,
  priceStart: number|null,
  priceEnd: number|null,
}
