import { TestReg } from '../../../../const-test';
import { customRender } from '../../../../render-test';
import { screen } from '@testing-library/react';
import ProductPrice from './product-price';
import { CreateFakeGuitar } from '../../../../mock/fakeData';
import * as Redux from 'react-redux';
import userEvent from '@testing-library/user-event';
import { toggleIsCartAddOpen } from '../../../../store/app-process/slice-app-process';
import { addTempItemCart } from '../../../../store/app-data/slice-app-data';

const dispatch = jest.fn();
const useDispatch = jest.spyOn(Redux, 'useDispatch');
const FAKE_PRODUCT = CreateFakeGuitar();

describe('Component: ProductPrice', () => {
  it('should render & dispatch correctly', () => {
    useDispatch.mockReturnValue(dispatch);
    customRender(<ProductPrice product={FAKE_PRODUCT} />);
    expect(screen.getByText(TestReg.AddCartBtn)).toBeInTheDocument();
    expect(screen.getByText(TestReg.Price)).toBeInTheDocument();
    expect(screen.getByText(`${FAKE_PRODUCT.price} ₽`)).toBeInTheDocument();
    userEvent.click(screen.getByText(TestReg.AddCartBtn));
    expect(dispatch).toBeCalledWith({ payload: FAKE_PRODUCT, type: addTempItemCart.type });
    expect(dispatch).toBeCalledWith({ payload: true, type: toggleIsCartAddOpen.type });
    expect(dispatch).toBeCalledTimes(2);
  });
});
