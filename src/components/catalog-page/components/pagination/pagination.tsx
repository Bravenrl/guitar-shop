import { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { generatePath, Link } from 'react-router-dom';
import {
  AppRoute,
  FIRST_PAGE_NUM,
  PRODUCT_PAGE_LIMIT
} from '../../../../const';
import { TestID } from '../../../../const-test';
import usePages from '../../../../hooks/use-pages/use-pages';
import { fetchOnPageProducts } from '../../../../store/api-actions';
import { getProductsCount } from '../../../../store/app-data/selectors-app-data';

type PaginationProps = {
  page: number;
};

function Pagination({ page }: PaginationProps): JSX.Element | null {
  const dispatch = useDispatch();
  const productsCount = useSelector(getProductsCount);
  const pages = usePages(page);
  const prevPage = page - 1;
  const nextPage = page + 1;
  const prevPagePath = generatePath(`${AppRoute.Root}${AppRoute.Catalog}`, {
    number: prevPage.toString(),
  });
  const nextPagePath = generatePath(`${AppRoute.Root}${AppRoute.Catalog}`, {
    number: nextPage.toString(),
  });

  if (productsCount === null) {
    return null;
  }

  const lastPage = Math.ceil(productsCount / PRODUCT_PAGE_LIMIT);
  return (
    <div className='pagination page-content__pagination'>
      <ul className='pagination__list'>
        <li
          className='pagination__page pagination__page--prev'
          id='prev'
          style={{ visibility: page === FIRST_PAGE_NUM ? 'hidden' : 'visible' }}
          data-testid = {TestID.Back}
        >
          <Link
            to={prevPagePath}
            className='link pagination__page-link'
            onClick={() => {
              dispatch(fetchOnPageProducts(prevPage));
            }}
          >
            Назад
          </Link>
        </li>

        {pages.map((value) => {
          const pagePath = generatePath(`${AppRoute.Catalog}`, {
            number: value.toString(),
          });
          if (value > lastPage) {
            return null;
          }
          return (
            <li
              key={value}
              className={`pagination__page
          ${value === page ? 'pagination__page--active' : ''}`}
            >
              <Link
                to={`/${pagePath}`}
                className='link pagination__page-link'
                onClick={() => dispatch(fetchOnPageProducts(value))}
                data-testid = {TestID.Pagination}
              >
                {value}
              </Link>
            </li>
          );
        })}
        <li
          className='pagination__page pagination__page--next'
          id='next'
          style={{ visibility: page >= lastPage ? 'hidden' : 'visible' }}
          data-testid = {TestID.Next}
        >
          <Link
            to={nextPagePath}
            className='link pagination__page-link'
            onClick={() => dispatch(fetchOnPageProducts(nextPage))}
          >
            Далее
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default memo(Pagination);
