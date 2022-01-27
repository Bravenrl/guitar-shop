import { configureMockStore } from '@jedmao/redux-mock-store';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { TestID, TestReg } from '../../../const-test';
import { MockAPP, MockDATA, MockUSER } from '../../../mock/mockStore';
import { customRenderWithProvider } from '../../../render-test';
import ModalReview from './modal-review';
import { CreateFakeGuitar } from '../../../mock/fakeData';
import { STAR_NUMBERS } from '../../../const';
import * as Redux from 'react-redux';
import { postComment } from '../../../store/api-actions';
import userEvent from '@testing-library/user-event';

jest.mock('../../../store/api-actions');

const fakePostComment = postComment as jest.MockedFunction<typeof postComment>;

const dispatch = jest.fn();
const useDispatch = jest.spyOn(Redux, 'useDispatch');

const NAME = 'name';
const fakeProduct = { ...CreateFakeGuitar(), id: 1, name: NAME };
const mockStore = configureMockStore();
const componentState = {
  DATA: { ...MockDATA, currentProduct: fakeProduct },
  USER: MockUSER,
  APP: MockAPP,
};

const TEXT = 'text';
const newComment = {
  advantage: TEXT,
  comment: TEXT,
  disadvantage: TEXT,
  guitarId: 1,
  rating: 3,
  userName: TEXT,
};

describe('Component: ModalReview', () => {
  it('should render correctly', () => {
    const store = mockStore({ ...componentState, APP: { isReviewOpen: true } });
    customRenderWithProvider(<ModalReview />, store);
    expect(screen.getByText(TestReg.SubmitBtn)).toBeInTheDocument();
    expect(screen.getByTestId(TestID.ModalCloseBtn)).toBeInTheDocument();
    expect(screen.getByTestId(TestID.InputName)).toBeInTheDocument();
    expect(screen.getAllByTestId(TestID.InputStar).length).toEqual(
      STAR_NUMBERS.length);
    expect(screen.getByTestId(TestID.InputAdv)).toBeInTheDocument();
    expect(screen.getByTestId(TestID.InputDisadv)).toBeInTheDocument();
    expect(screen.getByTestId(TestID.InputComment)).toBeInTheDocument();
    expect(screen.getAllByText(TestReg.ValidErrorText).length).toEqual(4);
    screen
      .getAllByText(TestReg.ValidErrorText)
      .forEach((element) => expect(element).not.toBeVisible());
    expect(screen.queryByText(TestReg.ValidErrorStar)).not.toBeVisible();
  });

  it('should submit correctly', async () => {
    useDispatch.mockReturnValue(dispatch);
    const store = mockStore({ ...componentState, APP: { isReviewOpen: true } });

    customRenderWithProvider(<ModalReview />, store);

    fireEvent.submit(screen.getByTestId(TestID.Submit));

    await waitFor(() =>
      screen
        .getAllByText(TestReg.ValidErrorText)
        .forEach((element) => expect(element).toBeVisible()));
    await waitFor(() =>
      expect(screen.queryByText(TestReg.ValidErrorStar)).toBeVisible());

    expect(fakePostComment).not.toHaveBeenCalled();

    userEvent.type(screen.getByTestId(TestID.InputName), TEXT);

    userEvent.type(screen.getByTestId(TestID.InputAdv), TEXT);

    userEvent.type(screen.getByTestId(TestID.InputDisadv), TEXT);

    userEvent.type(screen.getByTestId(TestID.InputComment), TEXT);

    expect(screen.getAllByTestId(TestID.InputStar)[2]).not.toBeChecked();

    userEvent.click(screen.getAllByTestId(TestID.InputStar)[2]);

    expect(screen.getAllByTestId(TestID.InputStar)[2]).toBeChecked();
    expect(screen.getByTestId(TestID.InputName)).toHaveValue(TEXT);
    expect(screen.getByTestId(TestID.InputAdv)).toHaveValue(TEXT);
    expect(screen.getByTestId(TestID.InputDisadv)).toHaveValue(TEXT);
    expect(screen.getByTestId(TestID.InputComment)).toHaveValue(TEXT);

    fireEvent.submit(screen.getByTestId(TestID.Submit));

    await waitFor(() => expect(fakePostComment).toHaveBeenCalledWith(newComment));
  });

  it('should not render if isReviewOpen false', () => {
    const store = mockStore(componentState);
    customRenderWithProvider(<ModalReview />, store);
    expect(screen.queryByText(TestReg.SubmitBtn)).not.toBeInTheDocument();
    expect(screen.queryByTestId(TestID.ModalCloseBtn)).not.toBeInTheDocument();
    expect(screen.queryByTestId(TestID.InputName)).not.toBeInTheDocument();
  });
});
