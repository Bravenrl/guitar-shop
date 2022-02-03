import React, { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { ModalType, StarTitle, STAR_NUMBERS } from '../../../const';
import { TestID } from '../../../const-test';
import { postComment } from '../../../store/api-actions';
import { getCurrentProduct } from '../../../store/app-data/selectors-app-data';
import { getIsReviewOpen } from '../../../store/app-process/selectors-app-process';
import { toggleIsReviewOpen } from '../../../store/app-process/slice-app-process';
import { CommentData } from '../../../types/data';
import ModalCloseBtn from '../../common/modal-close-btn/modal-close-btn';
import ModalWrapper from '../../common/modal-wrapper/modal-wrapper';
import './modal-review.css';


function ModalReview(): JSX.Element | null {
  const dispatch = useDispatch();
  const isOpen = useSelector(getIsReviewOpen);
  const {name, id} = useSelector(getCurrentProduct);

  const handleOnCloseClick = () => dispatch(toggleIsReviewOpen(false));

  const {
    register,
    formState: {
      errors,
    },
    handleSubmit,
    reset,
  } = useForm<CommentData>({
    mode: 'onBlur',
    defaultValues: {
      userName: '',
      advantage: '',
      disadvantage: '',
      comment: '',
      rating: 0,
    },
  });

  const onSubmit: SubmitHandler<CommentData> = (comment) => {
    dispatch(
      postComment({
        ...comment,
        guitarId: id,
        rating: Number(comment.rating),
      }),
    );};

  useEffect(() => {
    if (!isOpen) {
      reset();
    }
  }, [isOpen, reset]);

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
        <form className='form-review'
          onSubmit={handleSubmit(onSubmit)}
        >
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
                data-testid = {TestID.InputName}
                autoComplete='off'
                {...register('userName', {
                  required: true,
                })}
              />
              <span className='form-review__warning'
                style={{ visibility: errors.userName ? 'visible' : 'hidden' }}
              >Заполните поле
              </span>
            </div>
            <div>
              <span className='form-review__label form-review__label--required'>
                  Ваша Оценка
              </span>
              <div className='new-rate'>
                {[...STAR_NUMBERS].map((starNumber)=> (
                  <React.Fragment key = {starNumber}>
                    <input
                      className='visually-hidden new-rate_input'
                      style={{order:starNumber}}
                      type='radio'
                      id={`star-${starNumber}`}
                      value = {starNumber}
                      data-testid = {TestID.Star}
                      {...register('rating', {
                        required: true,
                        value: starNumber,
                      })}
                    />
                    <label
                      className='new-rate__label'
                      htmlFor={`star-${starNumber}`}
                      title={StarTitle[starNumber]}
                    >
                    </label>
                  </React.Fragment>
                ))}
                <span className='rate__count'></span>
                <span className='rate__message'
                  style={{ visibility: errors.rating ? 'visible' : 'hidden' }}
                >
                  Поставьте оценку
                </span>
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
              data-testid = {TestID.InputAdv}
              autoComplete='off'
              {...register('advantage', {
                required: true,
              })}
            />
            <span className='form-review__warning form-review__other-warning'
              style={{ visibility: errors.advantage ? 'visible' : 'hidden' }}
            >Заполните поле
            </span>
          </div>
          <div className='form-review__other-wrapper'>
            <label className='form-review__label form-review__label--required' htmlFor='user-name'>
              Недостатки
            </label>
            <input
              className='form-review__input form-review__input-other'
              id='user-name'
              type='text'
              data-testid = {TestID.InputDisadv}
              autoComplete='off'
              {...register('disadvantage', {
                required: true,
              })}
            />
            <span className='form-review__warning form-review__other-warning'
              style={{ visibility: errors.disadvantage ? 'visible' : 'hidden' }}
            >Заполните поле
            </span>
          </div>
          <div className='form-review__other-wrapper'>
            <label className='form-review__label form-review__label--required' htmlFor='user-name'>
              Комментарий
            </label>
            <textarea
              className='form-review__input form-review__input--textarea form-review__input-other'
              id='user-name'
              data-testid = {TestID.InputComment}
              rows={10}
              autoComplete='off'
              {...register('comment', {
                required: true,
              })}
            >
            </textarea>
            <span className='form-review__warning form-review__other-warning'
              style={{ visibility: errors.comment ? 'visible' : 'hidden' }}
            >Заполните поле
            </span>
          </div>
          <button
            className='button button--medium-20 form-review__button'
            type='submit'
            data-testid = {TestID.Submit}
          >
              Отправить отзыв
          </button>
        </form>
        <ModalCloseBtn onClick={handleOnCloseClick}/>
      </div>
    </ModalWrapper>
  );
}

export default ModalReview;
