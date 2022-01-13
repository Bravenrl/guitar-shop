import { configureMockStore } from '@jedmao/redux-mock-store';
import { Action } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import { State } from '../types/state';
import { ApiRoute, HEADER_TOTAL_COUNT, HttpCode } from '../services/const';
import { fakeProducts } from '../mock/fakeData';
import { addPriceEnd, addPriceStart, addProductsCount, addProductsSearch, addProductsShow } from './app-data/slice-app-data';
import { api } from '../services/api';
import { setFilter, setSort } from './app-user/slice-app-user';
import { MockUSER} from '../mock/mockStore';
import { fetchFilteredProducts, fetchOnPageProducts, fetchProductsPrice, fetchProductsPriceMax, fetchProductsSearch, fetchSortedProducts } from './api-actions';
import { createQuery } from '../utils';
import { AppRoute, FIRST_PRODUCT } from '../const';
import { redirectToRoute } from './middlewares/middleware-action';

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

  it('should dispatch addProductsSearch when GET /name_like & HttpCode.OK', async () => {
    mockAPI
      .onGet(`${ApiRoute.Products}?name_like=${PRODUCT_KEY}`)
      .reply(HttpCode.OK, fakeProducts);
    const store = mockStore();
    await store.dispatch(fetchProductsSearch(PRODUCT_KEY));
    expect(store.getActions()).toEqual([
      { payload: fakeProducts, type: addProductsSearch.type },
    ]);
  });

  it('should dispatch addProductsCount, addProductsShow, setFilter and redirect to first page when GET filter & HttpCode.OK', async () => {
    mockAPI
      .onGet(`${ApiRoute.Products}${FAKE_QUERY}`)
      .reply(HttpCode.OK, fakeProducts, {[HEADER_TOTAL_COUNT]:FAKE_COUNT});
    const store = mockStore({USER: MockUSER});
    createFakeQuery.mockReturnValue(FAKE_QUERY);
    await
    store.dispatch(fetchFilteredProducts(MockUSER.filter));
    expect(store.getActions()).toEqual([
      redirectToRoute(AppRoute.Main),
      { payload: FAKE_COUNT, type: addProductsCount.type },
      { payload: fakeProducts, type: addProductsShow.type },
      { payload: MockUSER.filter, type: setFilter.type },
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
      { payload: FAKE_COUNT, type: addProductsCount.type },
      { payload: fakeProducts, type: addProductsShow.type },
      { payload: MockUSER.filter, type: setFilter.type },
    ]);
    expect(createFakeQuery).toBeCalled();
  });

  it('should redirect to not found page when GET filter & HttpCode.NotFound', async () => {
    mockAPI
      .onGet(`${ApiRoute.Products}${FAKE_QUERY}`)
      .reply(HttpCode.NotFound);
    const store = mockStore({USER: MockUSER});
    createFakeQuery.mockReturnValue(FAKE_QUERY);
    await
    store.dispatch(fetchFilteredProducts(MockUSER.filter));
    expect(store.getActions()).toEqual([
      redirectToRoute(AppRoute.Main),
      redirectToRoute(AppRoute.NotFoundPage),
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
      addProductsShow(fakeProducts),
      setSort(MockUSER.sort),
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
      addProductsShow(fakeProducts),
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
      addPriceStart(fakeProducts[FIRST_PRODUCT].price),
    ]);
  });
});


//   it('should dispatch postCommentAction when POST /comments', async () => {
//     mockAPI
//       .onPost(`${ApiRoute.Reviews}/${id}`)
//       .reply(HttpCode.OK, fakeReviews);
//     const store = mockStore();
//     fakeAdaptReviewToCient.mockReturnValue(fakeReview);
//     await store.dispatch(postCommentAction(fakeComment, `${id}`));
//     expect(store.getActions()).toEqual(
//       [toggleIsPosting(true), addComment(EmptyComment.comment),
//         addComentRating(EmptyComment.rating),
//         loadReviews(fakeReviews), toggleIsPosting(false)]);
//     expect(fakeAdaptReviewToCient).toBeCalledTimes(4);
//   });

//   it('should dispatch postFavoriteAction when POST /favorite', async () => {
//     mockAPI
//       .onPost(`${ApiRoute.Favorite}/${id}/${Status.add}`)
//       .reply(HttpCode.OK, fakeOffer);
//     const store = mockStore();
//     fakeAdaptOfferToCient.mockReturnValue(fakeOffer);
//     await store.dispatch(postFavoriteAction(Status.add, `${id}`));
//     expect(store.getActions()).toEqual(
//       [toggleIsPosting(true), changeIsFavorite(fakeOffer),
//         toggleIsFavorite(fakeOffer.isFavorite, fakeOffer.id), toggleIsPosting(false)]);
//     expect(fakeAdaptOfferToCient).toBeCalledTimes(1);
//   });

//   it('should dispatch loadFavoriteOffersAction when GET /favorite', async () => {
//     mockAPI
//       .onGet(ApiRoute.Favorite)
//       .reply(HttpCode.OK, fakeOffers);
//     const store = mockStore();
//     fakeAdaptOfferToCient.mockReturnValue(fakeOffer);
//     await store.dispatch(loadFavoriteOffersAction());
//     expect(store.getActions()).toEqual(
//       [toggleIsLoading(true), loadFavoriteOffers(fakeOffers), toggleIsLoading(false)]);
//     expect(fakeAdaptOfferToCient).toBeCalledTimes(4);
//   });

//   it('should dispatch checkAuthStatusAction when GET /login', async () => {
//     mockAPI
//       .onGet(ApiRoute.Login)
//       .reply(HttpCode.OK, fakeAuthInfo);
//     const store = mockStore();
//     Storage.prototype.setItem = jest.fn();
//     expect(store.getActions()).toEqual([]);
//     fakeAdaptAuthInfoToClient.mockReturnValue(fakeAuthInfo);
//     await store.dispatch(checkAuthStatusAction());
//     expect(store.getActions()).toEqual([
//       requireAuthorization(AuthorizationStatus.Auth), addUserEmail(fakeAuthInfo.email)]);
//     expect(Storage.prototype.setItem).toBeCalled();
//     expect(fakeAdaptAuthInfoToClient).toBeCalled();
//     expect(Storage.prototype.setItem).toBeCalledWith(AUTN_TOKEN_NAME, fakeAuthInfo.token);
//   });

//   it('should dispatch loginAction when POST /login', async () => {
//     mockAPI
//       .onPost(ApiRoute.Login, fakeUser)
//       .reply(200, {token: fakeAuthInfo.token});
//     const store = mockStore();
//     Storage.prototype.setItem = jest.fn();
//     fakeAdaptAuthInfoToClient.mockReturnValue(fakeAuthInfo);
//     await store.dispatch(loginAction(fakeUser));
//     expect(store.getActions()).toEqual([
//       toggleIsLoading(true),
//       requireAuthorization(AuthorizationStatus.Auth),
//       addUserEmail(fakeAuthInfo.email),
//       historyBack(),
//       toggleIsLoading(false)]);
//     expect(Storage.prototype.setItem).toBeCalled();
//     expect(Storage.prototype.setItem).toBeCalledWith(AUTN_TOKEN_NAME, fakeAuthInfo.token);
//     expect(fakeAdaptAuthInfoToClient).toBeCalled();
//   });

//   it('should dispatch Logout when Delete /logout', async () => {
//     mockAPI
//       .onDelete(ApiRoute.Logout)
//       .reply(204);
//     const store = mockStore();
//     Storage.prototype.removeItem = jest.fn();
//     await store.dispatch(logoutAction());
//     expect(store.getActions()).toEqual([
//       requireLogout(),
//       addUserEmail(''),
//     ]);
//     expect(Storage.prototype.removeItem).toBeCalledTimes(1);
//     expect(Storage.prototype.removeItem).toBeCalledWith(AUTN_TOKEN_NAME);
//   });
// });
