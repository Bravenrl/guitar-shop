import LeaveReviewBtn from '../leave-review-btn/leave-review-btn';
// import ModalReview from '../modal-review/modal-review';
// import ModalSuccess from '../modal-success/modal-success';
import ProductReview from '../product-review/product-review';
import ScrollBtn from '../scroll-btn/scroll-btn';
import ShowMoreBtn from '../show-more-btn/show-more-btn';

function ReviewsContainer(): JSX.Element {
  return (
    <section className='reviews'>
      <h3 className='reviews__title title title--bigger'>Отзывы</h3>

      <LeaveReviewBtn />
      <ProductReview />
      <ShowMoreBtn />
      <ScrollBtn />
      {/* <ModalReview/> */}
      {/* <ModalSuccess/> */}
    </section>
  );
}

export default ReviewsContainer;
