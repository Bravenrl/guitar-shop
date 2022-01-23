import { useSelector } from 'react-redux';
import { StarsSize } from '../../../../const';
import { getCurrentComments } from '../../../../store/app-data/selectors-app-data';
import StarsRating from '../../../common/stars-rating/stars-rating';

type ProductRatingProps = {
  rating: number;
};


function ProductRating({ rating }: ProductRatingProps): JSX.Element {
  const commentsCounst = useSelector(getCurrentComments).length;
  return (
    <div className='rate product-container__rating' aria-hidden='true'>
      <span className='visually-hidden'>Рейтинг:</span>
      <StarsRating rating={rating} size = {StarsSize.ProductInfo} />
      <span className='rate__count'>{commentsCounst}</span>
      <span className='rate__message'></span>
    </div>
  );
}

export default ProductRating;
