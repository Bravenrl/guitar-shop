import { screen } from '@testing-library/react';
import { TestReg } from '../../../const-test';
import { customRender } from '../../../render-test';
import NoProduct from './no-product';

describe('Component: Preloader', () => {
  it('should render correctly', () => {
    customRender(<NoProduct/>);
    expect(screen.getByText(TestReg.NoProduct)).toBeInTheDocument();
  });
});
