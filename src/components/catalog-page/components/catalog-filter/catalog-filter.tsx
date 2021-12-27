import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsPrice } from '../../../../store/api-actions';
import { getPriceEnd, getPriceStart, getProductsCount } from '../../../../store/app-data/selectors-app-data';

function CatalogFilter(): JSX.Element {
  const productsCount = useSelector(getProductsCount);
  const priceStart = useSelector(getPriceStart);
  const priceEnd = useSelector(getPriceEnd);
  const dispatch = useDispatch();

  useEffect(() => {
    if (productsCount) {
      dispatch(fetchProductsPrice(productsCount));
    }
  }, [dispatch, productsCount]);

  return (
    <form className='catalog-filter'>
      <h2 className='title title--bigger catalog-filter__title'>Фильтр</h2>
      <fieldset className='catalog-filter__block'>
        <legend className='catalog-filter__block-title'>Цена, ₽</legend>
        <div className='catalog-filter__price-range'>
          <div className='form-input'>
            <label className='visually-hidden'>Минимальная цена</label>
            <input type='number' placeholder={priceStart?.toString()} id='priceMin' name='от' />
          </div>
          <div className='form-input'>
            <label className='visually-hidden'>Максимальная цена</label>
            <input type='number' placeholder={priceEnd?.toString()} id='priceMax' name='до' />
          </div>
        </div>
      </fieldset>
      <fieldset className='catalog-filter__block'>
        <legend className='catalog-filter__block-title'>Тип гитар</legend>
        <div className='form-checkbox catalog-filter__block-item'>
          <input
            className='visually-hidden'
            type='checkbox'
            id='acoustic'
            name='acoustic'
          />
          <label htmlFor='acoustic'>Акустические гитары</label>
        </div>
        <div className='form-checkbox catalog-filter__block-item'>
          <input
            className='visually-hidden'
            type='checkbox'
            id='electric'
            name='electric'
            checked
          />
          <label htmlFor='electric'>Электрогитары</label>
        </div>
        <div className='form-checkbox catalog-filter__block-item'>
          <input
            className='visually-hidden'
            type='checkbox'
            id='ukulele'
            name='ukulele'
            checked
          />
          <label htmlFor='ukulele'>Укулеле</label>
        </div>
      </fieldset>
      <fieldset className='catalog-filter__block'>
        <legend className='catalog-filter__block-title'>
          Количество струн
        </legend>
        <div className='form-checkbox catalog-filter__block-item'>
          <input
            className='visually-hidden'
            type='checkbox'
            id='4-strings'
            name='4-strings'
            checked
          />
          <label htmlFor='4-strings'>4</label>
        </div>
        <div className='form-checkbox catalog-filter__block-item'>
          <input
            className='visually-hidden'
            type='checkbox'
            id='6-strings'
            name='6-strings'
            checked
          />
          <label htmlFor='6-strings'>6</label>
        </div>
        <div className='form-checkbox catalog-filter__block-item'>
          <input
            className='visually-hidden'
            type='checkbox'
            id='7-strings'
            name='7-strings'
          />
          <label htmlFor='7-strings'>7</label>
        </div>
        <div className='form-checkbox catalog-filter__block-item'>
          <input
            className='visually-hidden'
            type='checkbox'
            id='12-strings'
            name='12-strings'
            disabled
          />
          <label htmlFor='12-strings'>12</label>
        </div>
      </fieldset>
    </form>
  );
}

export default CatalogFilter;
