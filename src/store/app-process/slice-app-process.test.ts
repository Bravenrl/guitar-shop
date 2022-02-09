import { AppProcess } from '../../types/state';
import appProcess, { closeAllModals, toggleIsCartAddOpen, toggleIsCartDeleteOpen, toggleIsCartSuccessOpen, toggleIsReviewOpen, toggleIsSuccessOpen } from './slice-app-process';

export const initialState: AppProcess = {
  isReviewOpen: false,
  isSuccessOpen: false,
  isCartAddOpen: false,
  isCartDeleteOpen: false,
  isCartSuccessOpen: false,
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
  it('should return initialState by closeAllModals', () => {
    state = {...initialState,
      isSuccessOpen: true};
    expect(appProcess(state, closeAllModals())).toEqual({
      ...initialState,
    });
  });
  it('should update isSuccessOpen by toggleIsSuccessOpen', () => {
    expect(appProcess(state, toggleIsSuccessOpen(true))).toEqual({
      ...state,
      isSuccessOpen: true,
    });
  });

  it('should update isCartAddOpen by toggleIsCartAddOpen', () => {
    expect(appProcess(state, toggleIsCartAddOpen(true))).toEqual({
      ...state,
      isCartAddOpen: true,
    });
  });

  it('should update isCartDeleteOpen by toggleIsCartDeleteOpen', () => {
    expect(appProcess(state, toggleIsCartDeleteOpen(true))).toEqual({
      ...state,
      isCartDeleteOpen: true,
    });
  });

  it('should update isCartSuccessOpen by toggleIsCartSuccessOpen', () => {
    expect(appProcess(state, toggleIsCartSuccessOpen(true))).toEqual({
      ...state,
      isCartSuccessOpen: true,
    });
  });
});
