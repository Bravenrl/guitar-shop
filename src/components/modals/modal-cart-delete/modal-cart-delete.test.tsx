import { configureMockStore } from '@jedmao/redux-mock-store';
import { cleanup, screen } from '@testing-library/react';
import { TestID, TestReg } from '../../../const-test';
import { MockAPP, MockDATA, MockUSER } from '../../../mock/mockStore';
import { customRenderWithProvider } from '../../../render-test';
import { CreateFakeGuitar } from '../../../mock/fakeData';
import * as Redux from 'react-redux';
import userEvent from '@testing-library/user-event';
import {
  toggleIsCartDeleteOpen
} from '../../../store/app-process/slice-app-process';
import { deleteFromCart } from '../../../store/app-user/slice-app-user';
import { deleteProductFromCart, resetTempItemCart } from '../../../store/app-data/slice-app-data';
import ModalCartDelete from './modal-cart-delete';

const dispatch = jest.fn();
const useDispatch = jest.spyOn(Redux, 'useDispatch');

const NAME = 'name';
const fakeProduct = { ...CreateFakeGuitar(), id: 1, name: NAME };
const mockStore = configureMockStore();
const componentState = {
  DATA: { ...MockDATA, tempItemCart: fakeProduct },
  USER: MockUSER,
  APP: { ...MockAPP, isCartDeleteOpen: true },
};

describe('Component: ModalCartDelete', () => {
  afterAll(cleanup);
  it('should not render', () => {
    const store = mockStore({...componentState, APP: {isCartDeleteOpen: false}});
    customRenderWithProvider(<ModalCartDelete />, store);
    expect(screen.queryByText(TestReg.CartDeleteRemove)).not.toBeInTheDocument();
    expect(screen.queryByAltText(`${fakeProduct.name}`)).not.toBeInTheDocument();
  });
  it('should render correctly', () => {
    const store = mockStore(componentState);
    customRenderWithProvider(<ModalCartDelete />, store);
    expect(screen.getByText(TestReg.CartDeleteTitle)).toBeInTheDocument();
    expect(screen.getByText(TestReg.CartDeleteRemove)).toBeInTheDocument();
    expect(screen.getByText(TestReg.CartResume)).toBeInTheDocument();
    expect(screen.getByAltText(`${fakeProduct.name}`)).toBeInTheDocument();
  });
  it('should dispatch correctly if click on DeleteBtn', () => {
    useDispatch.mockReturnValue(dispatch);
    const store = mockStore(componentState);
    customRenderWithProvider(<ModalCartDelete />, store);
    userEvent.click(screen.getByText(TestReg.CartDeleteRemove));
    expect(dispatch).toBeCalledTimes(4);
    expect(dispatch).toHaveBeenCalledWith(deleteFromCart(fakeProduct.id));
    expect(dispatch).toHaveBeenCalledWith(deleteProductFromCart(fakeProduct.id));
    expect(dispatch).toHaveBeenCalledWith(resetTempItemCart());
    expect(dispatch).toHaveBeenCalledWith(toggleIsCartDeleteOpen(false));
  });
  it('should dispatch correctly if click  on ResumeBtn', () => {
    useDispatch.mockReturnValue(dispatch);
    const store = mockStore(componentState);
    customRenderWithProvider(<ModalCartDelete />, store);
    userEvent.click(screen.getByText(TestReg.CartResume));
    expect(dispatch).toBeCalledTimes(2);
    expect(dispatch).toHaveBeenCalledWith(resetTempItemCart());
    expect(dispatch).toHaveBeenCalledWith(toggleIsCartDeleteOpen(false));
  });
  it('should dispatch correctly if click CloseBtn', () => {
    useDispatch.mockReturnValue(dispatch);
    const store = mockStore(componentState);
    customRenderWithProvider(<ModalCartDelete />, store);
    userEvent.click(screen.getByTestId(TestID.ModalCloseBtn));
    expect(dispatch).toBeCalledTimes(2);
    expect(dispatch).toHaveBeenCalledWith(resetTempItemCart());
    expect(dispatch).toHaveBeenCalledWith(toggleIsCartDeleteOpen(false));
  });
});
