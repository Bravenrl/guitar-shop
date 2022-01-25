import { ReactElement, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { closeAllModals } from '../../../store/app-process/slice-app-process';
import { RemoveScroll } from 'react-remove-scroll';
import FocusLock from 'react-focus-lock';
import { isEscEvent } from '../../../utils';

type ModalWrapperProps = {
  modalType: string;
  children: ReactElement;
};

function ModalWrapper({ modalType, children }: ModalWrapperProps) {
  const dispatch = useDispatch();

  const handleKeydown = (evt: KeyboardEvent) => {
    if (isEscEvent(evt)) {
      evt.preventDefault();
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
        <div className={`modal is-active ${modalType}`}>
          <div className='modal__wrapper'>
            <div
              className='modal__overlay'
              data-close-modal
              onClick={() => {
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
