import { State } from '../../types/state';
import { Reducer } from '../const';

export const getSort = (state: State) => state[Reducer.User].sort;
export const getFilter = (state: State) => state[Reducer.User].filter;
