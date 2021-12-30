import { ChangeEvent, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StringCount } from '../../../../const';
import useDisable from '../../../../hooks/use-disable';
import { getStringCounts } from '../../../../store/app-user/selectors-app-user';
import { setStringCounts } from '../../../../store/app-user/slice-app-user';
import { StringType } from '../../../../types/data';

function StringFilter(): JSX.Element {
  const dispatch = useDispatch();
  const stringCounts = useSelector(getStringCounts);
  const checkIsDisable = useDisable();

  const handleStringCountChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const stringCount = evt.target.value;
    stringCounts.includes(stringCount)
      ? dispatch(
        setStringCounts(
          stringCounts.filter((value) => value !== stringCount)),
      )
      : dispatch(setStringCounts([...stringCounts, stringCount]));
  };
  return (
    <fieldset className='catalog-filter__block'>
      <legend className='catalog-filter__block-title'>Количество струн</legend>

      {[...StringCount.keys()].map((key, index) => {
        const { id, stringCount } = StringCount.get(key) as StringType;
        return (
          <div key={id} className='form-checkbox catalog-filter__block-item'>
            <input
              className='visually-hidden'
              type='checkbox'
              id={id}
              name={id}
              value={stringCount}
              checked={stringCounts.includes(stringCount)}
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
