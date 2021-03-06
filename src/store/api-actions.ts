import axios from 'axios';
import { toast } from 'react-toastify';
import { AppRoute, CouponError, FIRST_PAGE_NUM, FIRST_PRODUCT } from '../const';
import { ApiRoute, ErrorMessage, HEADER_TOTAL_COUNT, SUCCESS_MESSAGE } from '../services/const';
import { Comment, CommentPost, Guitar, Order, Product } from '../types/data';
import { FilterState, SortState, ThunkActionResult } from '../types/state';
import { createQuery } from '../utils';
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
import { toggleIsReviewOpen, toggleIsSuccessOpen } from './app-process/slice-app-process';
import { addCoupon, clearCart, clearCoupon, setFilter, setSort } from './app-user/slice-app-user';
import { redirectToRoute } from './middlewares/middleware-action';

export const fetchProductsSearch =
  (searchKey: string): ThunkActionResult =>
    async (dispatch, getState, api): Promise<void> => {
      try {
        const { data } = await api.get<Guitar[]>(
          `${ApiRoute.Products}?name_like=${searchKey}`,
        );
        if (getState().USER.searchKey === '') {
          return;
        }
        dispatch(addProductsSearch(data));
      } catch (err) {
        if (err instanceof Error) {
          if  (err.message === ErrorMessage.NetworkError) {
            toast.error(err.message);
            toast.clearWaitingQueue();
          }
        }
      }
    };

export const fetchFilteredProducts =
  (filter: FilterState, page: number, isSearchQuery?:boolean): ThunkActionResult =>
    async (dispatch, getState, api): Promise<void> => {
      dispatch(toggleIsLoading(true));
      dispatch(clearProductsCount());
      const currentPage = isSearchQuery ? page : FIRST_PAGE_NUM;
      const sort = getState().USER.sort;
      const query = createQuery(currentPage, filter, sort);
      try {
        const { data, headers } = await api.get<Product[]>(
          `${ApiRoute.Products}${query}`,
        );
        const productsTotalCount = headers[HEADER_TOTAL_COUNT];
        if ((data.length === 0)&&(isSearchQuery)) {
          throw new Error(ErrorMessage.Redirect);
        }
        if (page !== FIRST_PAGE_NUM) {
          dispatch(redirectToRoute(AppRoute.Main));
        }
        dispatch(addProductsCount(productsTotalCount));
        dispatch(addProductsShow(data));
        dispatch(setFilter(filter));
      } catch (err) {
        if (err instanceof Error) {
          if  (err.message === ErrorMessage.NetworkError) {
            toast.error(err.message);
            toast.clearWaitingQueue();
          }
          if (err.message === ErrorMessage.Redirect) {
            dispatch(redirectToRoute(AppRoute.NotFoundPage));
          }
        }
      }
      dispatch(toggleIsLoading(false));
    };

export const fetchSortedProducts =
  (page: number, sort: SortState): ThunkActionResult =>
    async (dispatch, getState, api): Promise<void> => {
      dispatch(toggleIsLoading(true));
      const filter = getState().USER.filter;
      const query = createQuery(page, filter, sort);
      try {
        const { data } = await api.get<Product[]>(`${ApiRoute.Products}${query}`);
        dispatch(addProductsShow(data));
        dispatch(setSort(sort));
      } catch (err) {
        if (err instanceof Error) {
          if  (err.message === ErrorMessage.NetworkError) {
            toast.error(err.message);
            toast.clearWaitingQueue();
          }
        }
      }
      dispatch(toggleIsLoading(false));
    };

export const fetchOnPageProducts =
  (page: number): ThunkActionResult =>
    async (dispatch, getState, api): Promise<void> => {
      dispatch(toggleIsLoading(true));
      const filter = getState().USER.filter;
      const sort = getState().USER.sort;
      const query = createQuery(page, filter, sort);
      try {
        const { data } = await api.get<Product[]>(`${ApiRoute.Products}${query}`);
        dispatch(addProductsShow(data));
      } catch (err) {
        if (err instanceof Error) {
          if  (err.message === ErrorMessage.NetworkError) {
            toast.error(err.message);
            toast.clearWaitingQueue();
          }
        }
      }
      dispatch(toggleIsLoading(false));
    };

export const fetchProductsPrice =
  (): ThunkActionResult =>
    async (dispatch, _getState, api): Promise<void> => {
      dispatch(toggleIsLoading(true));
      try {
        const { data, headers } = await api.get<Guitar[]>(
          `${ApiRoute.Products}?_sort=price&_start=${FIRST_PRODUCT}&_end=${
            FIRST_PRODUCT + 1
          }`,
        );
        dispatch(addPriceStart(data[FIRST_PRODUCT].price));
        dispatch(fetchProductsPriceMax(headers[HEADER_TOTAL_COUNT]));
      } catch (err) {
        if (err instanceof Error) {
          if  (err.message === ErrorMessage.NetworkError) {
            toast.error(err.message);
            toast.clearWaitingQueue();
          }
        }
      }
      dispatch(toggleIsLoading(false));
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
        if (err instanceof Error) {
          if  (err.message === ErrorMessage.NetworkError) {
            toast.error(err.message);
            toast.clearWaitingQueue();
          }
        }
      }
    };

export const fetchCurrentProduct =
    (id: string): ThunkActionResult =>
      async (dispatch, _getState, api): Promise<void> => {
        try {
          const { data } = await api.get<Product>(
            `${ApiRoute.Products}/${id}?_embed=comments`,
          );
          const {comments, ...rest} = data;
          dispatch(addCurrentProduct(rest));
          dispatch(addCurrentComments(comments));
        } catch (err) {
          if (err instanceof Error) {
            if  (err.message === ErrorMessage.NetworkError) {
              toast.error(err.message);
              toast.clearWaitingQueue();
            }
            if (err.message === ErrorMessage.NotFound) {
              dispatch(redirectToRoute(AppRoute.NotFoundPage));
            }
          }
        }
      };

export const postComment =
    (comment: CommentPost): ThunkActionResult =>
      async (dispatch, _getState, api): Promise<void> => {
        try {
          const { data } = await api.post<Comment>(
            `${ApiRoute.Comments}`, comment);
          dispatch(addNewComment(data));
          dispatch(toggleIsReviewOpen(false));
          dispatch(toggleIsSuccessOpen(true));
        } catch (err) {
          if (err instanceof Error) {
            if  (err.message === ErrorMessage.NetworkError) {
              toast.error(err.message);
              toast.clearWaitingQueue();
            }
            if (err.message === ErrorMessage.BadRequest) {
              toast.warning(ErrorMessage.Incorrect);
              toast.clearWaitingQueue();
            }
          }
        }
      };

export const fetchCartProducts =
    (productsIds: string[]): ThunkActionResult =>
      async (dispatch, _getState, api): Promise<void> => {
        dispatch(toggleIsLoading(true));
        try {
          const response = await
          axios.all(productsIds.map((id) =>
            api.get<Product>(`${ApiRoute.Products}/${id}`)));
          const products = response.map((resp) => resp.data);
          dispatch(addProductsInCart(products));
        } catch (err) {
          if (err instanceof Error) {
            if  (err.message === ErrorMessage.NetworkError) {
              toast.error(err.message);
              toast.clearWaitingQueue();
            }
          }
        }
        dispatch(toggleIsLoading(false));
      };

export const postCoupon =
    (value: string): ThunkActionResult =>
      async (dispatch, _getState, api): Promise<void> => {
        try {
          const { data } = await api.post<number>(
            `${ApiRoute.Coupons}`, {coupon: value});
          dispatch(addCoupon({value, discount: data}));
        } catch (err) {
          if (err instanceof Error) {
            if  (err.message === ErrorMessage.NetworkError) {
              toast.error(err.message);
              toast.clearWaitingQueue();
            }
            if (err.message === ErrorMessage.BadRequest) {
              dispatch(addCoupon(CouponError));
              toast.warning(ErrorMessage.Incorrect);
              toast.clearWaitingQueue();
            }
          }
        }
      };

export const postOrder =
      (order: Order): ThunkActionResult =>
        async (dispatch, getState, api): Promise<void> => {
          try {
            await api.post<number>(
              `${ApiRoute.Orders}`, order);
            dispatch(clearProductsInCart());
            dispatch(clearCoupon());
            dispatch(clearCart());
            toast.success(SUCCESS_MESSAGE);
          } catch (err) {
            if (err instanceof Error) {
              if  (err.message === ErrorMessage.NetworkError) {
                toast.error(err.message);
                toast.clearWaitingQueue();
              }
              if (err.message === ErrorMessage.BadRequest) {
                dispatch(addCoupon(CouponError));
                toast.warning(ErrorMessage.Incorrect);
                toast.clearWaitingQueue();
              }
            }
          }
        };
