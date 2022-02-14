import { createSelector } from 'reselect';
import { State } from '../../types/state';
import { getSumValues } from '../../utils';
import { Reducer } from '../const';

export const getSort = (state: State) => state[Reducer.User].sort;
export const getFilter = (state: State) => state[Reducer.User].filter;
export const getSearchKey = (state: State) => state[Reducer.User].searchKey;
export const getInCart = (state: State) => state[Reducer.User].inCart;
export const getTotalPrice = (state: State) => state[Reducer.User].totalPrice;
export const getCoupon = (state: State) => state[Reducer.User].coupon;

export const getTotalInCart = createSelector(getInCart, getSumValues);

export const getProductsIds = createSelector(getInCart, (inCart) =>  Object.keys(inCart));

export const getSumTotalPrices = createSelector(getTotalPrice, getSumValues);
