
import { memo, useEffect, useRef, useState } from 'react';
import { generatePath, Link } from 'react-router-dom';
import { AppRoute, StarsSize } from '../../../../const';
import { api } from '../../../../services/api';
import { ApiRoute } from '../../../../services/const';
import { Guitar } from '../../../../types/data';
import StarsRating from '../../../common/stars-rating/stars-rating';

type ProductCardProps = {
  product: Guitar;
};
function ProductCard({ product }: ProductCardProps): JSX.Element | null {
  const { name, previewImg, price, id, rating } = product;
  const [commentsCount, setCommentsCount] = useState(0);
  const [isCommentsGet, setIsCommentsGet] = useState(false);
  const productInfoPath = generatePath(AppRoute.Product, { id: id.toString() });
  const mountedRef = useRef(true);
  useEffect(() => {
    api
      .get<Comment[]>(`${ApiRoute.Products}/${id}${ApiRoute.Comments}`, {
      })
      .then(({ data }) => {
        if  (!mountedRef.current) {
          return;
        }
        setCommentsCount(data.length);
        setIsCommentsGet(true);
      })
      .catch();
    return () => {
      mountedRef.current = false;
    };
  }, [id]);

  if (!isCommentsGet) {
    return null;
  }

  return (
    <div className='product-card'>
      <img src={previewImg} width='75' height='190' alt={name} />
      <div className='product-card__info'>
        <div className='rate product-card__rate' aria-hidden='true'>
          <span className='visually-hidden'>Рейтинг:</span>
          <StarsRating rating={rating} size = {StarsSize.ProductCard}/>
          <span className='rate__count'>{commentsCount}</span>
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
