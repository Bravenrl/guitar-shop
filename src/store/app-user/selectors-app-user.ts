import { State } from '../../types/state';
import { Reducer } from '../const';

export const getSortKey = (state: State) => state[Reducer.User].sortKey;
export const getOrderKey = (state: State) => state[Reducer.User].orderKey;
export const getProductTypes = (state: State) => state[Reducer.User].productTypes;
export const getStringCounts = (state: State) => state[Reducer.User].stringCounts;
export const getPriceMin = (state: State) => state[Reducer.User].priceMin;
export const getPriceMax = (state: State) => state[Reducer.User].priceMax;
