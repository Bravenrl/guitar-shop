import { State } from '../../types/state';
import { Reducer } from '../const';

export const getIsReviewOpen = (state: State) =>
  state[Reducer.Process].isReviewOpen;

export const getIsSuccessOpen = (state: State) =>
  state[Reducer.Process].isSuccessOpen;
