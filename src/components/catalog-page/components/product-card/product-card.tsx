
import { memo } from 'react';
import { generatePath, Link } from 'react-router-dom';
import { AppRoute, StarsSize } from '../../../../const';
import { Product } from '../../../../types/data';
import StarsRating from '../../../common/stars-rating/stars-rating';

type ProductCardProps = {
  product: Product;
};
function ProductCard({ product }: ProductCardProps): JSX.Element | null {
  const { name, previewImg, price, id, rating, comments } = product;
  const productInfoPath = generatePath(AppRoute.Product, { id: id.toString() });


  return (
    <div className='product-card'>
      <img src={previewImg} width='75' height='190' alt={name} />
      <div className='product-card__info'>
        <div className='rate product-card__rate' aria-hidden='true'>
          <span className='visually-hidden'>Рейтинг:</span>
          <StarsRating rating={rating} size = {StarsSize.ProductCard}/>
          <span className='rate__count'>{comments.length}</span>
          <span className='rate__message'></span>
        </div>
        <p className='product-card__title'>{name}</p>
        <p className='product-card__price'>
          <span className='visually-hidden'>Цена:</span>
          {price} ₽
        </p>
      </div>
      <div className='product-card__buttons'>
        <Link className='button button--mini' to={`/${productInfoPath}`}>
          Подробнее
        </Link>
        <a
          className='button button--red button--mini button--add-to-cart'
          href='todo'
        >
          Купить
        </a>
      </div>
    </div>
  );
}

export default memo(ProductCard);
