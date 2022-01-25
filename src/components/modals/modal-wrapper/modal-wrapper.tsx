import { ReactElement } from 'react';
import { useDispatch } from 'react-redux';
import { closeAllModals } from '../../../store/app-process/slice-app-process';
import {RemoveScroll} from 'react-remove-scroll';

type ModalWrapperProps = {
  modalType: string;
  children: ReactElement;
};

function ModalWrapper({ modalType, children }: ModalWrapperProps) {
  const dispatch = useDispatch();
  return (
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
        <RemoveScroll removeScrollBar = {false}>
          {children}
        </RemoveScroll>
      </div>
    </div>
  );
}

export default ModalWrapper;
