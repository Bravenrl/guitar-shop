function ProductRating() {
  return (
    <div className='rate product-container__rating' aria-hidden='true'>
      <span className='visually-hidden'>Рейтинг:</span>
      <svg width='14' height='14' aria-hidden='true'>
        <use xlinkHref='#icon-full-star'></use>
      </svg>
      <svg width='14' height='14' aria-hidden='true'>
        <use xlinkHref='#icon-full-star'></use>
      </svg>
      <svg width='14' height='14' aria-hidden='true'>
        <use xlinkHref='#icon-full-star'></use>
      </svg>
      <svg width='14' height='14' aria-hidden='true'>
        <use xlinkHref='#icon-full-star'></use>
      </svg>
      <svg width='14' height='14' aria-hidden='true'>
        <use xlinkHref='#icon-star'></use>
      </svg>
      <span className='rate__count'></span>
      <span className='rate__message'></span>
    </div>
  );
}

export default ProductRating;
