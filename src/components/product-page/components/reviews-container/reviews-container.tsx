import { useState } from 'react';
import { useSelector } from 'react-redux';
import { INIT_COMMENTS_COUNT } from '../../../../const';
import { getSortedComments } from '../../../../store/app-data/selectors-app-data';
import LeaveReviewBtn from '../leave-review-btn/leave-review-btn';
import ModalReview from '../../../modals/modal-review/modal-review';
import ProductReview from '../product-review/product-review';
import ScrollBtn from '../scroll-btn/scroll-btn';
import ShowMoreBtn from '../show-more-btn/show-more-btn';
import ModalSuccess from '../../../modals/modal-success/modal-success';

function ReviewsContainer(): JSX.Element {
  const currentComments = useSelector(getSortedComments);
  const [commentsCount, setCommentsCount] = useState(INIT_COMMENTS_COUNT);

  const handleShowMoreBtnClick = () => {
    setCommentsCount((prevCount) => prevCount + INIT_COMMENTS_COUNT);
  };


  return (
    <section className='reviews'>
      <h3 className='reviews__title title title--bigger'>Отзывы</h3>

      <LeaveReviewBtn />
      {currentComments.slice(0, commentsCount).map((comment) => (
        <ProductReview key={comment.id} review={comment} />
      ))}
      {commentsCount < currentComments.length && (
        <ShowMoreBtn onBtnClick={handleShowMoreBtnClick} />
      )}
      <ScrollBtn />
      <ModalReview />
      <ModalSuccess />
    </section>
  );
}

export default ReviewsContainer;
