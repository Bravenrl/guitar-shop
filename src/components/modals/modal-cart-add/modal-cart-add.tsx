import { useDispatch, useSelector } from 'react-redux';
import { getTempItemCart } from '../../../store/app-data/selectors-app-data';
import { resetTempItemCart } from '../../../store/app-data/slice-app-data';
import { getIsCartAddOpen } from '../../../store/app-process/selectors-app-process';
import {
  toggleIsCartAddOpen,
  toggleIsCartSuccessOpen
} from '../../../store/app-process/slice-app-process';
import { addToCart } from '../../../store/app-user/slice-app-user';
import ModalCloseBtn from '../../common/modal-close-btn/modal-close-btn';
import ModalInfo from '../../common/modal-info/modal-info';
import ModalWrapper from '../../common/modal-wrapper/modal-wrapper';

function ModalCartAdd(): JSX.Element | null {
  const isOpen = useSelector(getIsCartAddOpen);
  const { id } = useSelector(getTempItemCart);
  const dispatch = useDispatch();
  const handleOnCloseClick = () => {
    dispatch(resetTempItemCart());
    dispatch(toggleIsCartAddOpen(false));
  };

  if (!isOpen) {
    return null;
  }

  return (
    <ModalWrapper modalType=''>
      <div className='modal__content'>
        <h2 className='modal__header title title--medium'>
          Добавить товар в корзину
        </h2>
        <ModalInfo />
        <div className='modal__button-container'>
          <button
            onClick={() => {
              dispatch(addToCart(id));
              dispatch(resetTempItemCart());
              dispatch(toggleIsCartAddOpen(false));
              dispatch(toggleIsCartSuccessOpen(true));
            }}
            className='button button--red button--big modal__button modal__button--add'
          >
            Добавить в корзину
          </button>
        </div>
        <ModalCloseBtn onClick={handleOnCloseClick} />
      </div>
    </ModalWrapper>
  );
}

export default ModalCartAdd;
