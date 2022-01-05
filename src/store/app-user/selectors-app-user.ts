import { State } from '../../types/state';
import { Reducer } from '../const';

export const getSortKey = (state: State) => state[Reducer.User].sortKey;
export const getOrderKey = (state: State) => state[Reducer.User].orderKey;
export const getFilter = (state: State) => state[Reducer.User].filter;
