import { ChangeEvent, FormEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { generatePath, useNavigate } from 'react-router-dom';
import { AppRoute, DELAY } from '../../../const';
import useDebounce from '../../../hooks/use-debounce/use-debounce';
import { fetchProductsSearch } from '../../../store/api-actions';
import { getSortedProductsSearch } from '../../../store/app-data/selectors-app-data';
import { clearProductsSearch } from '../../../store/app-data/slice-app-data';
import { getSearchKey } from '../../../store/app-user/selectors-app-user';
import {
  resetSearchKey,
  setSearchKey
} from '../../../store/app-user/slice-app-user';

function FormSearch(): JSX.Element {
  const navigate = useNavigate();
  const productsSearch = useSelector(getSortedProductsSearch);
  const searchKey = useSelector(getSearchKey);
  const dispatch = useDispatch();
  const debouncedSearch = useDebounce(dispatch, DELAY);

  useEffect(() => {
    if (searchKey === '') {
      clearProductsSearch();
      return;
    }
    debouncedSearch(fetchProductsSearch(searchKey));
  }, [debouncedSearch, dispatch, searchKey]);

  return (
    <div className='form-search'>
      <form
        className='form-search__form'
        onSubmit={(evt: FormEvent<HTMLFormElement>) => {
          evt.preventDefault();
        }}
      >
        <button className='form-search__submit' type='submit'>
          <svg
            className='form-search__icon'
            width='14'
            height='15'
            aria-hidden='true'
          >
            <use xlinkHref='#icon-search'></use>
          </svg>
          <span className='visually-hidden'>Начать поиск</span>
        </button>
        <input
          value={searchKey}
          className='form-search__input'
          id='search'
          type='text'
          autoComplete='off'
          placeholder='что вы ищите?'
          onChange={(evt: ChangeEvent<HTMLInputElement>) => {
            dispatch(setSearchKey(evt.target.value));
          }}
        />
        <label className='visually-hidden' htmlFor='search'>
          Поиск
        </label>
      </form>
      <ul
        className={`form-search__select-list ${
          productsSearch.length ? '' : 'hidden'
        }`}
        style={{
          zIndex: 1,
        }}
      >
        {productsSearch?.map((product) => {
          const { name, id } = product;
          const path = generatePath(AppRoute.Product, { id: id.toString() });
          return (
            <li
              className='form-search__select-item'
              tabIndex={0}
              key={id}
              onClick={() => {
                navigate(`/${path}`);
                dispatch(resetSearchKey());
              }}
              onKeyPress={(evt) => {
                evt.preventDefault();
                if (evt.key === 'Enter') {
                  navigate(`/${path}`);
                  dispatch(resetSearchKey());
                }
              }}
            >
              {name}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default FormSearch;
