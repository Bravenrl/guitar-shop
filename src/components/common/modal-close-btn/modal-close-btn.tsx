import { TestID } from '../../../const-test';

type ModalCloseBtnProps = {
  onClick: () => void;
};

function ModalCloseBtn({ onClick }: ModalCloseBtnProps) {
  return (
    <button
      className='modal__close-btn button-cross'
      type='button'
      aria-label='Закрыть'
      onClick={onClick}
      data-testid = {TestID.ModalCloseBtn}
    >
      <span className='button-cross__icon'></span>
      <span className='modal__close-btn-interactive-area'></span>
    </button>
  );
}

export default ModalCloseBtn;
