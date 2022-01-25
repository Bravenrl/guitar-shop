import { useDispatch, useSelector } from 'react-redux';
import { ModalType } from '../../../const';
import { getIsSuccessOpen } from '../../../store/app-process/selectors-app-process';
import { toggleIsSuccessOpen } from '../../../store/app-process/slice-app-process';
import ModalWrapper from '../modal-wrapper/modal-wrapper';

function ModalSuccess(): JSX.Element | null {
  const isOpen = useSelector(getIsSuccessOpen);
  const dispatch = useDispatch();

  if (!isOpen) {
    return null;
  }

  return (
    <ModalWrapper modalType={ModalType.Success}>
      <div className='modal__content'>
        <svg className='modal__icon' width='26' height='20' aria-hidden='true'>
          <use xlinkHref='#icon-success'></use>
        </svg>
        <p className='modal__message'>Спасибо за ваш отзыв!</p>
        <div className='modal__button-container modal__button-container--review'>
          <button
            className='button button--small modal__button modal__button--review'
            onClick={() => dispatch(toggleIsSuccessOpen(false))}
          >
            К покупкам!
          </button>
        </div>
        <button
          className='modal__close-btn button-cross'
          type='button'
          aria-label='Закрыть'
          onClick={() => dispatch(toggleIsSuccessOpen(false))}
        >
          <span className='button-cross__icon'></span>
          <span className='modal__close-btn-interactive-area'></span>
        </button>
      </div>
    </ModalWrapper>
  );
}

export default ModalSuccess;
