import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { HistoryRouter, Route, Routes } from 'react-router-dom';
import { AppRoute, Title } from '../../../const';
import { TestReg } from '../../../const-test';
import { CreateFakeProduct } from '../../../mock/fakeData';
import { MockDATA, MockUSER } from '../../../mock/mockStore';
import { customRenderWithProvider } from '../../../render-test';
import { Guitar } from '../../../types/data';
import FormSearch from './form-search';
import * as Redux from 'react-redux';
import { fetchProductsSearch } from '../../../store/api-actions';
import { clearProductsSearch } from '../../../store/app-data/slice-app-data';
import { Provider } from 'react-redux';
import {
  resetSearchKey,
  setSearchKey
} from '../../../store/app-user/slice-app-user';

const NAME_COUNT = 3;
const NAME = 'name';
const ID = 1;
const FIRST_ELEMENT = 0;

jest.mock('../../../store/app-user/slice-app-user');
jest.mock('../../../store/api-actions');
jest.mock('../../../store/app-data/slice-app-data');
const fakeFetchProductsSearch = fetchProductsSearch as jest.MockedFunction<
  typeof fetchProductsSearch
>;
const fakeClearProductsSearch = clearProductsSearch as jest.MockedFunction<
  typeof clearProductsSearch
>;
const fakeSetSearchKey = setSearchKey as jest.MockedFunction<
  typeof setSearchKey
>;
const fakeResetSearchKey = resetSearchKey as jest.MockedFunction<
  typeof resetSearchKey
>;

const history = createMemoryHistory();
const dispatch = jest.fn();
const useDispatch = jest.spyOn(Redux, 'useDispatch');

const mockStore = configureMockStore();

const productsWithFirstName = new Array(NAME_COUNT)
  .fill(null)
  .map((product, index) => {
    product = CreateFakeProduct();
    product.name = NAME;
    product.id = index + ID;
    return product;
  }) as Guitar[];

const componentState = {
  DATA: MockDATA,
  USER: MockUSER,
};
const KEY = 'key';

describe('Component: FormSearch', () => {
  it('should render correctly', () => {
    useDispatch.mockReturnValue(dispatch);
    const store = mockStore(componentState);
    customRenderWithProvider(<FormSearch />, store);
    expect(screen.getByPlaceholderText(TestReg.SearchPlaceholder)).toBeInTheDocument();
    expect(screen.getByLabelText(TestReg.SearchLabel)).toBeInTheDocument();
    expect(screen.getByRole('list', { hidden: true })).toBeInTheDocument();
  });

  it('should render correctly when get productsSearch', () => {
    useDispatch.mockReturnValue(dispatch);
    const store = mockStore({
      ...componentState,
      DATA: { MockDATA, productsSearch: [...productsWithFirstName] },
      USER: { MockUSER, searchKey: NAME },
    });
    customRenderWithProvider(<FormSearch />, store);
    expect(screen.getByLabelText(TestReg.SearchLabel)).toBeInTheDocument();
    expect(screen.getByRole('list', { hidden: false })).toBeInTheDocument();
    expect(screen.getAllByText(NAME).length).toEqual(NAME_COUNT);
  });

  it('should dispatch setSearchKey correctly', () => {
    useDispatch.mockReturnValue(dispatch);
    const store = mockStore(componentState);
    customRenderWithProvider(<FormSearch />, store);
    userEvent.type(screen.getByRole('textbox'), 'a');
    userEvent.type(screen.getByRole('textbox'), 'b');
    expect(fakeClearProductsSearch).not.toBeCalled();
    userEvent.type(screen.getByRole('textbox'), '');
    expect(fakeSetSearchKey).toBeCalledTimes(2);
  });

  it('should dispatch fetchProductsSearch correctly', () => {
    useDispatch.mockReturnValue(dispatch);
    const store = mockStore({
      ...componentState,
      USER: { MockUSER, searchKey: KEY },
    });
    customRenderWithProvider(<FormSearch />, store);
    expect(fakeFetchProductsSearch).toBeCalledTimes(1);
  });

  it('should redirect when user clicked on links', () => {
    useDispatch.mockReturnValue(dispatch);
    const store = mockStore({
      ...componentState,
      DATA: { MockDATA, productsSearch: [...productsWithFirstName] },
      USER: { MockUSER, searchKey: NAME },
    });
    history.push(`/${AppRoute.Main}`);
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route path={AppRoute.Main} element={<FormSearch />} />
            <Route path={`/product/${ID}`} element={<h1>{Title.Product}</h1>} />
          </Routes>
        </HistoryRouter>
      </Provider>);

    expect(screen.queryByAltText(Title.Product)).not.toBeInTheDocument();
    userEvent.click(screen.getAllByText(NAME)[FIRST_ELEMENT]);
    expect(screen.getByText(Title.Product)).toBeInTheDocument();
    expect(fakeResetSearchKey).toBeCalled();
  });
});
