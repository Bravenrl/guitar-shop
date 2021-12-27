import { ApiRoute } from '../services/const';
import { Guitar } from '../types/data';
import { ThunkActionResult } from '../types/state';
import { addProductsInit, addProductsShow } from './app-data/slice-app-data';
import { setPriceEnd, setPriceStart } from './app-user/slice-app-user';

export const fetchProductsInit =
  (): ThunkActionResult =>
    async (dispatch, _getState, api): Promise<void> => {
      try {
        const { data } = await api.get<Guitar[]>(ApiRoute.ProductsInit);
        dispatch(addProductsInit(data));
        const priceEnd = data[data.length - 1].price;
        const priceStart = data[0].price;
        dispatch(setPriceEnd(priceEnd));
        dispatch(setPriceStart(priceStart));
      } catch (err) {
      // eslint-disable-next-line no-console
        console.log(err);
      }
    };

export const fetchProductsShow =
  (query: string): ThunkActionResult =>
    async (dispatch, _getState, api): Promise<void> => {
      try {
        const { data } = await api.get<Guitar[]>(
          `${ApiRoute.ProductsShow}${query}`,
        );
        dispatch(addProductsShow(data));
      } catch (err) {
      // eslint-disable-next-line no-console
        console.log(err);
      }
    };
