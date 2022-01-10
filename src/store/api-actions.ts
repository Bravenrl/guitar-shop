/* eslint-disable no-console */
import { AppRoute, FIRST_PAGE_NUM, FIRST_PRODUCT } from '../const';
import { ApiRoute, HEADER_TOTAL_COUNT } from '../services/const';
import { Guitar } from '../types/data';
import { FilterState, SortState, ThunkActionResult } from '../types/state';
import { createQuery } from '../utils';
import {
  addPriceEnd,
  addPriceStart,
  addProductsCount,
  addProductsSearch,
  addProductsShow
} from './app-data/slice-app-data';
import { setFilter, setSort } from './app-user/slice-app-user';
import { redirectToRoute } from './middlewares/middleware-action';

export const fetchProductsSearch =
  (searchKey: string): ThunkActionResult =>
    async (dispatch, _getState, api): Promise<void> => {
      try {
        const { data } = await api.get<Guitar[]>(
          `${ApiRoute.Products}?name_like=${searchKey}`,
        );
        dispatch(addProductsSearch(data));
      } catch (err) {
        console.log(err);
      }
    };

export const fetchFilteredProducts =
  (filter: FilterState, page?: number): ThunkActionResult =>
    async (dispatch, getState, api): Promise<void> => {
      const currentPage = page ?? FIRST_PAGE_NUM;
      const sort = getState().USER.sort;
      const query = createQuery(currentPage, filter, sort);
      if (!page) {
        dispatch(redirectToRoute(AppRoute.Main));
      }
      try {
        const { data, headers } = await api.get<Guitar[]>(`${ApiRoute.Products}${query}`);
        const productsTotalCount = headers[HEADER_TOTAL_COUNT];
        dispatch(addProductsCount(productsTotalCount));
        dispatch(addProductsShow(data));
        dispatch(setFilter(filter));
      } catch (err) {
        console.log(err);
      }
    };

export const fetchSortedProducts =
  (page: number, sort: SortState): ThunkActionResult =>
    async (dispatch, getState, api): Promise<void> => {
      const filter = getState().USER.filter;
      const query = createQuery(page, filter, sort);
      try {
        const { data } = await api.get<Guitar[]>(`${ApiRoute.Products}${query}`);
        dispatch(addProductsShow(data));
        dispatch(setSort(sort));
      } catch (err) {
        console.log(err);
      }
    };

export const fetchOnPageProducts =
  (page: number): ThunkActionResult =>
    async (dispatch, getState, api): Promise<void> => {
      const filter = getState().USER.filter;
      const sort = getState().USER.sort;
      const query = createQuery(page, filter, sort);
      try {
        const { data } = await api.get<Guitar[]>(`${ApiRoute.Products}${query}`);
        dispatch(addProductsShow(data));
      } catch (err) {
        console.log(err);
      }
    };

export const fetchProductsPrice =
  (): ThunkActionResult =>
    async (dispatch, _getState, api): Promise<void> => {
      try {
        const { data, headers } = await api.get<Guitar[]>(
          `${ApiRoute.Products}?_sort=price&_start=${FIRST_PRODUCT}&_end=${
            FIRST_PRODUCT + 1
          }`,
        );
        dispatch(addPriceStart(data[FIRST_PRODUCT].price));
        dispatch(fetchProductsPriceMax(headers[HEADER_TOTAL_COUNT]));
      } catch (err) {
        console.log(err);
      }
    };

export const fetchProductsPriceMax =
  (productsCount: number): ThunkActionResult =>
    async (dispatch, _getState, api): Promise<void> => {
      try {
        const { data } = await api.get<Guitar[]>(
          `${ApiRoute.Products}?_sort=price&_start=${
            productsCount - 1
          }&_end=${productsCount}`,
        );
        dispatch(addPriceEnd(data[FIRST_PRODUCT].price));
      } catch (err) {
        console.log(err);
      }
    };
