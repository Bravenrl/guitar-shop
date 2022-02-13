import { useDispatch } from 'react-redux';
import { GuitarsType } from '../../../../const';
import { addTempItemCart } from '../../../../store/app-data/slice-app-data';
import { toggleIsCartDeleteOpen } from '../../../../store/app-process/slice-app-process';
import { Guitar } from '../../../../types/data';
import CartQuantity from '../cart-quantity/cart-quantity';

type CartItemProps = {
  product: Guitar;
};

function CartItem({ product }: CartItemProps): JSX.Element {
  const { name, vendorCode, type, previewImg, stringCount, price } = product;
  const productType = GuitarsType.get(type)?.type;
  const dispatch = useDispatch();
  return (
    <div className='cart-item'>
      <button
        onClick={() => {
          dispatch(addTempItemCart(product));
          dispatch(toggleIsCartDeleteOpen(true));
        }}
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

      <CartQuantity product={product}/>
    </div>
  );
}

export default CartItem;
