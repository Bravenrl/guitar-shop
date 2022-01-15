import { configureMockStore } from '@jedmao/redux-mock-store';
import { cleanup, screen } from '@testing-library/react';
import { TestID, TestReg } from '../../../../const-test';
import { MockDATA, MockUSER } from '../../../../mock/mockStore';
import * as Redux from 'react-redux';
import { fetchFilteredProducts } from '../../../../store/api-actions';
import { customRenderWithProvider } from '../../../../render-test';
import StringFilter from './string-filter';
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


describe('Component: StringFilter', () => {
  afterEach(cleanup);
  it('should render correctly with all unchecked', () => {
    const store = mockStore(componentState);
    customRenderWithProvider(<StringFilter />, store);
    expect(screen.getByTestId(TestID.Four)).not.toHaveAttribute('checked');
    expect(screen.getByTestId(TestID.Six)).not.toHaveAttribute('checked');
    expect(screen.getByTestId(TestID.Seven)).not.toHaveAttribute('checked');
    expect(screen.getByTestId(TestID.Twelve)).not.toHaveAttribute('checked');
    expect(screen.getByText(TestReg.StringFour)).toBeInTheDocument();
    expect(screen.getByText(TestReg.StringSix)).toBeInTheDocument();
    expect(screen.getByText(TestReg.StringSeven)).toBeInTheDocument();
    expect(screen.getByText(TestReg.StringTwelve)).toBeInTheDocument();
  });

  it('should render correctly with 4 & 6 checked and 12 disabled', () => {
    const store = mockStore(currentState);
    customRenderWithProvider(<StringFilter />, store);
    expect(screen.getByTestId(TestID.Four)).toHaveAttribute('checked');
    expect(screen.getByTestId(TestID.Six)).toHaveAttribute('checked');
    expect(screen.getByTestId(TestID.Twelve)).toHaveAttribute('disabled');
  });

  it('should dispatch correctly with stringCounts: [4]', () => {
    useDispatch.mockReturnValue(dispatch);
    const store = mockStore(currentState);
    customRenderWithProvider(<StringFilter />, store);
    expect(screen.getByTestId(TestID.Six)).toHaveAttribute('checked');
    userEvent.click(screen.getByTestId(TestID.Six));
    expect(fakeFetchFilteredProducts).toBeCalledWith({...filterCurrent, stringCounts: ['4']});
  });
});
