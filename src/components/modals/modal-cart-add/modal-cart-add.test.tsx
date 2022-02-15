import { configureMockStore } from '@jedmao/redux-mock-store';
import { cleanup, screen } from '@testing-library/react';
import { TestID, TestReg } from '../../../const-test';
import { MockAPP, MockDATA, MockUSER } from '../../../mock/mockStore';
import { customRenderWithProvider } from '../../../render-test';
import { CreateFakeGuitar } from '../../../mock/fakeData';
import * as Redux from 'react-redux';
import userEvent from '@testing-library/user-event';
import ModalCartAdd from './modal-cart-add';
import {
  toggleIsCartAddOpen,
  toggleIsCartSuccessOpen
} from '../../../store/app-process/slice-app-process';
import { addToCart } from '../../../store/app-user/slice-app-user';
import { resetTempItemCart } from '../../../store/app-data/slice-app-data';

const dispatch = jest.fn();
const useDispatch = jest.spyOn(Redux, 'useDispatch');

const NAME = 'name';
const fakeProduct = { ...CreateFakeGuitar(), id: 1, name: NAME };
const mockStore = configureMockStore();
const componentState = {
  DATA: { ...MockDATA, tempItemCart: fakeProduct },
  USER: MockUSER,
  APP: { ...MockAPP, isCartAddOpen: true },
};

describe('Component: ModalCartAdd', () => {
  afterAll(cleanup);
  it('should not render', () => {
    const store = mockStore({...componentState, APP: {isCartAddOpen: false}});
    customRenderWithProvider(<ModalCartAdd />, store);
    expect(screen.queryByText(TestReg.CartAddBtn)).not.toBeInTheDocument();
    expect(screen.queryByAltText(`${fakeProduct.name}`)).not.toBeInTheDocument();
  });
  it('should render correctly', () => {
    const store = mockStore(componentState);
    customRenderWithProvider(<ModalCartAdd />, store);
    expect(screen.getByText(TestReg.CartAddTitle)).toBeInTheDocument();
    expect(screen.getByText(TestReg.CartAddBtn)).toBeInTheDocument();
    expect(screen.getByAltText(`${fakeProduct.name}`)).toBeInTheDocument();
  });
  it('should dispatch correctly if click CartAddBtn', () => {
    useDispatch.mockReturnValue(dispatch);
    const store = mockStore(componentState);
    customRenderWithProvider(<ModalCartAdd />, store);
    userEvent.click(screen.getByText(TestReg.CartAddBtn));
    expect(dispatch).toBeCalledTimes(4);
    expect(dispatch).toHaveBeenCalledWith(addToCart(fakeProduct.id));
    expect(dispatch).toHaveBeenCalledWith(resetTempItemCart());
    expect(dispatch).toHaveBeenCalledWith(toggleIsCartAddOpen(false));
    expect(dispatch).toHaveBeenCalledWith(toggleIsCartSuccessOpen(true));
  });
  it('should dispatch correctly if click close', () => {
    useDispatch.mockReturnValue(dispatch);
    const store = mockStore(componentState);
    customRenderWithProvider(<ModalCartAdd />, store);
    userEvent.click(screen.getByTestId(TestID.ModalCloseBtn));
    expect(dispatch).toBeCalledTimes(2);
    expect(dispatch).toHaveBeenCalledWith(resetTempItemCart());
    expect(dispatch).toHaveBeenCalledWith(toggleIsCartAddOpen(false));
  });
});
