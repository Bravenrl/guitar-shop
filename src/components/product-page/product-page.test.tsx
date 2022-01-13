import { screen } from '@testing-library/react';
import { Title } from '../../const';
import { customRender } from '../../render-test';
import ProductPage from './product-page';


describe('Component: ProductPage', () => {
  it('should render correctly', () => {
    customRender(<ProductPage />);
    expect(screen.getByText(Title.Product)).toBeInTheDocument();
  });
});
