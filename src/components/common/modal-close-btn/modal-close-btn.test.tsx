import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TestID } from '../../../const-test';
import ModalCloseBtn from './modal-close-btn';

const onClick = jest.fn();
describe('Component: ModalCloseBtn', () => {
  it('should render correctly', () => {
    render(<ModalCloseBtn onClick ={onClick}/>);
    expect(screen.getByTestId(TestID.ModalCloseBtn)).toBeInTheDocument();
    userEvent.click(screen.getByTestId(TestID.ModalCloseBtn));
    expect(onClick).toBeCalled();
  });
});
