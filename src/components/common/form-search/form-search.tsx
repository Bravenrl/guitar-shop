import { ChangeEvent, FormEvent, useState } from 'react';
import useSearch from '../../../hooks/use-search';

function FormSearch(): JSX.Element {
  const [searchKey, setSearchKey] = useState('');
  const searchedGuitars = useSearch(searchKey);
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
          className='form-search__input'
          id='search'
          type='text'
          autoComplete='off'
          placeholder='что вы ищите?'
          onChange={(evt: ChangeEvent<HTMLInputElement>) => {
            setSearchKey(evt.target.value);
          }}
        />
        <label className='visually-hidden' htmlFor='search'>
          Поиск
        </label>
      </form>
      <ul
        className={`form-search__select-list ${
          searchedGuitars?.length ? '' : 'hidden'
        }`}
        style={{
          zIndex: 1,
        }}
      >
        {searchedGuitars?.map((guitar) => (
          <li className='form-search__select-item' tabIndex={0} key={guitar.id}>
            {guitar.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FormSearch;
