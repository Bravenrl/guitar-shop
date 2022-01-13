import { ThunkActionResult } from './state';

export type CallbackType = (thunkAction:ThunkActionResult<Promise<void>>) => void;
