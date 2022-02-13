import { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MAX_IN_CART } from '../../../../const';
import { addTempItemCart } from '../../../../store/app-data/slice-app-data';
import { toggleIsCartDeleteOpen } from '../../../../store/app-process/slice-app-process';
import { getInCart } from '../../../../store/app-user/selectors-app-user';
import {
  setQuantityCart
} from '../../../../store/app-user/slice-app-user';
import { Guitar } from '../../../../types/data';

type CartQuantityProps = {
  product: Guitar;
};

function CartQuantity({ product }: CartQuantityProps) {
  const { id, price } = product;
  const productCount = useSelector(getInCart)[id];
  const dispatch = useDispatch();
  const [quant, setQuant] = useState(productCount.toString());

  useEffect(() => {
    if (quant === '') {
      return;
    }
    dispatch(setQuantityCart({ id, quantity: +quant }));
  }, [dispatch, id, quant]);

  const handleInputOnChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const count = evt.target.validity.valid ? evt.target.value : quant;
    setQuant(count);
  };

  const handleInputOnBlur = (evt: ChangeEvent<HTMLInputElement>) => {
    if (quant === '') {
      setQuant(productCount.toString());
    }
  };

  return (
    <>
      <div className='quantity cart-item__quantity'>
        <button
          onClick={() => {
            if (+quant === 1) {
              dispatch(addTempItemCart(product));
              dispatch(toggleIsCartDeleteOpen(true));
              return;
            }
            setQuant((prevQuant) => (+prevQuant-1).toString());
          }}
          className='quantity__button'
          aria-label='Уменьшить количество'
        >
          <svg width='8' height='8' aria-hidden='true'>
            <use xlinkHref='#icon-minus'></use>
          </svg>
        </button>
        <input
          onChange={handleInputOnChange}
          onBlur={handleInputOnBlur}
          className='quantity__input'
          type='text'
          id='2-count'
          name='2-count'
          pattern='[1-9]|[1-9][0-9]'
          value={quant}
        />
        <button
          onClick={() => {
            if (+productCount >= MAX_IN_CART) {
              return;
            }
            setQuant((prevQuant) => (+prevQuant+1).toString());
          }}
          className='quantity__button'
          aria-label='Увеличить количество'
        >
          <svg width='8' height='8' aria-hidden='true'>
            <use xlinkHref='#icon-plus'></use>
          </svg>
        </button>
      </div>

      <div className='cart-item__price-total'>{productCount * price} ₽</div>
    </>
  );
}

export default CartQuantity;
