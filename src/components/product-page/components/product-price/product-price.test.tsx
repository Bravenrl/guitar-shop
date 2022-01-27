import { TestReg } from '../../../../const-test';
import { customRender } from '../../../../render-test';
import { screen } from '@testing-library/react';
import ProductPrice from './product-price';

const PRICE = 100;

describe('Component: ProductPrice', () => {
  it('should render & correctly', () => {
    customRender(<ProductPrice price = {PRICE}/>);
    expect(screen.getByText(TestReg.AddCartBtn)).toBeInTheDocument();
    expect(screen.getByText(TestReg.Price)).toBeInTheDocument();
    expect(screen.getByText(`${PRICE} ₽`)).toBeInTheDocument();
  });
});
