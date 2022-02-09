import { State } from '../../types/state';
import { Reducer } from '../const';

export const getIsReviewOpen = (state: State) =>
  state[Reducer.Process].isReviewOpen;

export const getIsSuccessOpen = (state: State) =>
  state[Reducer.Process].isSuccessOpen;

export const getIsCartAddOpen = (state: State) =>
  state[Reducer.Process].isCartAddOpen;

export const getIsCartDeleteOpen = (state: State) =>
  state[Reducer.Process].isCartDeleteOpen;

export const getIsCartSuccessOpen = (state: State) =>
  state[Reducer.Process].isCartSuccessOpen;
