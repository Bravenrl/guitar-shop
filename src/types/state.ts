import { Action, ThunkAction } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { RootState } from '../store/root-reducer';
import { Comment, Guitar } from './data';


export type State = RootState;

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Action>;

export type AppData = {
  productsSearch: Guitar[];
  productsShow: Guitar[];
  priceStart: number,
  priceEnd: number,
  productsCount: number|null,
  isLoading: boolean,
  currentProduct: Guitar,
  currentComments: Comment[],
};

export type AppUser = {
  sort: SortState,
  filter: FilterState,
  searchKey: string,
};

export type AppProcess = {
  isReviewOpen: boolean,
  isSuccessOpen: boolean,
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

