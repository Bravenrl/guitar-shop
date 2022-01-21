import React from 'react';

function ProductPrice(): JSX.Element  {
  return (
    <div className='product-container__price-wrapper'>
      <p className='product-container__price-info product-container__price-info--title'>
        Цена:
      </p>
      <p className='product-container__price-info product-container__price-info--value'>
        52 000 ₽
      </p>
      <a
        className='button button--red button--big product-container__button'
        href='todo'
      >
        Добавить в корзину
      </a>
    </div>
  );
}

export default ProductPrice;
