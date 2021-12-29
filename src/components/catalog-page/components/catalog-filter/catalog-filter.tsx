import { ChangeEvent, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ProductType, StringCount } from '../../../../const';
import useDisable from '../../../../hooks/use-disable';
import {
  getPriceEnd,
  getPriceStart
} from '../../../../store/app-data/selectors-app-data';
import { getParams } from '../../../../store/app-user/selectors-app-user';
import { setParams } from '../../../../store/app-user/slice-app-user';
import { StringType } from '../../../../types/data';

function CatalogFilter(): JSX.Element {
  const priceStart = useSelector(getPriceStart);
  const priceEnd = useSelector(getPriceEnd);
  const params = useSelector(getParams);
  const dispatch = useDispatch();
  const checkIsDisable = useDisable(params);

  const handleTypeChange = (evt: ChangeEvent<HTMLFieldSetElement>) => {
    const currentType = evt.target.name;
    params.types.includes(currentType)
      ? dispatch(
        setParams({
          ...params,
          types: params.types.filter((value) => value !== currentType),
        }),
      )
      : dispatch(setParams({ ...params, types: [...params.types, currentType] }));
  };

  const handleStringCountChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const stringCount = evt.target.value;
    params.stringCounts.includes(stringCount)
      ? dispatch(
        setParams({
          ...params,
          stringCounts: params.stringCounts.filter(
            (value) => value !== stringCount,
          ),
        }),
      )
      : dispatch(
        setParams({
          ...params,
          stringCounts: [...params.stringCounts, stringCount],
        }),
      );
  };

  return (
    <form className='catalog-filter'>
      <h2 className='title title--bigger catalog-filter__title'>Фильтр</h2>
      <fieldset className='catalog-filter__block'>
        <legend className='catalog-filter__block-title'>Цена, ₽</legend>
        <div className='catalog-filter__price-range'>
          <div className='form-input'>
            <label className='visually-hidden'>Минимальная цена</label>
            <input
              type='number'
              placeholder={priceStart?.toString()}
              id='priceMin'
              name='от'
            />
          </div>
          <div className='form-input'>
            <label className='visually-hidden'>Максимальная цена</label>
            <input
              type='number'
              placeholder={priceEnd?.toString()}
              id='priceMax'
              name='до'
            />
          </div>
        </div>
      </fieldset>
      <fieldset className='catalog-filter__block' onChange={handleTypeChange}>
        <legend className='catalog-filter__block-title'>Тип гитар</legend>
        <div className='form-checkbox catalog-filter__block-item'>
          <input
            defaultChecked={params.types.includes(ProductType.Acoustic)}
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
            defaultChecked={params.types.includes(ProductType.Electric)}
            type='checkbox'
            id='electric'
            name='electric'
          />
          <label htmlFor='electric'>Электрогитары</label>
        </div>
        <div className='form-checkbox catalog-filter__block-item'>
          <input
            defaultChecked={params.types.includes(ProductType.Ukulele)}
            className='visually-hidden'
            type='checkbox'
            id='ukulele'
            name='ukulele'
          />
          <label htmlFor='ukulele'>Укулеле</label>
        </div>
      </fieldset>
      <fieldset className='catalog-filter__block'>
        <legend className='catalog-filter__block-title'>
          Количество струн
        </legend>

        {[...StringCount.keys()].map((key, index) => {
          const { id, stringCount } = StringCount.get(key) as StringType;
          const isDisable = checkIsDisable(stringCount);
          // eslint-disable-next-line no-console
          console.log('object');
          if (isDisable && params.stringCounts.includes(stringCount)) {
            // eslint-disable-next-line no-console
            console.log('delete');
            dispatch(
              setParams({
                ...params,
                stringCounts: params.stringCounts.filter(
                  (value) => value !== stringCount)}));
          }
          return (
            <div key={id} className='form-checkbox catalog-filter__block-item'>
              <input
                className='visually-hidden'
                type='checkbox'
                id={id}
                name={id}
                value={stringCount}
                checked={params.stringCounts.includes(stringCount)}
                disabled={isDisable}
                onChange={handleStringCountChange}
              />
              <label htmlFor={id}>{stringCount}</label>
            </div>
          );
        })}
      </fieldset>
    </form>
  );
}

export default memo(CatalogFilter);
