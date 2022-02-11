import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useMatch, useNavigate } from 'react-router-dom';
import { AppRoute, ModalType } from '../../../const';
import { getIsCartSuccessOpen } from '../../../store/app-process/selectors-app-process';
import { toggleIsCartSuccessOpen } from '../../../store/app-process/slice-app-process';
import ModalCloseBtn from '../../common/modal-close-btn/modal-close-btn';
import ModalWrapper from '../../common/modal-wrapper/modal-wrapper';

function ModalCartSuccess(): JSX.Element | null {
  const isOpen = useSelector(getIsCartSuccessOpen);
  const dispatch = useDispatch();
  const isCatalogPage = useMatch(AppRoute.Catalog);
  const navigate = useNavigate();
  const location = useLocation();

  const navigatePathname = useMemo(() => {
    const state = location.state as { from: string };
    if (state && state.from) {
      return state.from;
    }
    return `/${AppRoute.Main}}`;
  }, [location]);

  const handleOnCloseClick = () => dispatch(toggleIsCartSuccessOpen(false));

  const handleOnCartBtnClick = () => {
    dispatch(toggleIsCartSuccessOpen(false));
    navigate(`/${AppRoute.Cart}`);
  };
  const handleOnResumeBtnClick = () => {
    dispatch(toggleIsCartSuccessOpen(false));
    if (!isCatalogPage) {
      navigate(`${navigatePathname}`);
    }
  };

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
          <button
            onClick={handleOnCartBtnClick}
            className='button button--small modal__button'
          >
            Перейти в корзину
          </button>
          <button
            onClick={handleOnResumeBtnClick}
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

export default ModalCartSuccess;
