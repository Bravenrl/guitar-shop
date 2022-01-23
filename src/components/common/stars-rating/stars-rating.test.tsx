import { screen } from '@testing-library/react';
import { StarsSize } from '../../../const';
import { TestID } from '../../../const-test';
import { customRender } from '../../../render-test';
import StarsRating from './stars-rating';

const RATING = 4;


describe('Component: StarsRating', () => {
  it('should render correctly', () => {
    customRender(<StarsRating rating={RATING} size = {StarsSize.ProductInfo}/>);
    expect(screen.getAllByTestId(TestID.FullStar).length).toEqual(RATING);
    expect(screen.getAllByTestId(TestID.Star).length).toEqual(1);
  });
});
