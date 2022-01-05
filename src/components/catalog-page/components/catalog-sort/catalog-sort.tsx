import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { OrderKey, SortKey } from '../../../../const';
import { fetchSortedProducts } from '../../../../store/api-actions';
import { getSort } from '../../../../store/app-user/selectors-app-user';

function CatalogSort(): JSX.Element {
  const sort = useSelector(getSort);
  const {sortKey, orderKey} = sort;
  const dispatch = useDispatch();
  const { number } = useParams();
  const page = Number(number);

  const handleOrderButton = (key:OrderKey) => {
    let actualSort = sort;
    if (sortKey === '') {
      actualSort = {...actualSort, sortKey: SortKey.Price};
    }
    actualSort = {...actualSort, orderKey: key};
    dispatch(fetchSortedProducts(page, actualSort));
  };

  const handleSortButton = (key: SortKey) => {
    const actualSort = {...sort, sortKey: key};
    dispatch(fetchSortedProducts(page, actualSort));
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
          onClick={()=>handleSortButton(SortKey.Price)}
        >
          по цене
        </button>
        <button
          className={`catalog-sort__type-button
            ${(sortKey===SortKey.Rating)?'catalog-sort__type-button--active':''}`}
          aria-label='по популярности'
          onClick={()=>handleSortButton(SortKey.Rating)}
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
