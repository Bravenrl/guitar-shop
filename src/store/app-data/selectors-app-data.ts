import { Reducer } from '../const';
import { State } from '../../types/state';

export const getProductsInit = (state: State) => state[Reducer.Data].productsInit;

export const getProductsShow = (state: State) => state[Reducer.Data].productsShow;
