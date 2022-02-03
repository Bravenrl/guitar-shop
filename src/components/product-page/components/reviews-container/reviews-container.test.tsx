import { configureMockStore } from '@jedmao/redux-mock-store';
import { screen } from '@testing-library/react';

import { INIT_COMMENTS_COUNT } from '../../../../const';
import { TestReg } from '../../../../const-test';
import { CreateFakeComment } from '../../../../mock/fakeData';
import { MockAPP, MockDATA, MockUSER } from '../../../../mock/mockStore';
import { customRenderWithProvider } from '../../../../render-test';
import ReviewsContainer from './reviews-container';

const mockStore = configureMockStore();

const fakeComment = CreateFakeComment();
const user = new RegExp('user', 'i');
const NAME = 'user';
const NAME_FIRST = 'user 1';
const NAME_THIRD = 'user 3';
const fakeComments = [
  { ...fakeComment, id: 1, createAt: '2021-10-27T12:32:16.934Z', userName: NAME_THIRD },
  { ...fakeComment, id: 2, createAt: '2021-11-28T12:32:16.934Z', userName: NAME_FIRST  },
  { ...fakeComment, id: 3, createAt: '2021-10-28T13:32:16.934Z', userName: NAME },
  { ...fakeComment, id: 4, createAt: '2021-09-28T13:32:16.934Z', userName: NAME },
];

describe('Component: ReviewsContainer', () => {
  it('should render correctly', () => {
    const componentState = {
      DATA: { ...MockDATA, currentComments: fakeComments },
      USER: MockUSER,
      APP: MockAPP,
    };
    const store = mockStore(componentState);
    customRenderWithProvider(<ReviewsContainer />, store);
    expect(screen.getByText(TestReg.LeaveReviewBtn)).toBeInTheDocument();
    expect(screen.getByText(TestReg.ScrollBtn)).toBeInTheDocument();
    expect(screen.getByText(TestReg.ShowMoreBtn)).toBeInTheDocument();
    expect(screen.getAllByText(user).length).toEqual(INIT_COMMENTS_COUNT);
    expect(screen.getAllByText(user)[0]).toHaveTextContent(NAME_FIRST);
    expect(screen.getAllByText(user)[2]).toHaveTextContent(NAME_THIRD);
  });

  it('should not render ScrollBtn & ShowMoreBtn without comments', () => {
    const componentState = {
      DATA: MockDATA,
      USER: MockUSER,
      APP: MockAPP,
    };
    const store = mockStore(componentState);
    customRenderWithProvider(<ReviewsContainer />, store);
    expect(screen.getByText(TestReg.LeaveReviewBtn)).toBeInTheDocument();
    expect(screen.queryByText(TestReg.ScrollBtn)).not.toBeInTheDocument();
    expect(screen.queryByText(TestReg.ShowMoreBtn)).not.toBeInTheDocument();
    expect(screen.getByText(TestReg.NoReviews)).toBeInTheDocument();
  });
});
