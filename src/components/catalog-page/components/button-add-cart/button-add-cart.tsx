import { useDispatch } from 'react-redux';
import { addTempItemCart } from '../../../../store/app-data/slice-app-data';
import { toggleIsCartAddOpen } from '../../../../store/app-process/slice-app-process';
import { Product } from '../../../../types/data';

type ButtonAddCartProps = {
  product: Product;
};
function ButtonAddCart({ product }: ButtonAddCartProps): JSX.Element {
  const { comments, ...guitar } = product;
  const dispatch = useDispatch();
  return (
    <button
      onClick={() => {
        dispatch(addTempItemCart(guitar));
        dispatch(toggleIsCartAddOpen(true));
      }}
      className='button button--red button--mini button--add-to-cart'
    >
      Купить
    </button>
  );
}

export default ButtonAddCart;
