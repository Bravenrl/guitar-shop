import { Link } from 'react-router-dom';
import { AppRoute } from '../../../const';

function Breadcrumbs(): JSX.Element {
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
    </ul>
  );
}

export default Breadcrumbs;
