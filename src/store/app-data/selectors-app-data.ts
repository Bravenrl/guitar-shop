import { Reducer } from '../const';
import { State } from '../../types/state';

export const getProductsInit = (state: State) =>
  state[Reducer.Data].productsSearch;

export const getProductsShow = (state: State) =>
  state[Reducer.Data].productsShow;

export const getPriceEnd = (state: State) => state[Reducer.Data].priceEnd;

export const getPriceStart = (state: State) => state[Reducer.Data].priceStart;

export const getProductsCount = (state: State) =>
  state[Reducer.Data].productsCount;
