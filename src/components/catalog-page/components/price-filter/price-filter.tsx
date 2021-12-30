import { ChangeEvent, memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getPriceEnd,
  getPriceStart
} from '../../../../store/app-data/selectors-app-data';
import {
  getPriceMax,
  getPriceMin
} from '../../../../store/app-user/selectors-app-user';
import {
  setPriceMax,
  setPriceMin
} from '../../../../store/app-user/slice-app-user';

function PriceFilter(): JSX.Element {
  const dispatch = useDispatch();
  const initPriceMax = useSelector(getPriceMax);
  const initPriceMin = useSelector(getPriceMin);
  const priceStart = useSelector(getPriceStart);
  const priceEnd = useSelector(getPriceEnd);
  const [curPriceMin, setCurPriceMin] = useState('');
  const [curPriceMax, setCurPriceMax] = useState('');

  useEffect(() => {
    setCurPriceMin(initPriceMin ?? '');
    setCurPriceMax(initPriceMax ?? '');
  }, [initPriceMax, initPriceMin]);

  const handleInputMinBlur = (evt: ChangeEvent<HTMLInputElement>) => {
    let price = evt.target.value;
    if (price === '') {
      setCurPriceMin(price);
      return;
    }
    if (+price < priceStart) {
      price = priceStart.toString();
    }
    if (+price > priceEnd) {
      price = priceEnd.toString();
    }
    if (+price > +curPriceMax&&curPriceMax!=='') {
      price = curPriceMax;
    }
    setCurPriceMin(price);
    if (curPriceMax !== '') {
      dispatch(setPriceMin(price));
      dispatch(setPriceMax(curPriceMax));
    }
  };

  const handleInputMaxBlur = (evt: ChangeEvent<HTMLInputElement>) => {
    let price = evt.target.value;
    if (price === '') {
      setCurPriceMax(price);
      return;
    }
    if (+price > priceEnd || +price === 0 || +price < priceStart) {
      price = priceEnd.toString();
    }
    if (+price < +curPriceMin) {
      price = curPriceMin;
    }
    setCurPriceMax(price);
    if (curPriceMin !== '') {
      dispatch(setPriceMax(price));
      dispatch(setPriceMin(curPriceMin));
    }
  };
  return (
    <fieldset className='catalog-filter__block'>
      <legend className='catalog-filter__block-title'>Цена, ₽</legend>
      <div className='catalog-filter__price-range'>
        <div className='form-input'>
          <label className='visually-hidden'>Минимальная цена</label>
          <input
            type='number'
            placeholder={priceStart.toString()}
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
            placeholder={priceEnd.toString()}
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
