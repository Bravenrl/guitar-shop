import { Action, ThunkAction } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { RootState } from '../store/root-reducer';
import { Guitar } from './data';


export type State = RootState;

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Action>;

export type AppData = {
  productsSearch: Guitar[];
  productsShow: Guitar[];
  priceStart: number,
  priceEnd: number,
  productsCount: number|null,
};

export type AppUser = {
  sortKey: string,
  orderKey: string;
  productTypes: string[];
  stringCounts: string[];
  priceMin: string|null;
  priceMax: string|null;
}


