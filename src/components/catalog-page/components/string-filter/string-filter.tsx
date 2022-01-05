import { ChangeEvent, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StringCount } from '../../../../const';
import useDisable from '../../../../hooks/use-disable';
import { fetchFilteredProducts } from '../../../../store/api-actions';
import { getFilter } from '../../../../store/app-user/selectors-app-user';
import { StringType } from '../../../../types/data';

type StringFilterProps = {
  page: number
}

function StringFilter({page}: StringFilterProps): JSX.Element {
  const dispatch = useDispatch();
  const filter = useSelector(getFilter);
  const { stringCounts } = filter;
  const checkIsDisable = useDisable();

  const handleStringCountChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const stringCount = evt.target.value;
    const actualCounts = stringCounts.includes(stringCount)
      ? stringCounts.filter((value) => value !== stringCount)
      : [...stringCounts, stringCount];
    const actualFilter = { ...filter, stringCounts: actualCounts };
    dispatch(fetchFilteredProducts(page, actualFilter));
  };

  return (
    <fieldset className='catalog-filter__block'>
      <legend className='catalog-filter__block-title'>Количество струн</legend>

      {[...StringCount.keys()].map((key) => {
        const { id, stringCount } = StringCount.get(key) as StringType;
        return (
          <div key={id} className='form-checkbox catalog-filter__block-item'>
            <input
              className='visually-hidden'
              type='checkbox'
              id={id}
              name={id}
              value={stringCount}
              checked={stringCounts.includes(stringCount)&&!checkIsDisable(stringCount)}
              disabled={checkIsDisable(stringCount)}
              onChange={handleStringCountChange}
            />
            <label htmlFor={id}>{stringCount}</label>
          </div>
        );
      })}
    </fieldset>
  );
}

export default memo(StringFilter);
