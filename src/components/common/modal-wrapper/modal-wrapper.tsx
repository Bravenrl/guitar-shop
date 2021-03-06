import { ReactElement, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { closeAllModals } from '../../../store/app-process/slice-app-process';
import { RemoveScroll } from 'react-remove-scroll';
import FocusLock from 'react-focus-lock';
import { isEscEvent } from '../../../utils';
import { TestID } from '../../../const-test';
import { resetTempItemCart } from '../../../store/app-data/slice-app-data';

type ModalWrapperProps = {
  modalType: string;
  children: ReactElement;
};

function ModalWrapper({ modalType, children }: ModalWrapperProps) {
  const dispatch = useDispatch();

  const handleKeydown = (evt: KeyboardEvent) => {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      dispatch(resetTempItemCart());
      dispatch(closeAllModals());
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeydown);
    return () => {
      document.removeEventListener('keydown', handleKeydown);
    };
  });

  return (
    <RemoveScroll>
      <FocusLock>
        <div className={`modal is-active ${modalType}`}
          data-testid = {TestID.ModalWrap}
        >
          <div className='modal__wrapper'>
            <div
              className='modal__overlay'
              data-testid = {TestID.ModalOverlay}
              data-close-modal
              onClick={() => {
                dispatch(resetTempItemCart());
                dispatch(closeAllModals());
              }}
            >
            </div>
            {children}
          </div>
        </div>
      </FocusLock>
    </RemoveScroll>
  );
}

export default ModalWrapper;
