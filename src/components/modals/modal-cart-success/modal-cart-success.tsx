import { useDispatch, useSelector } from 'react-redux';
import { ModalType } from '../../../const';
import { getIsCartSuccessOpen } from '../../../store/app-process/selectors-app-process';
import { toggleIsCartSuccessOpen } from '../../../store/app-process/slice-app-process';
import ModalCloseBtn from '../../common/modal-close-btn/modal-close-btn';
import ModalWrapper from '../../common/modal-wrapper/modal-wrapper';

function ModalCartSuccess(): JSX.Element | null{
  const isOpen = useSelector(getIsCartSuccessOpen);
  const dispatch = useDispatch();

  const handleOnCloseClick = () => dispatch(toggleIsCartSuccessOpen(false));

  if (!isOpen) {
    return null;
  }

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
        <ModalCloseBtn onClick={handleOnCloseClick} />
      </div>
    </ModalWrapper>
  );
}

export default ModalCartSuccess;
