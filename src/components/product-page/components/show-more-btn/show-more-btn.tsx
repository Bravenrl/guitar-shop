type ShowMoreBtnProps = {
  onBtnClick: () => void;
};

function ShowMoreBtn({ onBtnClick }: ShowMoreBtnProps): JSX.Element {
  return (
    <button
      className='button button--medium reviews__more-button'
      onClick={onBtnClick}
    >
      Показать еще отзывы
    </button>
  );
}

export default ShowMoreBtn;
