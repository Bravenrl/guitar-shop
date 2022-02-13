import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../../const';
import { getTotalInCart } from '../../../store/app-user/selectors-app-user';

function CartLogo() {
  const totalInCart = useSelector(getTotalInCart);
  return (
    <Link
      className='header__cart-link'
      to={`/${AppRoute.Cart}`}
      aria-label='Корзина'
    >
      <svg
        className='header__cart-icon'
        width='14'
        height='14'
        aria-hidden='true'
      >
        <use xlinkHref='#icon-basket'></use>
      </svg>
      <span className='visually-hidden'>Перейти в корзину</span>
      {!!totalInCart && (
        <span className='header__cart-count'>{totalInCart}</span>
      )}
    </Link>
  );
}

export default CartLogo;
