import ModalCartAdd from '../../modals/modal-cart-add/modal-cart-add';
import ModalCartDelete from '../../modals/modal-cart-delete/modal-cart-delete';
import ModalCartSuccess from '../../modals/modal-cart-success/modal-cart-success';
import ModalReview from '../../modals/modal-review/modal-review';
import ModalSuccess from '../../modals/modal-success/modal-success';

function ModalContainer(): JSX.Element {
  return (
    <>
      <ModalReview />
      <ModalSuccess />
      <ModalCartSuccess />
      <ModalCartDelete />
      <ModalCartAdd />
    </>
  );
}

export default ModalContainer;
