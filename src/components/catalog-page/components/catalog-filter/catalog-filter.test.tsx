import CatalogFilter from './catalog-filter';
import { screen} from '@testing-library/react';
import { TestReg } from '../../../../const-test';
import { customRenderWithProvider } from '../../../../render-test';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { MockDATA, MockUSER } from '../../../../mock/mockStore';

const mockStore = configureMockStore();
const componentState = {
  DATA: MockDATA,
  USER: MockUSER,
};
const store = mockStore(componentState);

describe('Component: CatalogFilter', () => {
  it('should render correctly', () => {
    customRenderWithProvider(<CatalogFilter/>, store);
    expect(screen.getByText(TestReg.FilterTitle)).toBeInTheDocument();
    expect(screen.getByText(TestReg.PriceTitle)).toBeInTheDocument();
    expect(screen.getByText(TestReg.TypeTitle)).toBeInTheDocument();
    expect(screen.getByText(TestReg.StringTitle)).toBeInTheDocument();
  });
});
