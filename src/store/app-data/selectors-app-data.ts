import { Reducer } from '../const';
import { State } from '../../types/state';
import { createSelector } from 'reselect';
import { getSearchKey } from '../app-user/selectors-app-user';
import { getCommentsSortByDate, getSortedProducts } from '../../utils';

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

export const getCurrentProduct = (state: State) =>
  state[Reducer.Data].currentProduct;

export const getCurrentComments = (state: State) =>
  state[Reducer.Data].currentComments;

export const getSortedProductsSearch = createSelector(
  [getProductsSearch, getSearchKey], getSortedProducts);

export const getSortedComments  = createSelector(
  getCurrentComments, getCommentsSortByDate);

export const getCommentsCounter = (state: State) => state[Reducer.Data].commentsCounter;

export const getTempItemCart = (state: State) => state[Reducer.Data].tempItemCart;
