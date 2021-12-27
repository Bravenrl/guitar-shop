import axios, { AxiosResponse } from 'axios';
import { FIRST_PRODUCT } from '../const';
import { ApiRoute } from '../services/const';
import { Guitar } from '../types/data';
import { ThunkActionResult } from '../types/state';
import {
  addPriceEnd,
  addPriceStart,
  addProductsCount,
  addProductsSearch,
  addProductsShow
} from './app-data/slice-app-data';

export const fetchProductsSearch =
  (): ThunkActionResult =>
    async (dispatch, _getState, api): Promise<void> => {
      try {
        const { data } = await api.get<Guitar[]>(ApiRoute.Products);
        dispatch(addProductsSearch(data));
      } catch (err) {
      // eslint-disable-next-line no-console
        console.log(err);
      }
    };

export const fetchProductsShow =
  (query: string): ThunkActionResult =>
    async (dispatch, _getState, api): Promise<void> => {
      try {
        const { data, headers } = await api.get<Guitar[]>(`${ApiRoute.Products}${query}`);
        dispatch(addProductsShow(data));
        const productsTotalCount = headers['x-total-count'];
        dispatch(addProductsCount(productsTotalCount));
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
