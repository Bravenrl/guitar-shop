import { Action, ThunkAction } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { RootState } from '../store/root-reducer';
import { Guitar } from './data';

export type State = RootState;

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Action>;

export type AppData = {
  productsInit: Guitar[];
  productsShow: Guitar[];
};

export type AppUser = {
  sortKey: string,
  orderKey: string;
  type: string,
  priceStart: number|null,
  priceEnd: number|null,
}
