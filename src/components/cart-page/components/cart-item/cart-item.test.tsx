import { configureMockStore } from '@jedmao/redux-mock-store';
import { screen } from '@testing-library/react';
import * as Redux from 'react-redux';
import userEvent from '@testing-library/user-event';
import { MockUSER } from '../../../../mock/mockStore';
import { customRenderWithProvider } from '../../../../render-test';
import { TestID, TestReg } from '../../../../const-test';
import { CreateFakeGuitar } from '../../../../mock/fakeData';
import { Guitar } from '../../../../types/data';
import { addTempItemCart } from '../../../../store/app-data/slice-app-data';
import { toggleIsCartDeleteOpen } from '../../../../store/app-process/slice-app-process';
import CartItem from './cart-item';
import { GuitarsType } from '../../../../const';

const dispatch = jest.fn();
const useDispatch = jest.spyOn(Redux, 'useDispatch');
const mockStore = configureMockStore();

const FAKE_ID = 1;
const PRICE = 25;
const FAKE_COUNT = 2;
const FAKE_TOTAL_PRICE = 50;
const fakeProduct = { ...CreateFakeGuitar(), id: FAKE_ID, price: PRICE } as Guitar;
const FakeInCart = {
  '1': 2,
  '3': 1,
};
const FakeTotalPrice = {
  '1': 50,
  '3': 50,
};

const componentState = {
  USER: { ...MockUSER, inCart: FakeInCart, totalPrice: FakeTotalPrice },
};
const fakeProductType = GuitarsType.get(fakeProduct.type)?.type;


describe('Component: CartItem', () => {
  it('should render correctly', () => {
    useDispatch.mockReturnValue(dispatch);
    const store = mockStore(componentState);
    customRenderWithProvider(<CartItem product = {fakeProduct}/>, store);
    expect(screen.getByText(`${fakeProductType} ${fakeProduct.name}`)).toBeInTheDocument();
    expect(screen.getByAltText(`${fakeProduct.name}`)).toBeInTheDocument();
    expect(screen.getByText(`Артикул: ${fakeProduct.vendorCode}`)).toBeInTheDocument();
    expect(screen.getByText(`${fakeProductType}, ${fakeProduct.stringCount} струнная`)).toBeInTheDocument();
    expect(screen.getByText(`${fakeProduct.price} ₽`)).toBeInTheDocument();
    expect(screen.getByText(`${FAKE_TOTAL_PRICE} ₽`)).toBeInTheDocument();
    expect(screen.getByTestId(TestID.Quantity)).toBeInTheDocument();
    expect(screen.getByTestId(TestID.Quantity)).toHaveValue(FAKE_COUNT.toString());
    expect(screen.getByLabelText(TestReg.QuantAdd)).toBeInTheDocument();
    expect(screen.getByLabelText(TestReg.QuantRemove)).toBeInTheDocument();
  });
  it('should dispatch correctly if click CartDeleteBtn', async () => {
    useDispatch.mockClear();
    useDispatch.mockReturnValue(dispatch);
    const store = mockStore(componentState);
    customRenderWithProvider(<CartItem product = {fakeProduct}/>, store);
    userEvent.click(screen.getByLabelText(TestReg.CartDeleteBtn));
    expect(dispatch).toBeCalledTimes(2);
    expect(dispatch).toBeCalledWith(addTempItemCart(fakeProduct));
    expect(dispatch).toBeCalledWith(toggleIsCartDeleteOpen(true));
  });
});
