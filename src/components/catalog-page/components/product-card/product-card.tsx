import { memo } from 'react';
import { useSelector } from 'react-redux';
import { generatePath, Link, useLocation } from 'react-router-dom';
import { AppRoute, StarsSize } from '../../../../const';
import { getInCart } from '../../../../store/app-user/selectors-app-user';
import { Product } from '../../../../types/data';
import StarsRating from '../../../common/stars-rating/stars-rating';
import ButtonAddCart from '../button-add-cart/button-add-cart';
import ButtonInCart from '../button-in-cart/button-in-cart';

type ProductCardProps = {
  product: Product;
};
function ProductCard({ product }: ProductCardProps): JSX.Element | null {
  const location = useLocation();
  const { name, previewImg, price, id, rating, comments } = product;
  const productInfoPath = generatePath(AppRoute.Product, { id: id.toString() });
  const inCart = useSelector(getInCart);

  return (
    <div className='product-card'>
      <img src={previewImg} width='75' height='190' alt={name} />
      <div className='product-card__info'>
        <div className='rate product-card__rate' aria-hidden='true'>
          <span className='visually-hidden'>Рейтинг:</span>
          <StarsRating rating={rating} size={StarsSize.ProductCard} />
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
        <Link
          state={{ from: location.pathname+location.search }}
          className='button button--mini'
          to={`/${productInfoPath}`}
        >
          Подробнее
        </Link>
        {id in inCart ? <ButtonInCart /> : <ButtonAddCart product={product} />}
      </div>
    </div>
  );
}

export default memo(ProductCard);
