import { Reducer } from '../const';
import { State } from '../../types/state';
import { createSelector } from 'reselect';
import { getSearchKey } from '../app-user/selectors-app-user';
import { getSortedProducts } from '../../utils';

export const getProductsSearch = (state: State) =>
  state[Reducer.Data].productsSearch;

export const getProductsShow = (state: State) =>
  state[Reducer.Data].productsShow;

export const getPriceEnd = (state: State) => state[Reducer.Data].priceEnd;

export const getPriceStart = (state: State) => state[Reducer.Data].priceStart;

export const getProductsCount = (state: State) =>
  state[Reducer.Data].productsCount;

export const getIsLoading = (state: State) =>
  state[Reducer.Data].isLoading;

export const getSortedProductsSearch = createSelector(
  [getProductsSearch, getSearchKey], getSortedProducts);
