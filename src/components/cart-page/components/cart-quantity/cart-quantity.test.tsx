import { configureMockStore } from '@jedmao/redux-mock-store';
import { screen, waitFor } from '@testing-library/react';
import * as Redux from 'react-redux';
import userEvent from '@testing-library/user-event';
import { MockUSER } from '../../../../mock/mockStore';
import { customRenderWithProvider } from '../../../../render-test';
import { TestID, TestReg } from '../../../../const-test';
import { CreateFakeGuitar } from '../../../../mock/fakeData';
import CartQuantity from './cart-quantity';
import { Guitar } from '../../../../types/data';
import { addTempItemCart } from '../../../../store/app-data/slice-app-data';
import { toggleIsCartDeleteOpen } from '../../../../store/app-process/slice-app-process';
import { setQuantityCart, setTotalPrice } from '../../../../store/app-user/slice-app-user';

const dispatch = jest.fn();
const useDispatch = jest.spyOn(Redux, 'useDispatch');
const mockStore = configureMockStore();

const FAKE_ID = 1;
const PRICE = 25;
const FAKE_COUNT = 2;
const FAKE_NEW_COUNT = 25;
const FAKE_TOTAL_PRICE = 50;
const fakeProduct = { ...CreateFakeGuitar(), id: FAKE_ID, price: PRICE } as Guitar;
const FakeInCart = {
  '1': 2,
  '3': 1,
};
const FakeInCartMax = {
  '1': 99,
  '3': 1,
};
const FakeTotalPrice = {
  '1': 50,
  '3': 50,
};

const componentState = {
  USER: { ...MockUSER, inCart: FakeInCart, totalPrice: FakeTotalPrice },
};
const componentStateMax = {
  USER: { ...MockUSER, inCart: FakeInCartMax, totalPrice: FakeTotalPrice },
};


describe('Component: CartQuantity', () => {
  it('should render correctly', () => {
    useDispatch.mockReturnValue(dispatch);
    const store = mockStore(componentState);
    customRenderWithProvider(<CartQuantity product = {fakeProduct}/>, store);
    expect(screen.getByText(`${FAKE_TOTAL_PRICE} ₽`)).toBeInTheDocument();
    expect(screen.getByTestId(TestID.Quantity)).toBeInTheDocument();
    expect(screen.getByTestId(TestID.Quantity)).toHaveValue(FAKE_COUNT.toString());
    expect(screen.getByLabelText(TestReg.QuantAdd)).toBeInTheDocument();
    expect(screen.getByLabelText(TestReg.QuantRemove)).toBeInTheDocument();
  });
  it('should not enter in input value<1 & value>99', () => {
    useDispatch.mockReturnValue(dispatch);
    const store = mockStore(componentState);
    customRenderWithProvider(<CartQuantity product = {fakeProduct}/>, store);
    userEvent.type(screen.getByTestId(TestID.Quantity), '5');
    expect(screen.getByTestId(TestID.Quantity)).toHaveValue(FAKE_COUNT.toString()+5);
    userEvent.type(screen.getByTestId(TestID.Quantity), '9');
    expect(screen.getByTestId(TestID.Quantity)).toHaveValue(FAKE_COUNT.toString()+5);
    userEvent.clear(screen.getByTestId(TestID.Quantity));
    expect(screen.getByTestId(TestID.Quantity)).toHaveValue('');
    userEvent.type(screen.getByTestId(TestID.Quantity), '0');
    expect(screen.getByTestId(TestID.Quantity)).toHaveValue('');
    userEvent.type(screen.getByTestId(TestID.Quantity), 'A');
    expect(screen.getByTestId(TestID.Quantity)).toHaveValue('');
    userEvent.type(screen.getByTestId(TestID.Quantity), '-');
    expect(screen.getByTestId(TestID.Quantity)).toHaveValue('');
    userEvent.type(screen.getByTestId(TestID.Quantity), '100');
    expect(screen.getByTestId(TestID.Quantity)).toHaveValue('10');
  });
  it('should not set input value<1 & dispatch correctly if click on remove', () => {
    useDispatch.mockReturnValue(dispatch);
    const store = mockStore(componentState);
    customRenderWithProvider(<CartQuantity product = {fakeProduct}/>, store);
    expect(screen.getByTestId(TestID.Quantity)).toHaveValue('2');
    userEvent.click(screen.getByLabelText(TestReg.QuantRemove));
    expect(screen.getByTestId(TestID.Quantity)).toHaveValue('1');
    expect(dispatch).not.toBeCalled();
    userEvent.click(screen.getByLabelText(TestReg.QuantRemove));
    expect(screen.getByTestId(TestID.Quantity)).toHaveValue('1');
    expect(dispatch).toBeCalledTimes(2);
    expect(dispatch).toBeCalledWith(addTempItemCart(fakeProduct));
    expect(dispatch).toBeCalledWith(toggleIsCartDeleteOpen(true));
  });

  it('should not set input value>99 if click on add', () => {
    useDispatch.mockReturnValue(dispatch);
    const store = mockStore(componentStateMax);
    customRenderWithProvider(<CartQuantity product = {fakeProduct}/>, store);
    expect(screen.getByTestId(TestID.Quantity)).toHaveValue('99');
    userEvent.click(screen.getByLabelText(TestReg.QuantAdd));
    expect(screen.getByTestId(TestID.Quantity)).toHaveValue('99');
  });

  it('should dispatch correctly if input changed', async () => {
    useDispatch.mockClear();
    useDispatch.mockReturnValue(dispatch);
    const store = mockStore(componentState);
    customRenderWithProvider(<CartQuantity product = {fakeProduct}/>, store);
    userEvent.type(screen.getByTestId(TestID.Quantity), '5');
    await waitFor(() => expect(dispatch).toHaveBeenCalledWith(setQuantityCart({id: FAKE_ID, quantity: FAKE_NEW_COUNT})));
    await waitFor(() => expect(dispatch).toHaveBeenCalledWith(setTotalPrice({id: FAKE_ID, price: FAKE_NEW_COUNT*PRICE})));
    userEvent.click(screen.getByLabelText(TestReg.QuantAdd));
    expect(screen.getByTestId(TestID.Quantity)).toHaveValue('26');
    await waitFor(() => expect(dispatch).toHaveBeenCalledWith(setQuantityCart({id: FAKE_ID, quantity: 26})));
    await waitFor(() => expect(dispatch).toHaveBeenCalledWith(setTotalPrice({id: FAKE_ID, price: 26*PRICE})));
  });
});
