import { Link } from 'react-router-dom';
import { AppRoute } from '../../../../const';

function ButtonInCart() {
  return (
    <Link
      to={`/${AppRoute.Cart}`}
      className='button button--red-border button--mini button--in-cart'
    >
      В Корзине
    </Link>
  );
}

export default ButtonInCart;
