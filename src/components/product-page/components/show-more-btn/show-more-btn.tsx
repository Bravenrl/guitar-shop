import { useDispatch } from 'react-redux';
import { incrementCommentsCounter } from '../../../../store/app-data/slice-app-data';

function ShowMoreBtn(): JSX.Element {
  const dispatch = useDispatch();
  return (
    <button
      className='button button--medium reviews__more-button'
      onClick={() => dispatch(incrementCommentsCounter())}
    >
      Показать еще отзывы
    </button>
  );
}

export default ShowMoreBtn;
