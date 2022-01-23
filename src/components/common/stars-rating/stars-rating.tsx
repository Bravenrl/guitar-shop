import { STAR_NUMBERS } from '../../../const';
import { TestID } from '../../../const-test';

type StarsRatingProps = {
  rating: number;
  size: { width: number; height: number };
};

function StarsRating({ rating, size }: StarsRatingProps): JSX.Element {
  const { width, height } = size;
  return (
    <>
      {STAR_NUMBERS.map((number) => {
        const isFullStar = number <= rating;
        return (
          <svg
            key={number}
            width={`${width}`}
            height={`${height}`}
            aria-hidden='true'
            data-testid = {isFullStar ? TestID.FullStar : TestID.Star}
          >
            <use
              xlinkHref={isFullStar ? '#icon-full-star' : '#icon-star'}
            >
            </use>
          </svg>
        );
      })}
    </>
  );
}

export default StarsRating;
