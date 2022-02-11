import { useDispatch } from 'react-redux';
import { GuitarsType } from '../../../../const';
import { deleteFromCart } from '../../../../store/app-user/slice-app-user';
import { Guitar } from '../../../../types/data';

type CartItemProps = {
  product: Guitar;
};

function CartItem({ product }: CartItemProps): JSX.Element {
  const { id, name, vendorCode, type, previewImg, stringCount, price } =
    product;
  const productType = GuitarsType.get(type)?.type;
  const dispatch = useDispatch();
  return (
    <div className='cart-item'>
      <button
        onClick={() => dispatch(deleteFromCart(id))}
        className='cart-item__close-button button-cross'
        type='button'
        aria-label='Удалить'
      >
        <span className='button-cross__icon'></span>
        <span className='cart-item__close-button-interactive-area'></span>
      </button>
      <div className='cart-item__image'>
        <img src={previewImg} width='55' height='130' alt={name} />
      </div>
      <div className='product-info cart-item__info'>
        <p className='product-info__title'>
          {productType} {name}
        </p>
        <p className='product-info__info'>Артикул: {vendorCode}</p>
        <p className='product-info__info'>
          {productType}, {stringCount} струнная
        </p>
      </div>
      <div className='cart-item__price'>{price} ₽</div>
      <div className='quantity cart-item__quantity'>
        <button className='quantity__button' aria-label='Уменьшить количество'>
          <svg width='8' height='8' aria-hidden='true'>
            <use xlinkHref='#icon-minus'></use>
          </svg>
        </button>
        <input
          className='quantity__input'
          type='number'
          placeholder='1'
          id='2-count'
          name='2-count'
          max='99'
        />
        <button className='quantity__button' aria-label='Увеличить количество'>
          <svg width='8' height='8' aria-hidden='true'>
            <use xlinkHref='#icon-plus'></use>
          </svg>
        </button>
      </div>
      <div className='cart-item__price-total'>17 500 ₽</div>
    </div>
  );
}

export default CartItem;
