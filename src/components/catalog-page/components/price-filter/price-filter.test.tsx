import { configureMockStore } from '@jedmao/redux-mock-store';
import { cleanup, fireEvent, screen } from '@testing-library/react';
import { TestID } from '../../../../const-test';
import { MockDATA, MockUSER } from '../../../../mock/mockStore';
import * as Redux from 'react-redux';
import { fetchFilteredProducts } from '../../../../store/api-actions';
import { customRenderWithProvider } from '../../../../render-test';
import PriceFilter from './price-filter';
import userEvent from '@testing-library/user-event';

const USER_PRICE = '150';
const PRICE_MIN = '100';
const PRICE_MAX = '200';
const INPUTS_COUNT = 2;

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


describe('Component: PriceFilter', () => {
  afterEach(cleanup);
  it('should render correctly with value null in inputs & placeholders value 0', () => {
    const store = mockStore(componentState);
    customRenderWithProvider(<PriceFilter/>, store);
    expect(screen.getByTestId(TestID.PriceMin)).toHaveValue(null);
    expect(screen.getByTestId(TestID.PriceMax)).toHaveValue(null);
    expect(screen.getAllByPlaceholderText('0').length).toEqual(INPUTS_COUNT);
  });
  it('should render correctly with placeholders value PRICE_MIN, PRICE_MAX', () => {
    const store = mockStore({...componentState, DATA: {...MockDATA, priceStart: PRICE_MIN, priceEnd: PRICE_MAX}});
    customRenderWithProvider(<PriceFilter/>, store);
    expect(screen.getByPlaceholderText(`${PRICE_MIN}`)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(`${PRICE_MAX}`)).toBeInTheDocument();
  });
  it('should dispatch correctly & dispatch value !==0', () => {
    useDispatch.mockReturnValue(dispatch);
    const store = mockStore({...componentState, DATA: {...MockDATA, priceStart: PRICE_MIN, priceEnd: PRICE_MAX}});
    customRenderWithProvider(<PriceFilter/>, store);
    expect(screen.getByTestId(TestID.PriceMin)).toHaveValue(null);
    expect(screen.getByTestId(TestID.PriceMax)).toHaveValue(null);
    userEvent.type(screen.getByTestId(TestID.PriceMin), '0');
    fireEvent.focusOut(screen.getByTestId(TestID.PriceMin));
    expect(fakeFetchFilteredProducts).toBeCalledWith({...MockUSER.filter, priceMin: PRICE_MIN});
    userEvent.type(screen.getByTestId(TestID.PriceMax), '0');
    fireEvent.focusOut(screen.getByTestId(TestID.PriceMax));
    expect(fakeFetchFilteredProducts).toBeCalledWith({...MockUSER.filter, priceMax: PRICE_MAX});
  });

  it('should dispatch correctly when user type', () => {
    useDispatch.mockReturnValue(dispatch);
    const store = mockStore({...componentState, DATA: {...MockDATA, priceStart: PRICE_MIN, priceEnd: PRICE_MAX}});
    customRenderWithProvider(<PriceFilter/>, store);
    expect(screen.getByTestId(TestID.PriceMin)).toHaveValue(null);
    expect(screen.getByTestId(TestID.PriceMax)).toHaveValue(null);
    userEvent.type(screen.getByTestId(TestID.PriceMax), USER_PRICE);
    fireEvent.focusOut(screen.getByTestId(TestID.PriceMax));
    expect(fakeFetchFilteredProducts).toBeCalledWith({...MockUSER.filter, priceMax: USER_PRICE});
  });
});
