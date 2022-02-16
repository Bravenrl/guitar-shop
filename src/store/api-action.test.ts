import { configureMockStore } from '@jedmao/redux-mock-store';
import { Action } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import { State } from '../types/state';
import { ApiRoute, HEADER_TOTAL_COUNT, HttpCode } from '../services/const';
import {
  CreateFakeComment,
  CreateFakeGuitar,
  fakeComments,
  fakeGuitars,
  fakeProducts
} from '../mock/fakeData';
import {
  addCurrentComments,
  addCurrentProduct,
  addNewComment,
  addPriceEnd,
  addPriceStart,
  addProductsCount,
  addProductsInCart,
  addProductsSearch,
  addProductsShow,
  clearProductsCount,
  clearProductsInCart,
  toggleIsLoading
} from './app-data/slice-app-data';
import { api } from '../services/api';
import {
  addCoupon,
  clearCart,
  clearCoupon,
  setFilter,
  setSort
} from './app-user/slice-app-user';
import { MockUSER } from '../mock/mockStore';
import {
  fetchCartProducts,
  fetchCurrentProduct,
  fetchFilteredProducts,
  fetchOnPageProducts,
  fetchProductsPrice,
  fetchProductsPriceMax,
  fetchProductsSearch,
  fetchSortedProducts,
  postComment,
  postCoupon,
  postOrder
} from './api-actions';
import { createQuery } from '../utils';
import { AppRoute, CouponError, FIRST_PRODUCT } from '../const';
import { redirectToRoute } from './middlewares/middleware-action';
import { Guitar, Order } from '../types/data';
import {
  toggleIsReviewOpen,
  toggleIsSuccessOpen
} from './app-process/slice-app-process';
import { toast } from 'react-toastify';

const spyToastWarning = jest.spyOn(toast, 'warning');
jest.mock('../utils');
const createFakeQuery = createQuery as jest.MockedFunction<typeof createQuery>;

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
const FAKE_PRODUCT_INFO = CreateFakeGuitar();
const FAKE_COMMENTS = fakeComments;
const FAKE_PRODUCT = { ...FAKE_PRODUCT_INFO, comments: FAKE_COMMENTS };
const FAKE_COMMENT = CreateFakeComment();
const FAKE_VALUE = 'coupon';
const FAKE_DISCOUNT = 50;
const FAKE_ORDER: Order = {
  guitarsIds: [1, 1],
  coupon: FAKE_VALUE,
};

const NewComment = {
  guitarId: 1,
  userName: 'user',
  advantage: 'advantage',
  disadvantage: 'disadvantage',
  comment: 'comment',
  rating: 7,
};
describe('Async actions', () => {
  it('should dispatch addProductsSearch with fakeProductsSearch when GET /name_like & HttpCode.OK', async () => {
    mockAPI
      .onGet(`${ApiRoute.Products}?name_like=${PRODUCT_KEY}`)
      .reply(HttpCode.OK, fakeGuitars);
    const store = mockStore({ USER: { ...MockUSER, searchKey: PRODUCT_KEY } });
    await store.dispatch(fetchProductsSearch(PRODUCT_KEY));
    expect(store.getActions()).toEqual([
      { payload: fakeGuitars, type: addProductsSearch.type },
    ]);
  });

  it('shouldnt dispatch addProductsSearch GET /name_like & HttpCode.OK but searchKey already is empty', async () => {
    mockAPI
      .onGet(`${ApiRoute.Products}?name_like=${PRODUCT_KEY}`)
      .reply(HttpCode.OK, fakeGuitars);
    const store = mockStore({ USER: { ...MockUSER, searchKey: '' } });
    await store.dispatch(fetchProductsSearch(PRODUCT_KEY));
    expect(store.getActions()).toEqual([]);
  });

  it('should dispatch addProductsCount, addProductsShow, setFilter and redirect to first page when GET filter & HttpCode.OK', async () => {
    mockAPI
      .onGet(`${ApiRoute.Products}${FAKE_QUERY}`)
      .reply(HttpCode.OK, fakeProducts, { [HEADER_TOTAL_COUNT]: FAKE_COUNT });
    const store = mockStore({ USER: MockUSER });
    createFakeQuery.mockReturnValue(FAKE_QUERY);
    await store.dispatch(fetchFilteredProducts(MockUSER.filter, FAKE_NEW_PAGE));
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
      .reply(HttpCode.OK, fakeProducts, { [HEADER_TOTAL_COUNT]: FAKE_COUNT });
    const store = mockStore({ USER: MockUSER });
    createFakeQuery.mockReturnValue(FAKE_QUERY);
    await store.dispatch(fetchFilteredProducts(MockUSER.filter, FAKE_PAGE));
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
      .reply(HttpCode.OK, EMPTY_DATA, { [HEADER_TOTAL_COUNT]: FAKE_COUNT });
    const store = mockStore({ USER: MockUSER });
    createFakeQuery.mockReturnValue(FAKE_QUERY);
    await store.dispatch(
      fetchFilteredProducts(MockUSER.filter, FAKE_NEW_PAGE, FAKE_SEARCH_QUERY),
    );
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
    const store = mockStore({ USER: MockUSER });
    createFakeQuery.mockReturnValue(FAKE_QUERY);
    await store.dispatch(fetchSortedProducts(FAKE_PAGE, MockUSER.sort));
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
    const store = mockStore({ USER: MockUSER });
    createFakeQuery.mockReturnValue(FAKE_QUERY);
    await store.dispatch(fetchOnPageProducts(FAKE_PAGE));
    expect(store.getActions()).toEqual([
      toggleIsLoading(true),
      addProductsShow(fakeProducts),
      toggleIsLoading(false),
    ]);
    expect(createFakeQuery).toBeCalled();
  });

  it('should dispatch addPriceEnd when GET price max & HttpCode.OK', async () => {
    mockAPI
      .onGet(
        `${ApiRoute.Products}?_sort=price&_start=${
          FAKE_COUNT - 1
        }&_end=${FAKE_COUNT}`,
      )
      .reply(HttpCode.OK, fakeGuitars);
    const store = mockStore();
    await store.dispatch(fetchProductsPriceMax(FAKE_COUNT));
    expect(store.getActions()).toEqual([
      addPriceEnd(fakeGuitars[FIRST_PRODUCT].price),
    ]);
  });

  it('should dispatch addPriceStart when GET price & HttpCode.OK', async () => {
    mockAPI
      .onGet(
        `${ApiRoute.Products}?_sort=price&_start=${FIRST_PRODUCT}&_end=${
          FIRST_PRODUCT + 1
        }`,
      )
      .reply(HttpCode.OK, fakeGuitars, { [HEADER_TOTAL_COUNT]: FAKE_COUNT });
    const store = mockStore();
    await store.dispatch(fetchProductsPrice());
    expect(store.getActions()).toEqual([
      toggleIsLoading(true),
      addPriceStart(fakeGuitars[FIRST_PRODUCT].price),
      toggleIsLoading(false),
    ]);
  });

  it('should dispatch addCurrentProduct, addCurrentComments with fakeProduct when GET ?_embed=comments & HttpCode.OK', async () => {
    mockAPI
      .onGet(`${ApiRoute.Products}/${FAKE_ID}?_embed=comments`)
      .reply(HttpCode.OK, FAKE_PRODUCT);
    const store = mockStore();
    await store.dispatch(fetchCurrentProduct(FAKE_ID));
    expect(store.getActions()).toEqual([
      { payload: FAKE_PRODUCT_INFO, type: addCurrentProduct.type },
      { payload: FAKE_COMMENTS, type: addCurrentComments.type },
    ]);
  });
  it('should dispatch toggleIsReviewOpen, toggleIsSuccessOpen, addNewComment with FAKE_COMMENT when POST /comments & HttpCode.OK', async () => {
    mockAPI.onPost(ApiRoute.Comments).reply(HttpCode.OK, FAKE_COMMENT);
    const store = mockStore();
    await store.dispatch(postComment(NewComment));
    expect(store.getActions()).toEqual([
      { payload: FAKE_COMMENT, type: addNewComment.type },
      { payload: false, type: toggleIsReviewOpen.type },
      { payload: true, type: toggleIsSuccessOpen.type },
    ]);
  });

  it('should call toast if POST /comments & HttpCode.BadRequest', async () => {
    mockAPI.onPost(ApiRoute.Comments).reply(HttpCode.BadRequest, FAKE_COMMENT);
    const store = mockStore();
    await store.dispatch(postComment(NewComment));
    expect(store.getActions()).toEqual([]);
    expect(spyToastWarning).toBeCalled();
  });

  it('should redirect to 404 page when GET ?_embed=comments & HttpCode.NotFound', async () => {
    mockAPI
      .onGet(`${ApiRoute.Products}/${FAKE_ID}?_embed=comments`)
      .reply(HttpCode.NotFound);
    const store = mockStore();
    await store.dispatch(fetchCurrentProduct(FAKE_ID));
    expect(store.getActions()).toEqual([
      redirectToRoute(AppRoute.NotFoundPage),
    ]);
  });

  it('should dispatch addProductsInCart when GET page & HttpCode.OK', async () => {
    mockAPI
      .onGet(`${ApiRoute.Products}/1`)
      .reply(HttpCode.OK, FAKE_PRODUCT_INFO)
      .onGet(`${ApiRoute.Products}/2`)
      .reply(HttpCode.OK, FAKE_PRODUCT_INFO)
      .onGet(`${ApiRoute.Products}/3`)
      .reply(HttpCode.OK, FAKE_PRODUCT_INFO);
    const store = mockStore();
    await store.dispatch(fetchCartProducts(['1', '2', '3']));
    expect(store.getActions()).toEqual([
      toggleIsLoading(true),
      addProductsInCart([
        FAKE_PRODUCT_INFO,
        FAKE_PRODUCT_INFO,
        FAKE_PRODUCT_INFO,
      ]),
      toggleIsLoading(false),
    ]);
  });

  it('should dispatch addCoupon with {FAKE_COMMENT when POST /coupons & HttpCode.OK', async () => {
    mockAPI.onPost(ApiRoute.Coupons).reply(HttpCode.OK, FAKE_DISCOUNT);
    const store = mockStore();
    await store.dispatch(postCoupon(FAKE_VALUE));
    expect(store.getActions()).toEqual([
      {
        payload: { value: FAKE_VALUE, discount: FAKE_DISCOUNT },
        type: addCoupon.type,
      },
    ]);
  });

  it('should dispatch addCoupon with CouponError when POST /coupons & HttpCode.BadRequest', async () => {
    mockAPI.onPost(ApiRoute.Coupons).reply(HttpCode.BadRequest);
    const store = mockStore();
    await store.dispatch(postCoupon(FAKE_VALUE));
    expect(store.getActions()).toEqual([
      { payload: CouponError, type: addCoupon.type },
    ]);
  });

  it('should dispatch clearCoupon, clearCart, clearProductsInCart when POST /orders & HttpCode.OK', async () => {
    mockAPI.onPost(ApiRoute.Orders).reply(HttpCode.OK);
    const store = mockStore();
    await store.dispatch(postOrder(FAKE_ORDER));
    expect(store.getActions()).toEqual([
      { type: clearProductsInCart.type },
      { type: clearCoupon.type },
      { type: clearCart.type },
    ]);
  });
});
