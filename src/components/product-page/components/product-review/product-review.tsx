import { StarsSize } from '../../../../const';
import { Comment } from '../../../../types/data';
import { getFormatDate } from '../../../../utils';
import StarsRating from '../../../common/stars-rating/stars-rating';

type ProductReviewProps = {
  review: Comment
}

function ProductReview({review}: ProductReviewProps): JSX.Element {
  const {
    userName,
    advantage,
    disadvantage,
    comment,
    rating,
    createAt,
  } = review;
  const date = getFormatDate(createAt);

  return (
    <div className='review'>
      <div className='review__wrapper'>
        <h4 className='review__title review__title--author title title--lesser'>
          {userName}
        </h4>
        <span className='review__date'>{date}</span>
      </div>
      <div className='rate review__rating-panel' aria-hidden='true'>
        <span className='visually-hidden'>Рейтинг:</span>
        <StarsRating rating={rating} size = {StarsSize.ProductReview} />
        <span className='rate__count'></span>
        <span className='rate__message'></span>
      </div>
      <h4 className='review__title title title--lesser'>Достоинства:</h4>
      <p className='review__value'>
        {advantage}
      </p>
      <h4 className='review__title title title--lesser'>Недостатки:</h4>
      <p className='review__value'>
        {disadvantage}
      </p>
      <h4 className='review__title title title--lesser'>Комментарий:</h4>
      <p className='review__value'>
        {comment}
      </p>
    </div>
  );
}

export default ProductReview;
