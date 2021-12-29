import { ChangeEvent } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import {
  ParamsKey,
  ProductType,
  StringCount
} from '../../../../const';
import useDisable from '../../../../hooks/use-disable';
import {
  getPriceEnd,
  getPriceStart
} from '../../../../store/app-data/selectors-app-data';
import { StringType } from '../../../../types/data';
import { Params } from '../../../../types/params';

function CatalogFilter(): JSX.Element {
  const priceStart = useSelector(getPriceStart);
  const priceEnd = useSelector(getPriceEnd);

  const [searchParams, setSearchParams] = useSearchParams();
  const typeParams = searchParams.getAll(ParamsKey.Type) || [];
  const stringCountParams = searchParams.getAll(ParamsKey.String) || [];
  const params: Params = {
    type: typeParams,
    stringCount: stringCountParams,
  };
  const checkIsDisable = useDisable(params);
  const handleTypeChange = (evt: ChangeEvent<HTMLFieldSetElement>) => {
    const type = evt.target.name;
    typeParams.includes(type)
      ? setSearchParams({
        ...params,
        type: typeParams.filter((value) => value !== type),
      })
      : setSearchParams({ ...params, type: [...typeParams, type] });
  };

  const handleStringCountChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const stringCount = evt.target.value;
    stringCountParams.includes(stringCount)
      ? setSearchParams({
        ...params,
        stringCount: stringCountParams.filter(
          (value) => value !== stringCount,
        ),
      })
      : setSearchParams({
        ...params,
        stringCount: [...stringCountParams, stringCount],
      });
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
            defaultChecked={typeParams.includes(ProductType.Acoustic)}
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
            defaultChecked={typeParams.includes(ProductType.Electric)}
            type='checkbox'
            id='electric'
            name='electric'
          />
          <label htmlFor='electric'>Электрогитары</label>
        </div>
        <div className='form-checkbox catalog-filter__block-item'>
          <input
            defaultChecked={typeParams.includes(ProductType.Ukulele)}
            className='visually-hidden'
            type='checkbox'
            id='ukulele'
            name='ukulele'
          />
          <label htmlFor='ukulele'>Укулеле</label>
        </div>
      </fieldset>
      <fieldset
        className='catalog-filter__block'

      >
        <legend className='catalog-filter__block-title'>
          Количество струн
        </legend>

        {[...StringCount.keys()].map((key) => {
          const { id, stringCount } = StringCount.get(key) as StringType;
          const isDisable = checkIsDisable(stringCount);
          // eslint-disable-next-line no-console
          console.log(isDisable);
          // if (isDisable) {
          //   setSearchParams({
          //     ...params,
          //     stringCount: stringCountParams.filter(
          //       (value) => value !== stringCount,
          //     ),
          //   });
          // }
          return (
            <div key={id} className='form-checkbox catalog-filter__block-item'>
              <input
                className='visually-hidden'
                type='checkbox'
                id={id}
                name={id}
                value={stringCount}
                checked={stringCountParams.includes(stringCount)}
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

export default CatalogFilter;
