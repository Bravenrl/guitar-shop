import { ChangeEvent, memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useFilterQuery from '../../../../hooks/use-filter-query';
import { fetchProductsShow } from '../../../../store/api-actions';
import {
  getPriceEnd,
  getPriceStart
} from '../../../../store/app-data/selectors-app-data';
import {
  getFilter
} from '../../../../store/app-user/selectors-app-user';


function PriceFilter(): JSX.Element {
  const dispatch = useDispatch();
  const filter = useSelector(getFilter);
  const {priceMax, priceMin} = filter;
  const priceStart = useSelector(getPriceStart);
  const priceEnd = useSelector(getPriceEnd);
  const [curPriceMin, setCurPriceMin] = useState(priceMin);
  const [curPriceMax, setCurPriceMax] = useState(priceMax);
  const setFilterQuery = useFilterQuery();
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
    actualFilter = {...actualFilter, priceMin: price};
    const filterQuery = setFilterQuery(actualFilter);
    dispatch(fetchProductsShow(filterQuery, actualFilter));
  };

  const handleInputMaxBlur = (evt: ChangeEvent<HTMLInputElement>) => {
    let actualFilter = filter;
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
    actualFilter = {...actualFilter, priceMax: price};
    const filterQuery = setFilterQuery(actualFilter);
    dispatch(fetchProductsShow(filterQuery, actualFilter));
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
