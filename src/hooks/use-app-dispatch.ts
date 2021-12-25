import { useDispatch } from 'react-redux';
import { AppDispatch } from '../types/state';

export const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>();
