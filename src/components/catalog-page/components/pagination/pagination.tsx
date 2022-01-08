import { memo } from 'react';
import { useSelector } from 'react-redux';
import { generatePath, Link } from 'react-router-dom';
import {
  AppRoute,
  FIRST_PAGE_NUM,
  PRODUCT_PAGE_LIMIT
} from '../../../../const';
import usePages from '../../../../hooks/use-pages';
import { getProductsCount } from '../../../../store/app-data/selectors-app-data';

type PaginationProps = {
  page: number;
};

function Pagination({ page }: PaginationProps): JSX.Element | null {
  const productsCount = useSelector(getProductsCount);
  const pages = usePages(page);
  const prevPagePath = generatePath(`${AppRoute.Root}${AppRoute.Catalog}`, {
    number: (page - 1).toString(),
  });
  const nextPagePath = generatePath(`${AppRoute.Root}${AppRoute.Catalog}`, {
    number: (page + 1).toString(),
  });

  if (productsCount === null) {
    return null;
  }

  const lastPage = productsCount / PRODUCT_PAGE_LIMIT;
  return (
    <div className='pagination page-content__pagination'>
      <ul className='pagination__list'>
        {page !== FIRST_PAGE_NUM && (
          <li className='pagination__page pagination__page--prev' id='prev'>
            <Link to={prevPagePath} className='link pagination__page-link'>
              Назад
            </Link>
          </li>
        )}
        {pages.map((value) => {
          const pagePath = generatePath(`${AppRoute.Root}${AppRoute.Catalog}`, {
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
              <Link to={pagePath} className='link pagination__page-link'>
                {value}
              </Link>
            </li>
          );
        })}
        {page < lastPage && (
          <li className='pagination__page pagination__page--next' id='next'>
            <Link to={nextPagePath} className='link pagination__page-link'>
              Далее
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
}

export default memo(Pagination);
