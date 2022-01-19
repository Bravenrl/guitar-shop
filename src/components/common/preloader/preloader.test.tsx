import { screen } from '@testing-library/react';
import { TestReg } from '../../../const-test';
import { customRender } from '../../../render-test';

import Preloader from './preloader';


describe('Component: Preloader', () => {
  it('should render correctly', () => {
    customRender(<Preloader/>);
    expect(screen.getByAltText(TestReg.Preloader)).toBeInTheDocument();
  });
});
