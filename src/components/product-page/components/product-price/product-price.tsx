type ProductPriceProps = {
  price: number
}


function ProductPrice({price}: ProductPriceProps): JSX.Element  {
  return (
    <div className='product-container__price-wrapper'>
      <p className='product-container__price-info product-container__price-info--title'>
        Цена:
      </p>
      <p className='product-container__price-info product-container__price-info--value'>
        {price} ₽
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
