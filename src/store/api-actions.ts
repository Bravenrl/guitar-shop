import { ApiRoute } from '../services/const';
import { Guitar } from '../types/data';
import { ThunkActionResult } from '../types/state';
import { addAllGuitars } from './app-data/slice-app-data';

export const fetchAllGuitars = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const { data } = await api.get<Guitar[]>(ApiRoute.Guitars);
      dispatch(addAllGuitars(data));
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  };
