import { ChangeEvent, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GuitarsType } from '../../../../const';
import { getProductTypes } from '../../../../store/app-user/selectors-app-user';
import { setProductTypes } from '../../../../store/app-user/slice-app-user';
import { GuitarType } from '../../../../types/data';

function TypeFilter(): JSX.Element {
  const dispatch = useDispatch();
  const productTypes = useSelector(getProductTypes);

  const handleTypeChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const currentType = evt.target.value;
    productTypes.includes(currentType)
      ? dispatch(
        setProductTypes(productTypes.filter((value) => value !== currentType)),
      )
      : dispatch(setProductTypes([...productTypes, currentType]));
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
