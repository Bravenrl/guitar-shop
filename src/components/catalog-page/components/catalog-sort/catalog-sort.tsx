import { useDispatch, useSelector } from 'react-redux';
import { OrderKey, SortKey } from '../../../../const';
import { getOrderKey, getSortKey } from '../../../../store/app-user/selectors-app-user';
import { setOrderKey, setSortKey } from '../../../../store/app-user/slice-app-user';

function CatalogSort(): JSX.Element {
  const sortKey = useSelector(getSortKey);
  const orderKey = useSelector(getOrderKey);
  const dispatch = useDispatch();

  const handleOrderButton = (key:OrderKey) => {
    if (sortKey === '') {
      dispatch(setSortKey(SortKey.Price));
    }
    dispatch(setOrderKey(key));
  };

  return (
    <div className='catalog-sort'>
      <h2 className='catalog-sort__title'>Сортировать:</h2>
      <div className='catalog-sort__type'>
        <button
          className={`catalog-sort__type-button
            ${(sortKey===SortKey.Price)?'catalog-sort__type-button--active':''}`}
          aria-label='по цене'
          tabIndex={-1}
          onClick={()=>dispatch(setSortKey(SortKey.Price))}
        >
          по цене
        </button>
        <button
          className={`catalog-sort__type-button
            ${(sortKey===SortKey.Rating)?'catalog-sort__type-button--active':''}`}
          aria-label='по популярности'
          onClick={()=>dispatch(setSortKey(SortKey.Rating))}
        >
          по популярности
        </button>
      </div>
      <div className='catalog-sort__order'>
        <button
          className={`catalog-sort__order-button
            catalog-sort__order-button--up
            ${(orderKey===OrderKey.Asc)?'catalog-sort__order-button--active':''}`}
          aria-label='По возрастанию'
          tabIndex={-1}
          onClick={()=>handleOrderButton(OrderKey.Asc)}
        >
        </button>
        <button
          className={`catalog-sort__order-button catalog-sort__order-button--down
          ${(orderKey===OrderKey.Desc)?'catalog-sort__order-button--active':''}`}
          aria-label='По убыванию'
          onClick={()=>handleOrderButton(OrderKey.Desc)}
        >
        </button>
      </div>
    </div>
  );
}

export default CatalogSort;
