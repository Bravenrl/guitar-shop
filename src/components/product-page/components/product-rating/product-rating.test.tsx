import { configureMockStore } from '@jedmao/redux-mock-store';
import { screen } from '@testing-library/react';
import { TestID, TestReg } from '../../../../const-test';
import { fakeComments } from '../../../../mock/fakeData';
import { MockDATA, MockUSER } from '../../../../mock/mockStore';
import { customRenderWithProvider } from '../../../../render-test';
import ProductRating from './product-rating';

const mockStore = configureMockStore();
const componentState = {
  DATA: {...MockDATA, currentComments: fakeComments},
  USER: MockUSER,
};
const store = mockStore(componentState);
const RATING = 5;

describe('Component: ProductRating', () => {
  it('should render correctly', () => {
    customRenderWithProvider(<ProductRating rating={RATING}/>, store);
    expect(screen.getByText(TestReg.Rating)).toBeInTheDocument();
    expect(screen.getByText(`${fakeComments.length}`)).toBeInTheDocument();
    expect(screen.getAllByTestId(TestID.FullStar).length).toEqual(RATING);
  });
});
