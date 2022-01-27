import { configureMockStore } from '@jedmao/redux-mock-store';
import { screen } from '@testing-library/react';
import { TestID, TestReg } from '../../../const-test';
import { MockAPP, MockDATA, MockUSER } from '../../../mock/mockStore';
import { customRenderWithProvider } from '../../../render-test';
import ModalSuccess from './modal-success';
import * as Redux from 'react-redux';
import userEvent from '@testing-library/user-event';
import { toggleIsSuccessOpen } from '../../../store/app-process/slice-app-process';


const dispatch = jest.fn();
const useDispatch = jest.spyOn(Redux, 'useDispatch');

const mockStore = configureMockStore();
const componentState = {
  DATA: MockDATA,
  USER: MockUSER,
  APP: MockAPP,
};

describe('Component: ModalSuccess', () => {
  it('should render correctly', () => {
    const store = mockStore({...componentState, APP: {isSuccessOpen: true}});
    customRenderWithProvider(<ModalSuccess />, store);
    expect(screen.getByText(TestReg.SuccessBtn)).toBeInTheDocument();
    expect(screen.getByTestId(TestID.ModalCloseBtn)).toBeInTheDocument();
  });
  it('should dispatch correctly', () => {
    useDispatch.mockReturnValue(dispatch);
    const store = mockStore({...componentState, APP: {isSuccessOpen: true}});
    customRenderWithProvider(<ModalSuccess />, store);
    userEvent.click(screen.getByText(TestReg.SuccessBtn));
    userEvent.click(screen.getByTestId(TestID.ModalCloseBtn));
    expect(dispatch).toBeCalledTimes(2);
    expect(dispatch).toHaveBeenCalledWith({
      payload: false,
      type: toggleIsSuccessOpen.type,
    });
  });
});
