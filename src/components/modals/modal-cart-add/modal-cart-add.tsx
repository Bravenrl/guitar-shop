import ModalWrapper from '../../common/modal-wrapper/modal-wrapper';

function ModalCartAdd(): JSX.Element {
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

export default ModalCartAdd;
