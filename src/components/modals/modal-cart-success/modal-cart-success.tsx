import { ModalType } from '../../../const';
import ModalWrapper from '../../common/modal-wrapper/modal-wrapper';

function ModalCartSuccess(): JSX.Element {
  return (
    <ModalWrapper modalType={ModalType.Success}>
      <div className='modal__content'>
        <svg className='modal__icon' width='26' height='20' aria-hidden='true'>
          <use xlinkHref='#icon-success'></use>
        </svg>
        <p className='modal__message'>Товар успешно добавлен в корзину</p>
        <div className='modal__button-container modal__button-container--add'>
          <button className='button button--small modal__button'>
            Перейти в корзину
          </button>
          <button className='button button--black-border button--small modal__button modal__button--right'>
            Продолжить покупки
          </button>
        </div>
        <button
          className='modal__close-btn button-cross'
          type='button'
          aria-label='Закрыть'
        >
          <span className='button-cross__icon'></span>
          <span className='modal__close-btn-interactive-area'></span>
        </button>
      </div>
    </ModalWrapper>
  );
}

export default ModalCartSuccess;
