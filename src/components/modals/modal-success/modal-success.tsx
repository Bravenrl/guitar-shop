import { useDispatch, useSelector } from 'react-redux';
import { ModalType } from '../../../const';
import { getIsSuccessOpen } from '../../../store/app-process/selectors-app-process';
import { toggleIsSuccessOpen } from '../../../store/app-process/slice-app-process';
import ModalCloseBtn from '../../common/modal-close-btn/modal-close-btn';
import ModalWrapper from '../../common/modal-wrapper/modal-wrapper';

function ModalSuccess(): JSX.Element | null {
  const isOpen = useSelector(getIsSuccessOpen);
  const dispatch = useDispatch();

  const handleOnCloseClick = () => dispatch(toggleIsSuccessOpen(false));

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
            onClick={handleOnCloseClick}
          >
            К покупкам!
          </button>
        </div>
        <ModalCloseBtn onClick={handleOnCloseClick} />
      </div>
    </ModalWrapper>
  );
}

export default ModalSuccess;
