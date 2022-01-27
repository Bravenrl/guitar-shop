import { configureMockStore } from '@jedmao/redux-mock-store';
import { screen } from '@testing-library/react';
import { TestID, TestReg } from '../../../const-test';
import { MockAPP, MockDATA, MockUSER } from '../../../mock/mockStore';
import { customRenderWithProvider } from '../../../render-test';
import ModalReview from './modal-review';
import { CreateFakeGuitar } from '../../../mock/fakeData';
import { STAR_NUMBERS } from '../../../const';

const NAME = 'name';
const fakeProduct = { ...CreateFakeGuitar(), id: 1, name: NAME };
const mockStore = configureMockStore();
const componentState = {
  DATA: { ...MockDATA, currentProduct: fakeProduct },
  USER: MockUSER,
  APP: MockAPP,
};

describe('Component: ModalReview', () => {
  it('should render correctly', () => {
    const store = mockStore({ ...componentState, APP: { isReviewOpen: true } });
    customRenderWithProvider(<ModalReview />, store);
    expect(screen.getByText(TestReg.SubmitBtn)).toBeInTheDocument();
    expect(screen.getByTestId(TestID.ModalCloseBtn)).toBeInTheDocument();
    expect(screen.getByTestId(TestID.InputName)).toBeInTheDocument();
    expect(screen.getAllByTestId(TestID.InputStar).length).toEqual(
      STAR_NUMBERS.length,
    );
    expect(screen.getByTestId(TestID.InputAdv)).toBeInTheDocument();
    expect(screen.getByTestId(TestID.InputDisadv)).toBeInTheDocument();
    expect(screen.getByTestId(TestID.InputComment)).toBeInTheDocument();
    expect(screen.getAllByText(TestReg.ValidErrorText).length).toEqual(4);
    screen
      .getAllByText(TestReg.ValidErrorText)
      .forEach((element) => expect(element).not.toBeVisible());
    expect(screen.queryByText(TestReg.ValidErrorStar)).not.toBeVisible();
  });
});
