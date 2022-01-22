import { configureMockStore } from '@jedmao/redux-mock-store';
import { Action } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import { State } from '../types/state';
import { ApiRoute, HEADER_TOTAL_COUNT, HttpCode } from '../services/const';
import { fakeProduct, fakeProducts } from '../mock/fakeData';
import { addCurrentProduct, addPriceEnd, addPriceStart, addProductsCount, addProductsSearch, addProductsShow, clearProductsCount, toggleIsLoading } from './app-data/slice-app-data';
import { api } from '../services/api';
import { setFilter, setSort } from './app-user/slice-app-user';
import { MockUSER} from '../mock/mockStore';
import { fetchCurrentProduct, fetchFilteredProducts, fetchOnPageProducts, fetchProductsPrice, fetchProductsPriceMax, fetchProductsSearch, fetchSortedProducts } from './api-actions';
import { createQuery } from '../utils';
import { AppRoute, FIRST_PRODUCT } from '../const';
import { redirectToRoute } from './middlewares/middleware-action';
import { Guitar } from '../types/data';

jest.mock('../utils');
const createFakeQuery = createQuery as jest.MockedFunction<typeof createQuery>;
describe('Async actions', () => {

  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];
  const mockStore = configureMockStore<
    State,
    Action,
    ThunkDispatch<State, typeof api, Action>
  >(middlewares);

  const PRODUCT_KEY = 'key';
  const FAKE_QUERY = '?name=СURT&type=electric';
  const FAKE_COUNT = 20;
  const FAKE_PAGE = 1;
  const FAKE_NEW_PAGE = 5;
  const EMPTY_DATA = [] as Guitar[];
  const FAKE_SEARCH_QUERY = true;
  const FAKE_ID = '1';

  it('should dispatch addProductsSearch with fakeProductsSearch when GET /name_like & HttpCode.OK', async () => {
    mockAPI
      .onGet(`${ApiRoute.Products}?name_like=${PRODUCT_KEY}`)
      .reply(HttpCode.OK, fakeProducts);
    const store = mockStore({USER: {...MockUSER, searchKey:PRODUCT_KEY}});
    await store.dispatch(fetchProductsSearch(PRODUCT_KEY));
    expect(store.getActions()).toEqual([
      { payload: fakeProducts, type: addProductsSearch.type },
    ]);
  });

  it('shouldnt dispatch addProductsSearch GET /name_like & HttpCode.OK but searchKey already is empty', async () => {
    mockAPI
      .onGet(`${ApiRoute.Products}?name_like=${PRODUCT_KEY}`)
      .reply(HttpCode.OK, fakeProducts);
    const store = mockStore({USER: {...MockUSER, searchKey:''}});
    await store.dispatch(fetchProductsSearch(PRODUCT_KEY));
    expect(store.getActions()).toEqual([]);
  });

  it('should dispatch addProductsCount, addProductsShow, setFilter and redirect to first page when GET filter & HttpCode.OK', async () => {
    mockAPI
      .onGet(`${ApiRoute.Products}${FAKE_QUERY}`)
      .reply(HttpCode.OK, fakeProducts, {[HEADER_TOTAL_COUNT]:FAKE_COUNT});
    const store = mockStore({USER: MockUSER});
    createFakeQuery.mockReturnValue(FAKE_QUERY);
    await
    store.dispatch(fetchFilteredProducts(MockUSER.filter, FAKE_NEW_PAGE));
    expect(store.getActions()).toEqual([
      toggleIsLoading(true),
      clearProductsCount(),
      redirectToRoute(AppRoute.Main),
      { payload: FAKE_COUNT, type: addProductsCount.type },
      { payload: fakeProducts, type: addProductsShow.type },
      { payload: MockUSER.filter, type: setFilter.type },
      toggleIsLoading(false),
    ]);
    expect(createFakeQuery).toBeCalled();
  });

  it('should not redirect to first page when GET filter with page & HttpCode.OK', async () => {
    mockAPI
      .onGet(`${ApiRoute.Products}${FAKE_QUERY}`)
      .reply(HttpCode.OK, fakeProducts, {[HEADER_TOTAL_COUNT]:FAKE_COUNT});
    const store = mockStore({USER: MockUSER});
    createFakeQuery.mockReturnValue(FAKE_QUERY);
    await
    store.dispatch(fetchFilteredProducts(MockUSER.filter, FAKE_PAGE));
    expect(store.getActions()).toEqual([
      toggleIsLoading(true),
      clearProductsCount(),
      { payload: FAKE_COUNT, type: addProductsCount.type },
      { payload: fakeProducts, type: addProductsShow.type },
      { payload: MockUSER.filter, type: setFilter.type },
      toggleIsLoading(false),
    ]);
    expect(createFakeQuery).toBeCalled();
  });

  it('should redirect to not found page when GET filter & data: empty [] & firstQuery', async () => {
    mockAPI
      .onGet(`${ApiRoute.Products}${FAKE_QUERY}`)
      .reply(HttpCode.OK, EMPTY_DATA, {[HEADER_TOTAL_COUNT]:FAKE_COUNT});
    const store = mockStore({USER: MockUSER});
    createFakeQuery.mockReturnValue(FAKE_QUERY);
    await
    store.dispatch(fetchFilteredProducts(MockUSER.filter, FAKE_NEW_PAGE, FAKE_SEARCH_QUERY));
    expect(store.getActions()).toEqual([
      toggleIsLoading(true),
      clearProductsCount(),
      redirectToRoute(AppRoute.NotFoundPage),
      toggleIsLoading(false),
    ]);
  });

  it('should dispatch addProductsShow, setSort when GET sort & HttpCode.OK', async () => {
    mockAPI
      .onGet(`${ApiRoute.Products}${FAKE_QUERY}`)
      .reply(HttpCode.OK, fakeProducts);
    const store = mockStore({USER: MockUSER});
    createFakeQuery.mockReturnValue(FAKE_QUERY);
    await
    store.dispatch(fetchSortedProducts(FAKE_PAGE, MockUSER.sort));
    expect(store.getActions()).toEqual([
      toggleIsLoading(true),
      addProductsShow(fakeProducts),
      setSort(MockUSER.sort),
      toggleIsLoading(false),
    ]);
    expect(createFakeQuery).toBeCalled();
  });

  it('should dispatch addProductsShow when GET page & HttpCode.OK', async () => {
    mockAPI
      .onGet(`${ApiRoute.Products}${FAKE_QUERY}`)
      .reply(HttpCode.OK, fakeProducts);
    const store = mockStore({USER: MockUSER});
    createFakeQuery.mockReturnValue(FAKE_QUERY);
    await
    store.dispatch(fetchOnPageProducts(FAKE_PAGE));
    expect(store.getActions()).toEqual([
      toggleIsLoading(true),
      addProductsShow(fakeProducts),
      toggleIsLoading(false),
    ]);
    expect(createFakeQuery).toBeCalled();
  });

  it('should dispatch addPriceEnd when GET price max & HttpCode.OK', async () => {
    mockAPI
      .onGet(`${ApiRoute.Products}?_sort=price&_start=${
        FAKE_COUNT - 1
      }&_end=${FAKE_COUNT}`)
      .reply(HttpCode.OK, fakeProducts);
    const store = mockStore();
    await
    store.dispatch(fetchProductsPriceMax(FAKE_COUNT));
    expect(store.getActions()).toEqual([
      addPriceEnd(fakeProducts[FIRST_PRODUCT].price),
    ]);
  });

  it('should dispatch addPriceStart when GET price & HttpCode.OK', async () => {
    mockAPI
      .onGet(`${ApiRoute.Products}?_sort=price&_start=${
        FIRST_PRODUCT}&_end=${FIRST_PRODUCT+1}`)
      .reply(HttpCode.OK, fakeProducts, {[HEADER_TOTAL_COUNT]:FAKE_COUNT});
    const store = mockStore();
    await
    store.dispatch(fetchProductsPrice());
    expect(store.getActions()).toEqual([
      toggleIsLoading(true),
      addPriceStart(fakeProducts[FIRST_PRODUCT].price),
      toggleIsLoading(false),
    ]);
  });

  it('should dispatch addCurrentProduct with fakeProduct when GET ?_embed=comments & HttpCode.OK', async () => {
    mockAPI
      .onGet(`${ApiRoute.Products}/${FAKE_ID}?_embed=comments`)
      .reply(HttpCode.OK, fakeProduct);
    const store = mockStore();
    await store.dispatch(fetchCurrentProduct(FAKE_ID));
    expect(store.getActions()).toEqual([
      { payload: fakeProduct, type: addCurrentProduct.type },
    ]);
  });
});
