import { useDispatch, useSelector } from 'react-redux';
import { getTempItemCart } from '../../../store/app-data/selectors-app-data';
import { deleteProductFromCart, resetTempItemCart } from '../../../store/app-data/slice-app-data';
import { getIsCartDeleteOpen } from '../../../store/app-process/selectors-app-process';
import { toggleIsCartDeleteOpen } from '../../../store/app-process/slice-app-process';
import { deleteFromCart } from '../../../store/app-user/slice-app-user';
import ModalCloseBtn from '../../common/modal-close-btn/modal-close-btn';
import ModalInfo from '../../common/modal-info/modal-info';
import ModalWrapper from '../../common/modal-wrapper/modal-wrapper';

function ModalCartDelete(): JSX.Element | null {
  const isOpen = useSelector(getIsCartDeleteOpen);
  const dispatch = useDispatch();
  const { id } = useSelector(getTempItemCart);

  const handleOnCloseClick = () => {
    dispatch(resetTempItemCart());
    dispatch(toggleIsCartDeleteOpen(false));
  };
  const handleOnDeleteClick = () => {
    dispatch(deleteFromCart(id));
    dispatch(deleteProductFromCart(id));
    dispatch(resetTempItemCart());
    dispatch(toggleIsCartDeleteOpen(false));
  };

  if (!isOpen) {
    return null;
  }

  return (
    <ModalWrapper modalType=''>
      <div className='modal__content'>
        <h2 className='modal__header title title--medium title--red'>
          Удалить этот товар?
        </h2>
        <ModalInfo />
        <div className='modal__button-container'>
          <button
            onClick={handleOnDeleteClick}
            className='button button--small modal__button'
          >
            Удалить товар
          </button>
          <button
            onClick={handleOnCloseClick}
            className='button button--black-border button--small modal__button modal__button--right'
          >
            Продолжить покупки
          </button>
        </div>
        <ModalCloseBtn onClick={handleOnCloseClick} />
      </div>
    </ModalWrapper>
  );
}

export default ModalCartDelete;
