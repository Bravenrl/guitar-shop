import axios, { AxiosResponse } from 'axios';
import { FIRST_PRODUCT } from '../const';
import { ApiRoute } from '../services/const';
import { Guitar } from '../types/data';
import { FilterState, ThunkActionResult } from '../types/state';
import {
  addPriceEnd,
  addPriceStart,
  addProductsCount,
  addProductsSearch,
  addProductsShow
} from './app-data/slice-app-data';
import { setFilter } from './app-user/slice-app-user';

export const fetchProductsSearch =
  (searchKey: string): ThunkActionResult =>
    async (dispatch, _getState, api): Promise<void> => {
      try {
        const { data } = await api.get<Guitar[]>(`${ApiRoute.Products}?name_like=${searchKey}`);
        dispatch(addProductsSearch(data));
      } catch (err) {
      // eslint-disable-next-line no-console
        console.log(err);
      }
    };

export const fetchProductsShow =
  (query: string, filter: FilterState): ThunkActionResult =>
    async (dispatch, getState, api): Promise<void> => {
      try {
        const { data, headers } = await api.get<Guitar[]>(`${ApiRoute.Products}${query}`);
        dispatch(addProductsShow(data));
        const productsTotalCount = headers['x-total-count'];
        const isFirstFetch = (!getState().DATA.productsCount);
        dispatch(addProductsCount(productsTotalCount));
        dispatch(setFilter(filter));
        if (isFirstFetch) {
          // eslint-disable-next-line no-console
          console.log('object');
          dispatch(fetchProductsPrice(productsTotalCount));
        }
      } catch (err) {
      // eslint-disable-next-line no-console
        console.log(err);
      }
    };

export const fetchProductsPrice =
  (productsCount: number): ThunkActionResult =>
    async (dispatch, _getState, api): Promise<void> => {
      try {
        const [
          { data: priceStart },
          { data: priceEnd },
        ] = await axios.all<AxiosResponse>([
          api.get<Guitar[]>(`${ApiRoute.Products}?_sort=price&_start=${FIRST_PRODUCT}&_end=${FIRST_PRODUCT+1}`),
          api.get<Guitar[]>(`${ApiRoute.Products}?_sort=price&_start=${productsCount-1}&_end=${productsCount}`),
        ]);
        dispatch(addPriceEnd(priceEnd[FIRST_PRODUCT].price));
        dispatch(addPriceStart(priceStart[FIRST_PRODUCT].price));
      } catch (err) {
      // eslint-disable-next-line no-console
        console.log(err);
      }
    };
