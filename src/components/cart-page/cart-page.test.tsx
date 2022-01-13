import { screen } from '@testing-library/react';
import { Title } from '../../const';
import { customRender } from '../../render-test';
import CartPage from './cart-page';


describe('Component: CartPage', () => {
  it('should render correctly', () => {
    customRender(<CartPage />);
    expect(screen.getByText(Title.Cart)).toBeInTheDocument();
  });
});
