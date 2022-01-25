import { AppProcess } from '../../types/state';
import appProcess, { toggleIsReviewOpen, toggleIsSuccessOpen } from './slice-app-process';

export const initialState: AppProcess = {
  isReviewOpen: false,
  isSuccessOpen: false,
};

describe('Reducer: appData', () => {
  let state = initialState;
  beforeAll(() => {
    state = initialState;
  });
  it('without additional parameters should return initial state', () => {
    expect(appProcess(void 0, { type: 'UNKNOWN_ACTION' })).toEqual(state);
  });
  it('should update isReviewOpen by toggleIsReviewOpen', () => {
    expect(appProcess(state, toggleIsReviewOpen(true))).toEqual({
      ...state,
      isReviewOpen: true,
    });
  });
  it('should update isSuccessOpen by toggleIsSuccessOpen', () => {
    expect(appProcess(state, toggleIsSuccessOpen(true))).toEqual({
      ...state,
      isSuccessOpen: true,
    });
  });

});
