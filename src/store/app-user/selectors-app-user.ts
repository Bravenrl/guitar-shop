import { State } from '../../types/state';
import { Reducer } from '../const';

export const getSortKey = (state: State) => state[Reducer.User].sortKey;
export const getOrderKey = (state: State) => state[Reducer.User].orderKey;
export const getType = (state: State) => state[Reducer.User].type;
export const getPriceEnd = (state: State) => state[Reducer.User].priceEnd;
export const getPriceStart = (state: State) => state[Reducer.User].priceStart;
