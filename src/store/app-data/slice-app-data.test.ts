import { INIT_COMMENTS_COUNT } from '../../const';
import {
  CreateFakeComment,
  CreateFakeGuitar,
  fakeComments,
  fakeGuitars,
  fakeProducts
} from '../../mock/fakeData';
import { Guitar } from '../../types/data';
import { AppData } from '../../types/state';
import appData, {
  addCurrentComments,
  addCurrentProduct,
  addNewComment,
  addPriceEnd,
  addPriceStart,
  addProductsCount,
  addProductsInCart,
  addProductsSearch,
  addProductsShow,
  addTempItemCart,
  clearProductsInCart,
  clearCurrentComments,
  clearCurrentProduct,
  clearProductsSearch,
  deleteProductFromCart,
  incrementCommentsCounter,
  resetCommentsCounter,
  resetTempItemCart
} from './slice-app-data';

export const initialState: AppData = {
  productsSearch: [],
  productsShow: [],
  priceEnd: 0,
  priceStart: 0,
  productsCount: null,
  isLoading: true,
  currentProduct: {} as Guitar,
  currentComments: [],
  commentsCounter: INIT_COMMENTS_COUNT,
  tempItemCart: {} as Guitar,
  productsInCart: [],
};

const FAKE_ID = 2;
const FAKE_PRICE = 1;
const FAKE_COUNT = 10;
const FAKE_PRODUCT = CreateFakeGuitar();
const FAKE_COMMENT = CreateFakeComment();
const FAKE_COMMENT_COUNTER = 6;

const fakeFirstGuitar = {...CreateFakeGuitar(), id: 1};
const fakeSecondGuitar = {...CreateFakeGuitar(), id: 2};

describe('Reducer: appData', () => {
  let state = initialState;
  beforeAll(() => {
    state = initialState;
  });
  it('without additional parameters should return initial state', () => {
    expect(appData(void 0, { type: 'UNKNOWN_ACTION' })).toEqual(state);
  });
  it('should update productsSearch by addProductsSearch', () => {
    expect(appData(state, addProductsSearch(fakeGuitars))).toEqual({
      ...state,
      productsSearch: fakeGuitars,
    });
  });
  it('should clear productsSearch by clearProductsSearch', () => {
    state = { ...state, productsSearch: fakeGuitars };
    expect(appData(state, clearProductsSearch())).toEqual(initialState);
  });
  it('should update productsShow by addProductsShow', () => {
    expect(appData(state, addProductsShow(fakeProducts))).toEqual({
      ...state,
      productsShow: fakeProducts,
    });
  });
  it('should update priceStart by addPriceStart', () => {
    expect(appData(state, addPriceStart(FAKE_PRICE))).toEqual({
      ...state,
      priceStart: FAKE_PRICE,
    });
  });
  it('should update priceEnd by addPriceEnd', () => {
    expect(appData(state, addPriceEnd(FAKE_PRICE))).toEqual({
      ...state,
      priceEnd: FAKE_PRICE,
    });
  });
  it('should update productsCount by addProductsCount', () => {
    expect(appData(state, addProductsCount(FAKE_COUNT))).toEqual({
      ...state,
      productsCount: FAKE_COUNT,
    });
  });
  it('should update currentProduct by addCurrentProduct', () => {
    expect(appData(state, addCurrentProduct(FAKE_PRODUCT))).toEqual({
      ...state,
      currentProduct: FAKE_PRODUCT,
    });
  });
  it('should clear currentProduct by clearCurrentProduct', () => {
    state = { ...initialState, currentProduct: FAKE_PRODUCT };
    expect(appData(state, clearCurrentProduct())).toEqual(initialState);
  });
  it('should update currentComments by addCurrentComments', () => {
    expect(appData(state, addCurrentComments(fakeComments))).toEqual({
      ...state,
      currentComments: fakeComments,
    });
  });
  it('should clear currentComments by clearCurrentComments', () => {
    state = { ...initialState, currentComments: fakeComments };
    expect(appData(state, clearCurrentComments())).toEqual(initialState);
  });
  it('should update currentComments by addNewComment', () => {
    state = { ...initialState, currentComments: fakeComments };
    expect(appData(state, addNewComment(FAKE_COMMENT))).toEqual({
      ...state,
      currentComments: [FAKE_COMMENT, ...fakeComments],
    });
  });
  it('should not update commentsCounter by incrementCommentsCounter if currentComments.length < commentCounter', () => {
    state = { ...initialState };
    expect(appData(state, incrementCommentsCounter())).toEqual({
      ...initialState,
    });
  });
  it('should update commentsCounter by incrementCommentsCounter', () => {
    state = { ...initialState, currentComments: fakeComments };
    expect(appData(state, incrementCommentsCounter())).toEqual({
      ...initialState,
      currentComments: fakeComments,
      commentsCounter: initialState.commentsCounter + INIT_COMMENTS_COUNT,
    });
  });
  it('should reset commentsCounter by resetCommentsCounter', () => {
    state = { ...initialState, commentsCounter: FAKE_COMMENT_COUNTER };
    expect(appData(state, resetCommentsCounter())).toEqual({
      ...initialState,
    });
  });
  it('should update tempItemCart by addTempItemCart', () => {
    expect(appData(state, addTempItemCart(FAKE_PRODUCT))).toEqual({
      ...state,
      tempItemCart: FAKE_PRODUCT,
    });
  });
  it('should reset tempItemCart by resetTempItemCart', () => {
    state = { ...initialState, tempItemCart: FAKE_PRODUCT };
    expect(appData(state, resetTempItemCart())).toEqual(initialState);
  });
  it('should update productsInCart by addProductsInCart', () => {
    expect(appData(state, addProductsInCart(fakeGuitars))).toEqual({
      ...state,
      productsInCart: fakeGuitars,
    });
  });
  it('should clear productsInCart by clearProductsInCart', () => {
    state = { ...state, productsInCart: fakeGuitars };
    expect(appData(state, clearProductsInCart())).toEqual(initialState);
  });
  it('should delete product from productsInCart by deleteProductFromCart', () => {
    state = { ...state, productsInCart: [fakeFirstGuitar, fakeSecondGuitar]};
    expect(appData(state, deleteProductFromCart(FAKE_ID))).toEqual({ ...state, productsInCart: [fakeFirstGuitar]});
  });
});


