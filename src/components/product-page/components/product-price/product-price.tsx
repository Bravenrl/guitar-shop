import { useDispatch } from 'react-redux';
import { addTempItemCart } from '../../../../store/app-data/slice-app-data';
import { toggleIsCartAddOpen } from '../../../../store/app-process/slice-app-process';
import { Guitar } from '../../../../types/data';

type ProductPriceProps = {
  product: Guitar;
}


function ProductPrice({product}: ProductPriceProps): JSX.Element  {
  const dispatch = useDispatch();

  const handleOnAddBtnClick = () => {
    dispatch(addTempItemCart(product));
    dispatch(toggleIsCartAddOpen(true));
  };

  return (
    <div className='product-container__price-wrapper'>
      <p className='product-container__price-info product-container__price-info--title'>
        Цена:
      </p>
      <p className='product-container__price-info product-container__price-info--value'>
        {product.price} ₽
      </p>
      <button
        onClick = {handleOnAddBtnClick}
        className='button button--red button--big product-container__button'
      >
        Добавить в корзину
      </button>
    </div>
  );
}

export default ProductPrice;
