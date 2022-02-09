import CartCoupon from '../cart-coupon/cart-coupon';
import TotalInfo from '../total-info/total-info';

function CartFooter(): JSX.Element {
  return (
    <div className='cart__footer'>
      <CartCoupon />
      <TotalInfo />
    </div>
  );
}

export default CartFooter;
