import * as Redux from 'react-redux';
import { TestReg } from '../../../../const-test';
import { customRender } from '../../../../render-test';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ShowMoreBtn from './show-more-btn';
import { incrementCommentsCounter } from '../../../../store/app-data/slice-app-data';

const dispatch = jest.fn();
const useDispatch = jest.spyOn(Redux, 'useDispatch');

describe('Component: ShowMoreBtn', () => {
  it('should render & dispatch correctly', () => {
    useDispatch.mockReturnValue(dispatch);
    customRender(<ShowMoreBtn/>);
    expect(screen.getByText(TestReg.ShowMoreBtn)).toBeInTheDocument();
    userEvent.click(screen.getByText(TestReg.ShowMoreBtn));
    expect(dispatch).toBeCalledWith({
      type: incrementCommentsCounter.type,
    });
  });
});


