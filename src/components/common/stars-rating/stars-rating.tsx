import { STAR_NUMBERS } from '../../../const';

type StarsRatingProps = {
  rating: number;
  size: { width: number; height: number };
};

function StarsRating({rating, size}: StarsRatingProps): JSX.Element {
  const {width, height} = size;
  return (
    <>
      {STAR_NUMBERS.map((number) => (
        <svg key={number} width={`${width}`} height={`${height}`} aria-hidden='true'>
          <use
            xlinkHref={number <= rating ? '#icon-full-star' : '#icon-star'}
          >
          </use>
        </svg>
      ))}
    </>
  );
}

export default StarsRating;
