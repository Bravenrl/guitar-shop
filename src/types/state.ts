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
  sort: SortState,
  filter: FilterState;
};

export type FilterState = {
  productTypes: string [],
  stringCounts: string [],
  priceMin: string,
  priceMax: string,
}

export type SortState = {
  sortKey: string,
  orderKey: string,
}

