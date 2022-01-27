import { configureMockStore } from '@jedmao/redux-mock-store';
import { screen } from '@testing-library/react';
import { TestReg } from '../../../const-test';
import { MockAPP, MockDATA, MockUSER } from '../../../mock/mockStore';
import { customRenderWithProvider } from '../../../render-test';
import { CreateFakeGuitar } from '../../../mock/fakeData';
import ModalContainer from './modal-container';

const NAME = 'name';
const fakeProduct = { ...CreateFakeGuitar(), id: 1, name: NAME };
const mockStore = configureMockStore();
const componentState = {
  DATA: { ...MockDATA, currentProduct: fakeProduct },
  USER: MockUSER,
  APP: MockAPP,
};

describe('Component: ModalReview', () => {
  it('should render no modal', () => {
    const store = mockStore(componentState);
    customRenderWithProvider(<ModalContainer />, store);
    expect(screen.queryByText(TestReg.SubmitBtn)).not.toBeInTheDocument();
    expect(screen.queryByText(TestReg.SuccessBtn)).not.toBeInTheDocument();
  });
  it('should render ModalReview', () => {
    const store = mockStore({ ...componentState, APP: { isReviewOpen: true } });
    customRenderWithProvider(<ModalContainer />, store);
    expect(screen.getByText(TestReg.SubmitBtn)).toBeInTheDocument();
  });
  it('should render ModalSuccess', () => {
    const store = mockStore({
      ...componentState,
      APP: { isSuccessOpen: true },
    });
    customRenderWithProvider(<ModalContainer />, store);
    expect(screen.getByText(TestReg.SuccessBtn)).toBeInTheDocument();
  });
});
