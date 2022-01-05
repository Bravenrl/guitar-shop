import { ChangeEvent, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GuitarsType } from '../../../../const';
import useQuery from '../../../../hooks/use-query';
import useUncheck from '../../../../hooks/use-uncheck';
import { fetchProductsShow } from '../../../../store/api-actions';
import { getFilter } from '../../../../store/app-user/selectors-app-user';
import { GuitarType } from '../../../../types/data';
import { FilterState } from '../../../../types/state';

function TypeFilter(): JSX.Element {
  const filter = useSelector(getFilter);
  const query = useQuery();
  const { productTypes } = filter;
  const dispatch = useDispatch();
  const setUnchecked = useUncheck();

  const handleTypeChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const currentType = evt.target.value;
    const actualTypes = productTypes.includes(currentType)
      ? productTypes.filter((value) => value !== currentType)
      : [...productTypes, currentType];
    const actualCounts = setUnchecked(actualTypes);
    const actualFilter = { ...filter, productTypes: actualTypes, stringCounts: actualCounts} as FilterState;
    // eslint-disable-next-line no-console
    console.log(actualFilter);
    dispatch(fetchProductsShow(query, actualFilter));
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
            />
            <label htmlFor={id}>{title}</label>
          </div>
        );
      })}
    </fieldset>
  );
}

export default memo(TypeFilter);
