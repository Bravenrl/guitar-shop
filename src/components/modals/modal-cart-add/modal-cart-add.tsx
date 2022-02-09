import { useDispatch, useSelector } from 'react-redux';
import { getIsCartAddOpen } from '../../../store/app-process/selectors-app-process';
import { toggleIsCartAddOpen } from '../../../store/app-process/slice-app-process';
import ModalCloseBtn from '../../common/modal-close-btn/modal-close-btn';
import ModalWrapper from '../../common/modal-wrapper/modal-wrapper';

function ModalCartAdd(): JSX.Element | null {
  const isOpen = useSelector(getIsCartAddOpen);
  const dispatch = useDispatch();

  const handleOnCloseClick = () => dispatch(toggleIsCartAddOpen(false));

  if (!isOpen) {
    return null;
  }

  return (
    <ModalWrapper modalType=''>
      <div className='modal__content'>
        <h2 className='modal__header title title--medium'>
          Добавить товар в корзину
        </h2>
        <div className='modal__info'>
          <img
            className='modal__img'
            src='img/content/guitar-2.png'
            width='67'
            height='137'
            alt='Честер bass'
          />
          <div className='modal__info-wrapper'>
            <h3 className='modal__product-name title title--little title--uppercase'>
              Гитара Честер bass
            </h3>
            <p className='modal__product-params modal__product-params--margin-11'>
              Артикул: SO757575
            </p>
            <p className='modal__product-params'>Электрогитара, 6 струнная</p>
            <p className='modal__price-wrapper'>
              <span className='modal__price'>Цена:</span>
              <span className='modal__price'>17 500 ₽</span>
            </p>
          </div>
        </div>
        <div className='modal__button-container'>
          <button className='button button--red button--big modal__button modal__button--add'>
            Добавить в корзину
          </button>
        </div>
        <ModalCloseBtn onClick={handleOnCloseClick} />
      </div>
    </ModalWrapper>
  );
}

export default ModalCartAdd;
