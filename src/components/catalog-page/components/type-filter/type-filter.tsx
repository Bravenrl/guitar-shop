import { ChangeEvent, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GuitarsType } from '../../../../const';
import useUncheck from '../../../../hooks/use-uncheck/use-uncheck';
import { fetchFilteredProducts } from '../../../../store/api-actions';
import { getFilter } from '../../../../store/app-user/selectors-app-user';
import { GuitarType } from '../../../../types/data';
import { FilterState } from '../../../../types/state';

type TypeFilterProps = {
  page:number
}

function TypeFilter({page}: TypeFilterProps): JSX.Element {
  const filter = useSelector(getFilter);
  const { productTypes } = filter;
  const dispatch = useDispatch();
  const setUnchecked = useUncheck(filter);

  const handleTypeChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const currentType = evt.target.value;
    const actualTypes = productTypes.includes(currentType)
      ? productTypes.filter((value) => value !== currentType)
      : [...productTypes, currentType];
    const actualCounts = setUnchecked(actualTypes);
    const actualFilter = { ...filter, productTypes: actualTypes, stringCounts: actualCounts} as FilterState;
    dispatch(fetchFilteredProducts(actualFilter, page));
  };

  return (
    <fieldset className='catalog-filter__block'>
      <legend className='catalog-filter__block-title'>Тип гитар</legend>
      {[...GuitarsType.keys()].map((key) => {
        const { id, title } = GuitarsType.get(key) as GuitarType;

        return (
          <div key={id} className='form-checkbox catalog-filter__block-item'>
            <input
              checked={productTypes.includes(id)}
              className='visually-hidden'
              type='checkbox'
              id={id}
              name={id}
              value={id}
              onChange={handleTypeChange}
              data-testid={id}
            />
            <label htmlFor={id}>{title}</label>
          </div>
        );
      })}
    </fieldset>
  );
}

export default memo(TypeFilter);
