import { useSelector } from 'react-redux';
import { generatePath, Link, useMatch } from 'react-router-dom';
import { AppRoute, Title } from '../../../const';
import { getCurrentProduct } from '../../../store/app-data/selectors-app-data';

function Breadcrumbs(): JSX.Element {
  const { name, id } = useSelector(getCurrentProduct);
  const productPath = generatePath(AppRoute.Product, { id: id.toString() });
  const isCartPage = useMatch(AppRoute.Cart);
  const isProductPage = useMatch(AppRoute.Product);
  return (
    <ul className='breadcrumbs page-content__breadcrumbs'>
      <li className='breadcrumbs__item'>
        <Link className='link' to={AppRoute.Root}>
          Главная
        </Link>
      </li>
      <li className='breadcrumbs__item'>
        <Link className='link' to={AppRoute.Root}>
          Каталог
        </Link>
      </li>
      {isProductPage && (
        <li className='breadcrumbs__item'>
          <Link className='link' to={`/${productPath}`}>
            {name}
          </Link>
        </li>
      )}
      {isCartPage && (
        <li className='breadcrumbs__item'>
          <Link className='link' to={`/${AppRoute.Cart}`}>
            {Title.Cart}
          </Link>
        </li>
      )}
    </ul>
  );
}

export default Breadcrumbs;
