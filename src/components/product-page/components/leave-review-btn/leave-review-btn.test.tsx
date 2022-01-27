import * as Redux from 'react-redux';
import { TestReg } from '../../../../const-test';
import { customRender } from '../../../../render-test';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { toggleIsReviewOpen } from '../../../../store/app-process/slice-app-process';
import LeaveReviewBtn from './leave-review-btn';

const dispatch = jest.fn();
const useDispatch = jest.spyOn(Redux, 'useDispatch');

describe('Component: LeaveReviewBtn', () => {
  it('should render & dispatch correctly', () => {
    useDispatch.mockReturnValue(dispatch);
    customRender(<LeaveReviewBtn/>);
    expect(screen.getByText(TestReg.LeaveReviewBtn)).toBeInTheDocument();
    userEvent.click(screen.getByText(TestReg.LeaveReviewBtn));
    expect(dispatch).toBeCalledWith({
      payload: true, type: toggleIsReviewOpen.type,
    });
  });
});


