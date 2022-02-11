import { useDispatch, useSelector } from 'react-redux';
import { GuitarsType } from '../../../const';
import { getTempItemCart } from '../../../store/app-data/selectors-app-data';
import { resetTempItemCart } from '../../../store/app-data/slice-app-data';
import { getIsCartAddOpen } from '../../../store/app-process/selectors-app-process';
import {
  toggleIsCartAddOpen,
  toggleIsCartSuccessOpen
} from '../../../store/app-process/slice-app-process';
import { addToCart } from '../../../store/app-user/slice-app-user';
import ModalCloseBtn from '../../common/modal-close-btn/modal-close-btn';
import ModalWrapper from '../../common/modal-wrapper/modal-wrapper';

function ModalCartAdd(): JSX.Element | null {
  const isOpen = useSelector(getIsCartAddOpen);
  const { id, name, vendorCode, type, previewImg, stringCount, price } =
    useSelector(getTempItemCart);
  const dispatch = useDispatch();
  const productType = GuitarsType.get(type)?.type;
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
        <div className='modal__info'>
          <img
            className='modal__img'
            src={previewImg}
            width='67'
            height='137'
            alt={name}
          />
          <div className='modal__info-wrapper'>
            <h3 className='modal__product-name title title--little title--uppercase'>
              Гитара {name}
            </h3>
            <p className='modal__product-params modal__product-params--margin-11'>
              Артикул: {vendorCode}
            </p>
            <p className='modal__product-params'>
              {productType}, {stringCount} струнная
            </p>
            <p className='modal__price-wrapper'>
              <span className='modal__price'>Цена:</span>
              <span className='modal__price'>{price} ₽</span>
            </p>
          </div>
        </div>
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
