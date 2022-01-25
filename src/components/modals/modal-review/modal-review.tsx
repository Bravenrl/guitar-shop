import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ModalType, StarTitle, STAR_NUMBERS } from '../../../const';
import { getCurrentProduct } from '../../../store/app-data/selectors-app-data';
import { getIsReviewOpen } from '../../../store/app-process/selectors-app-process';
import { toggleIsReviewOpen } from '../../../store/app-process/slice-app-process';
import ModalWrapper from '../modal-wrapper/modal-wrapper';
import './modal-review.css';

function ModalReview(): JSX.Element | null {
  const dispatch = useDispatch();
  const isOpen = useSelector(getIsReviewOpen);
  const {name} = useSelector(getCurrentProduct);

  if (!isOpen) {
    return null;
  }

  return (
    <ModalWrapper modalType={ModalType.Review}>
      <div className='modal__content'>
        <h2 className='modal__header modal__header--review title title--medium'>
            Оставить отзыв
        </h2>
        <h3 className='modal__product-name title title--medium-20 title--uppercase'>
          {name}
        </h3>
        <form className='form-review'>
          <div className='form-review__wrapper'>
            <div className='form-review__name-wrapper'>
              <label
                className='form-review__label form-review__label--required'
                htmlFor='user-name'
              >
                  Ваше Имя
              </label>
              <input
                className='form-review__input form-review__input--name'
                id='user-name'
                type='text'
                autoComplete='off'
              />
              <span className='form-review__warning'>Заполните поле</span>
            </div>
            <div>
              <span className='form-review__label form-review__label--required'>
                  Ваша Оценка
              </span>
              <div className='rate rate--reverse'>
                {[...STAR_NUMBERS].reverse().map((starNumber)=> (
                  <React.Fragment key = {starNumber}>
                    <input
                      className='visually-hidden'
                      type='radio'
                      id={`star-${starNumber}`}
                      name='rate'
                      value={starNumber}
                    />
                    <label
                      className='rate__label'
                      htmlFor={`star-${starNumber}`}
                      title={StarTitle[starNumber]}
                    >
                    </label>
                  </React.Fragment>
                ))}
                <span className='rate__count'></span>
                <span className='rate__message'>Поставьте оценку</span>
              </div>
            </div>
          </div>
          <div className='form-review__other-wrapper'>
            <label className='form-review__label form-review__label--required' htmlFor='user-name'>
              Достоинства
            </label>
            <input
              className='form-review__input form-review__input-other'
              id='pros'
              type='text'
              autoComplete='off'
            />
            <span className='form-review__warning form-review__other-warning'>Заполните поле</span>
          </div>
          <div className='form-review__other-wrapper'>
            <label className='form-review__label form-review__label--required' htmlFor='user-name'>
              Недостатки
            </label>
            <input
              className='form-review__input form-review__input-other'
              id='user-name'
              type='text'
              autoComplete='off'
            />
            <span className='form-review__warning form-review__other-warning'>Заполните поле</span>
          </div>
          <div className='form-review__other-wrapper'>
            <label className='form-review__label form-review__label--required' htmlFor='user-name'>
              Комментарий
            </label>
            <textarea
              className='form-review__input form-review__input--textarea form-review__input-other'
              id='user-name'
              rows={10}
              autoComplete='off'
            >
            </textarea>
            <span className='form-review__warning form-review__other-warning'>Заполните поле</span>
          </div>
          <button
            className='button button--medium-20 form-review__button'
            type='submit'
          >
              Отправить отзыв
          </button>
        </form>
        <button
          className='modal__close-btn button-cross'
          type='button'
          aria-label='Закрыть'
          onClick={()=>{dispatch(toggleIsReviewOpen(false));}}
        >
          <span className='button-cross__icon'></span>
          <span className='modal__close-btn-interactive-area'></span>
        </button>
      </div>
    </ModalWrapper>
  );
}

export default ModalReview;
