import { configureMockStore } from '@jedmao/redux-mock-store';
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { HistoryRouter, Route, Routes } from 'react-router-dom';
import { AppRoute, PAGE_COUNT } from '../../../../const';
import { TestID, TestReg } from '../../../../const-test';
import { MockDATA, MockUSER } from '../../../../mock/mockStore';
import Pagination from './pagination';
import * as Redux from 'react-redux';
import { fetchOnPageProducts } from '../../../../store/api-actions';

const COUNT = 54;

jest.mock('../../../../store/api-actions');
const fakeFetchOnPageProducts = fetchOnPageProducts as jest.MockedFunction<typeof fetchOnPageProducts>;
const dispatch = jest.fn();
const useDispatch = jest.spyOn(Redux, 'useDispatch');

const prevPage = (page: number) => (page - 1).toString();
const nextPage = (page: number) => (page + 1).toString();
const mockStore = configureMockStore();
const history = createMemoryHistory();

const componentState = {
  DATA: { ...MockDATA, productsCount: COUNT },
  USER: MockUSER,
};
const store = mockStore(componentState);

const renderPagination = (page: number) =>
  render(
    <Provider store={store}>
      <HistoryRouter history={history}>
        <Routes>
          <Route
            path={AppRoute.Root}
          />
          <Route
            path={`/${AppRoute.Catalog}`}
            element={<Pagination page={page} />}
          />
        </Routes>
      </HistoryRouter>
    </Provider>);

describe('Component: Pagination', () => {
  afterEach(cleanup);
  it('should render correctly with Далее & Назад', () => {
    const fifthPage = 5;
    act(() => {
      history.replace(`/catalog/page_${fifthPage}`);
    });
    renderPagination(fifthPage);
    expect(screen.getAllByTestId(TestID.Pagination).length).toEqual(PAGE_COUNT);
    expect(screen.getByText(fifthPage.toString())).toBeInTheDocument();
    expect(screen.getByText(prevPage(fifthPage))).toBeInTheDocument();
    expect(screen.getByText(nextPage(fifthPage))).toBeInTheDocument();
    expect(screen.getByText(TestReg.NextPage)).toBeInTheDocument();
    expect(screen.getByText(TestReg.PrevPage)).toBeInTheDocument();
    expect(screen.getByTestId(TestID.Back)).toBeVisible();
    expect(screen.getByTestId(TestID.Next)).toBeVisible();
  });

  it('should render correctly with Далее witout Назад', () => {
    const firstPage = 1;
    act(() => {
      history.replace(`/catalog/page_${firstPage}`);
    });
    renderPagination(firstPage);
    expect(screen.getAllByTestId(TestID.Pagination).length).toEqual(PAGE_COUNT);
    expect(screen.getByText(firstPage.toString())).toBeInTheDocument();
    expect(screen.getByText(nextPage(firstPage))).toBeInTheDocument();
    expect(screen.getByText(nextPage(firstPage+1))).toBeInTheDocument();
    expect(screen.getByText(TestReg.NextPage)).toBeInTheDocument();
    expect(screen.getByTestId(TestID.Back)).not.toBeVisible();
    expect(screen.getByTestId(TestID.Next)).toBeVisible();
  });


  it('should render correctly with Назад witout Далее', () => {
    const lastPage = 6;
    act(() => {
      history.replace(`/catalog/page_${lastPage}`);
    });
    renderPagination(lastPage);
    expect(screen.getAllByTestId(TestID.Pagination).length).toEqual(PAGE_COUNT);
    expect(screen.getByText(lastPage.toString())).toBeInTheDocument();
    expect(screen.getByText(prevPage(lastPage))).toBeInTheDocument();
    expect(screen.getByText(prevPage(lastPage-1))).toBeInTheDocument();
    expect(screen.getByText(TestReg.NextPage)).toBeInTheDocument();
    expect(screen.getByTestId(TestID.Back)).toBeVisible();
    expect(screen.getByTestId(TestID.Next)).not.toBeVisible();
  });

  it('should redirect correctly when click on links', () => {
    useDispatch.mockReturnValue(dispatch);
    const fifthPage = 5;
    act(() => {
      history.push(`/catalog/page_${fifthPage}`);
    });
    renderPagination(fifthPage);
    expect(screen.getByText(TestReg.PrevPage)).toBeInTheDocument();
    fireEvent.click(screen.getByText(TestReg.PrevPage));
    expect(history.location.pathname).toEqual(`/catalog/page_${prevPage(fifthPage)}`);
    expect(fakeFetchOnPageProducts).toBeCalledWith(Number(prevPage(fifthPage)));
    act(() => {
      history.push(`/catalog/page_${fifthPage}`);
    });
    expect(screen.getByText(TestReg.PrevPage)).toBeInTheDocument();
    fireEvent.click(screen.getByText(TestReg.NextPage));
    expect(history.location.pathname).toEqual(`/catalog/page_${nextPage(fifthPage)}`);
    expect(fakeFetchOnPageProducts).toBeCalledWith(Number(nextPage(fifthPage)));
    act(() => {
      history.push(`/catalog/page_${fifthPage}`);
    });
    fireEvent.click(screen.getByText(prevPage(fifthPage)));
    expect(history.location.pathname).toEqual(`/catalog/page_${prevPage(fifthPage)}`);
    expect(fakeFetchOnPageProducts).toBeCalledWith(Number(prevPage(fifthPage)));
    act(() => {
      history.push(`/catalog/page_${fifthPage}`);
    });
    fireEvent.click(screen.getByText(nextPage(fifthPage)));
    expect(history.location.pathname).toEqual(`/catalog/page_${nextPage(fifthPage)}`);
    expect(fakeFetchOnPageProducts).toBeCalledWith(Number(nextPage(fifthPage)));
  });
});
