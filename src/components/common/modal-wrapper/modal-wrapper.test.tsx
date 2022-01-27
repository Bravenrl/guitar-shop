import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ROOT, TestID } from '../../../const-test';
import ModalWrapper from './modal-wrapper';
import * as Redux from 'react-redux';
import { closeAllModals } from '../../../store/app-process/slice-app-process';

const dispatch = jest.fn();
const useDispatch = jest.spyOn(Redux, 'useDispatch');
const CLASS = 'class-modal';

describe('Component: ModalWrapper', () => {
  it('should render correctly', () => {
    useDispatch.mockReturnValue(dispatch);
    render(
      <ModalWrapper modalType={CLASS}>
        <p>{ROOT}</p>
      </ModalWrapper>);
    expect(screen.getByTestId(TestID.ModalWrap)).toHaveClass(CLASS);
    expect(screen.getByTestId(TestID.ModalOverlay)).toBeInTheDocument();
    userEvent.click(screen.getByTestId(TestID.ModalOverlay));
    fireEvent.keyDown(screen.getByTestId(TestID.ModalWrap), {key:'Esc'});
    expect(dispatch).toBeCalledWith({type: closeAllModals.type});
    expect(dispatch).toBeCalledTimes(2);
  });
});
