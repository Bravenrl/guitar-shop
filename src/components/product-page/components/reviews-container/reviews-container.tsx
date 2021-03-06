import { useDispatch, useSelector } from 'react-redux';
import { getSortedComments } from '../../../../store/app-data/selectors-app-data';
import LeaveReviewBtn from '../leave-review-btn/leave-review-btn';
import ProductReview from '../product-review/product-review';
import ScrollBtn from '../scroll-btn/scroll-btn';
import ShowMoreBtn from '../show-more-btn/show-more-btn';
import { getCommentsCounter } from '../../../../store/app-data/selectors-app-data';
import { resetCommentsCounter } from '../../../../store/app-data/slice-app-data';
import { useEffect } from 'react';

function ReviewsContainer(): JSX.Element {
  const currentComments = useSelector(getSortedComments);
  const commentsCounter = useSelector(getCommentsCounter);
  const dispatch = useDispatch();

  useEffect(() => () => {
    dispatch(resetCommentsCounter());
  }, [dispatch]);


  return (
    <section className='reviews'>
      <h3 className='reviews__title title title--bigger'> {currentComments.length===0 ? 'Отзывов ещё нет' : 'Отзывы'}</h3>

      <LeaveReviewBtn />
      {currentComments.slice(0, commentsCounter).map((comment) => (
        <ProductReview key={comment.id} review={comment} />
      ))}
      {commentsCounter < currentComments.length && (
        <ShowMoreBtn />
      )}
      {currentComments.length!==0&&<ScrollBtn />}
    </section>
  );
}

export default ReviewsContainer;
