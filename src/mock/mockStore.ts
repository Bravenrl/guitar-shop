import { Guitar } from '../types/data';
import { AppData, AppUser } from '../types/state';

export const MockDATA: AppData = {
  productsSearch: [],
  productsShow: [],
  priceEnd: 0,
  priceStart: 0,
  productsCount: null,
  isLoading: true,
  currentComments: [],
  currentProduct: {} as Guitar,
};

export const MockUSER: AppUser = {
  sort: {
    sortKey: '',
    orderKey: '',
  },
  filter: {
    productTypes: [],
    stringCounts: [],
    priceMin: '',
    priceMax: '',
  },
  searchKey: '',
};
