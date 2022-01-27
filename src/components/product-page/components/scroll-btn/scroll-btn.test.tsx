import { TestReg } from '../../../../const-test';
import { customRender } from '../../../../render-test';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ScrollBtn from './scroll-btn';

window.scrollTo = jest.fn();

describe('Component: ScrollBtn', () => {
  it('should render & scroll correctly', () => {
    customRender(<ScrollBtn/>);
    expect(screen.getByText(TestReg.ScrollBtn)).toBeInTheDocument();
    userEvent.click(screen.getByText(TestReg.ScrollBtn));
    expect(window.scrollTo).toBeCalled();
  });
});


