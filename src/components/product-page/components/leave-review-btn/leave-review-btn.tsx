import { useDispatch } from 'react-redux';
import { toggleIsReviewOpen } from '../../../../store/app-process/slice-app-process';

function LeaveReviewBtn(): JSX.Element {
  const dispatch = useDispatch();
  return (
    <a
      className='button button--red-border button--big reviews__sumbit-button'
      href='todo'
      onClick={(evt) => {
        evt.preventDefault();
        dispatch(toggleIsReviewOpen(true));
      }}
    >
      Оставить отзыв
    </a>
  );
}

export default LeaveReviewBtn;
