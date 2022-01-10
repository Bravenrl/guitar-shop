import { ChangeEvent, memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFilteredProducts } from '../../../../store/api-actions';
import {
  getPriceEnd,
  getPriceStart
} from '../../../../store/app-data/selectors-app-data';
import {
  getFilter
} from '../../../../store/app-user/selectors-app-user';

type PriceFilterProps = {
  page: number
}

function PriceFilter({page}: PriceFilterProps): JSX.Element {
  const dispatch = useDispatch();
  const filter = useSelector(getFilter);
  const {priceMax, priceMin} = filter;
  const pricePlaceholderStart = useSelector(getPriceStart);
  const pricePlaceholderEnd = useSelector(getPriceEnd);
  const [curPriceMin, setCurPriceMin] = useState(priceMin);
  const [curPriceMax, setCurPriceMax] = useState(priceMax);

  useEffect(() => {
    setCurPriceMin(priceMin);
    setCurPriceMax(priceMax);
  }, [priceMax, priceMin]);

  const handleInputMinBlur = (evt: ChangeEvent<HTMLInputElement>) => {
    let actualFilter = filter;
    let price = evt.target.value;
    if (price === '') {
      setCurPriceMin(price);
      return;
    }
    if (+price < pricePlaceholderStart) {
      price = pricePlaceholderStart.toString();
    }
    if (+price > pricePlaceholderEnd) {
      price = pricePlaceholderEnd.toString();
    }
    if (+price > +curPriceMax&&curPriceMax!=='') {
      price = curPriceMax;
    }
    setCurPriceMin(price);
    actualFilter = {...actualFilter, priceMin: price};
    dispatch(fetchFilteredProducts(actualFilter));
  };

  const handleInputMaxBlur = (evt: ChangeEvent<HTMLInputElement>) => {
    let actualFilter = filter;
    let price = evt.target.value;
    if (price === '') {
      setCurPriceMax(price);
      return;
    }
    if (+price > pricePlaceholderEnd || +price === 0 || +price < pricePlaceholderStart) {
      price = pricePlaceholderEnd.toString();
    }
    if (+price < +curPriceMin) {
      price = curPriceMin;
    }
    setCurPriceMax(price);
    actualFilter = {...actualFilter, priceMax: price};
    dispatch(fetchFilteredProducts(actualFilter));
  };

  return (
    <fieldset className='catalog-filter__block'>
      <legend className='catalog-filter__block-title'>Цена, ₽</legend>
      <div className='catalog-filter__price-range'>
        <div className='form-input'>
          <label className='visually-hidden'>Минимальная цена</label>
          <input
            type='number'
            placeholder={pricePlaceholderStart.toString()}
            id='priceMin'
            name='от'
            onBlur={handleInputMinBlur}
            value={curPriceMin}
            onChange={(evt) => setCurPriceMin(evt.target.value)}
          />
        </div>
        <div className='form-input'>
          <label className='visually-hidden'>Максимальная цена</label>
          <input
            type='number'
            placeholder={pricePlaceholderEnd.toString()}
            id='priceMax'
            name='до'
            onBlur={handleInputMaxBlur}
            value={curPriceMax}
            onChange={(evt) => setCurPriceMax(evt.target.value)}
          />
        </div>
      </div>
    </fieldset>
  );
}

export default memo(PriceFilter);
