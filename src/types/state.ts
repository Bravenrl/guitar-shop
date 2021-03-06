import { Action, ThunkAction } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { RootState } from '../store/root-reducer';
import { Comment, Guitar, Product } from './data';


export type State = RootState;

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Action>;

export type AppData = {
  productsSearch: Guitar[];
  productsShow: Product[];
  priceStart: number,
  priceEnd: number,
  productsCount: number|null,
  isLoading: boolean,
  currentProduct: Guitar,
  currentComments: Comment[],
  commentsCounter: number,
  tempItemCart: Guitar;
  productsInCart: Guitar[];
};

export type AppUser = {
  sort: SortState,
  filter: FilterState,
  searchKey: string,
  inCart: InCart,
  totalPrice: TotalPrice,
  coupon: Coupon,
};

export type AppProcess = {
  isReviewOpen: boolean,
  isSuccessOpen: boolean,
  isCartAddOpen: boolean,
  isCartDeleteOpen: boolean,
  isCartSuccessOpen: boolean,
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

export type InCart = {
  [key: string]: number
}

export type TotalPrice = {
  [key: string]: number
}

export type Coupon = {
  value: string | null,
  discount: number,
}
