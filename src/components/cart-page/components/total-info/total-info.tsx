import { useDispatch, useSelector } from 'react-redux';
import { postOrder } from '../../../../store/api-actions';
import {
  getCoupon,
  getOrderIds,
  getSumTotalPrices,
  getTotalDiscount
} from '../../../../store/app-user/selectors-app-user';

function TotalInfo(): JSX.Element {
  const sumTotalPrices = useSelector(getSumTotalPrices);
  const totalDiscount = useSelector(getTotalDiscount);
  const coupon = useSelector(getCoupon).value;
  const guitarsIds = useSelector(getOrderIds);

  const dispatch = useDispatch();
  return (
    <div className='cart__total-info'>
      <p className='cart__total-item'>
        <span className='cart__total-value-name'>Всего:</span>
        <span className='cart__total-value'>{sumTotalPrices} ₽</span>
      </p>
      <p className='cart__total-item'>
        <span className='cart__total-value-name'>Скидка:</span>
        <span
          className={`cart__total-value ${
            !!totalDiscount && 'cart__total-value--bonus'
          }`}
        >
          {totalDiscount} ₽
        </span>
      </p>
      <p className='cart__total-item'>
        <span className='cart__total-value-name'>К оплате:</span>
        <span className='cart__total-value cart__total-value--payment'>
          {sumTotalPrices - totalDiscount} ₽
        </span>
      </p>
      <button
        onClick={()=>dispatch(postOrder({ guitarsIds, coupon }))}
        className='button button--red button--big cart__order-button'
      >
        Оформить заказ
      </button>
    </div>
  );
}

export default TotalInfo;
