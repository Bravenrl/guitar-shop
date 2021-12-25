import { Reducer } from '../const';
import { State } from '../../types/state';

export const getAllGuitars = (state: State) => state[Reducer.Data].allGuitars;
