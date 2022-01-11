import { useEffect, useState } from 'react';
import { generatePath, Link } from 'react-router-dom';
import { AppRoute, STAR_NUMBERS } from '../../../../const';
import { api } from '../../../../services/api';
import { ApiRoute } from '../../../../services/const';
import { Guitar } from '../../../../types/data';

type ProductCardProps = {
  product: Guitar;
};
function ProductCard({ product }: ProductCardProps): JSX.Element | null {
  const { name, previewImg, price, id, rating} = product;
  const [commentsCount, setCommentsCount] = useState(0);
  const [isCommentsGet, setIsCommentsGet] = useState(false);
  const productInfoPath = generatePath(AppRoute.Product, {id: id.toString()});

  useEffect(() => {
    api
      .get<Comment[]>(`${ApiRoute.Products}/${id}${ApiRoute.Comments}`)
      .then(({ data }) => {
        setCommentsCount(data.length);
        setIsCommentsGet(true);
      });
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
          {STAR_NUMBERS.map((number) => (
            <svg key = {number} width='12' height='11' aria-hidden='true'>
              <use xlinkHref= {(number <= rating) ? '#icon-full-star' : '#icon-star'}></use>
            </svg>
          ))}
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
        <Link className='button button--mini' to={productInfoPath}>
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

export default ProductCard;
