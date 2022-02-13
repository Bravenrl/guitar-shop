import { useSelector } from 'react-redux';
import { getSumTotalPrices } from '../../../../store/app-user/selectors-app-user';

function TotalInfo(): JSX.Element {
  const sumTotalPrices = useSelector(getSumTotalPrices);
  return (
    <div className='cart__total-info'>
      <p className='cart__total-item'>
        <span className='cart__total-value-name'>Всего:</span>
        <span className='cart__total-value'>{sumTotalPrices} ₽</span>
      </p>
      <p className='cart__total-item'>
        <span className='cart__total-value-name'>Скидка:</span>
        <span className='cart__total-value cart__total-value--bonus'>
          - 3000 ₽
        </span>
      </p>
      <p className='cart__total-item'>
        <span className='cart__total-value-name'>К оплате:</span>
        <span className='cart__total-value cart__total-value--payment'>
          {sumTotalPrices} ₽
        </span>
      </p>
      <button className='button button--red button--big cart__order-button'>
        Оформить заказ
      </button>
    </div>
  );
}

export default TotalInfo;
