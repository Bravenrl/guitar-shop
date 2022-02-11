import { createSelector } from 'reselect';
import { State } from '../../types/state';
import { getSumValues } from '../../utils';
import { Reducer } from '../const';

export const getSort = (state: State) => state[Reducer.User].sort;
export const getFilter = (state: State) => state[Reducer.User].filter;
export const getSearchKey = (state: State) => state[Reducer.User].searchKey;
export const getInCart = (state: State) => state[Reducer.User].inCart;

export const getTotalInCart  = createSelector(
  getInCart, getSumValues);

