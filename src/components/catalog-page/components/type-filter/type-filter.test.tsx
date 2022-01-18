import { configureMockStore } from '@jedmao/redux-mock-store';
import { cleanup, screen } from '@testing-library/react';
import { TestID, TestReg } from '../../../../const-test';
import { MockDATA, MockUSER } from '../../../../mock/mockStore';
import * as Redux from 'react-redux';
import { fetchFilteredProducts } from '../../../../store/api-actions';
import { customRenderWithProvider } from '../../../../render-test';
import TypeFilter from './type-filter';
import userEvent from '@testing-library/user-event';

jest.mock('../../../../store/api-actions');
const fakeFetchFilteredProducts = fetchFilteredProducts as jest.MockedFunction<
  typeof fetchFilteredProducts
>;
const dispatch = jest.fn();
const useDispatch = jest.spyOn(Redux, 'useDispatch');

const mockStore = configureMockStore();

const componentState = {
  DATA: MockDATA,
  USER: MockUSER,
};

const filterCurrent = {
  productTypes: ['electric', 'ukulele'],
  stringCounts: ['4', '6'],
  priceMin: '',
  priceMax: '',
};

const currentState = {
  DATA: MockDATA,
  USER: {...MockUSER, filter: filterCurrent},
};

const FAKE_PAGE = 1;

describe('Component: TypeFilter', () => {
  afterEach(cleanup);
  it('should render correctly with all unchecked', () => {
    const store = mockStore(componentState);
    customRenderWithProvider(<TypeFilter page={FAKE_PAGE}/>, store);
    expect(screen.getByTestId(TestID.Acoustic)).not.toHaveAttribute('checked');
    expect(screen.getByTestId(TestID.Ukulele)).not.toHaveAttribute('checked');
    expect(screen.getByTestId(TestID.Electric)).not.toHaveAttribute('checked');
    expect(screen.getByText(TestReg.Acoustic)).toBeInTheDocument();
    expect(screen.getByText(TestReg.Electric)).toBeInTheDocument();
    expect(screen.getByText(TestReg.Ukulele)).toBeInTheDocument();
  });

  it('should render correctly with electric & ukulele checked', () => {
    const store = mockStore(currentState);
    customRenderWithProvider(<TypeFilter page={FAKE_PAGE} />, store);
    expect(screen.getByTestId(TestID.Acoustic)).not.toHaveAttribute('checked');
    expect(screen.getByTestId(TestID.Ukulele)).toHaveAttribute('checked');
    expect(screen.getByTestId(TestID.Electric)).toHaveAttribute('checked');
  });

  it('should dispatch correctly with stringCounts: [4] when only ukulele checked', () => {
    useDispatch.mockReturnValue(dispatch);
    const store = mockStore(currentState);
    customRenderWithProvider(<TypeFilter page={FAKE_PAGE} />, store);
    expect(screen.getByTestId(TestID.Electric)).toHaveAttribute('checked');
    userEvent.click(screen.getByTestId(TestID.Electric));
    expect(fakeFetchFilteredProducts).toBeCalledWith({...filterCurrent, productTypes:['ukulele'], stringCounts: ['4']}, FAKE_PAGE);
  });
});
