
import { CreateFakeProduct, fakeComments, fakeProducts } from '../../mock/fakeData';
import { Product } from '../../types/data';
import { AppData } from '../../types/state';
import appData, { addCurrentProduct, addPriceEnd, addPriceStart, addProductsCount, addProductsSearch, addProductsShow, clearCurrentProduct, clearProductsSearch } from './slice-app-data';

export const initialState: AppData = {
  productsSearch: [],
  productsShow: [],
  priceEnd: 0,
  priceStart: 0,
  productsCount: null,
  isLoading: true,
  currentProduct: {} as Product,
};

const FAKE_PRICE = 1;
const FAKE_COUNT = 10;
const FAKE_PRODUCT = {...CreateFakeProduct(), comments: fakeComments};


describe('Reducer: appData', () => {
  let state = initialState;
  it('without additional parameters should return initial state', () => {
    expect(appData(void 0, { type: 'UNKNOWN_ACTION' }))
      .toEqual(state);
  });
  it('should update productsSearch by addProductsSearch', () => {
    expect(appData(state, addProductsSearch(fakeProducts)))
      .toEqual({ ...state, productsSearch: fakeProducts });
  });
  it('should clear productsSearch by clearProductsSearch', () => {
    state = {...state, productsSearch: fakeProducts};
    expect(appData(state, clearProductsSearch()))
      .toEqual(initialState);
  });
  it('should update productsShow by addProductsShow', () => {
    expect(appData(state, addProductsShow(fakeProducts)))
      .toEqual({ ...state, productsShow: fakeProducts });
  });
  it('should update priceStart by addPriceStart', () => {
    expect(appData(state, addPriceStart(FAKE_PRICE)))
      .toEqual({ ...state, priceStart: FAKE_PRICE });
  });
  it('should update priceEnd by addPriceEnd', () => {
    expect(appData(state, addPriceEnd(FAKE_PRICE)))
      .toEqual({ ...state, priceEnd: FAKE_PRICE });
  });
  it('should update comment by addProductsCount', () => {
    expect(appData(state, addProductsCount(FAKE_COUNT)))
      .toEqual({ ...state, productsCount: FAKE_COUNT });
  });
  it('should update currentProduct by addCurrentProduct', () => {
    expect(appData(state, addCurrentProduct(FAKE_PRODUCT)))
      .toEqual({ ...state, currentProduct: FAKE_PRODUCT });
  });
  it('should clear currentProduct by clearCurrentProduct', () => {
    state = { ...state, currentProduct: FAKE_PRODUCT };
    expect(appData(state, clearCurrentProduct()))
      .toEqual(initialState);
  });
});
