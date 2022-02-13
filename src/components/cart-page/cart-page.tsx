import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { DOCUMENT_TITLE, Title } from '../../const';
import { fetchCartProducts } from '../../store/api-actions';
import { getProductsInCart } from '../../store/app-data/selectors-app-data';
import { getProductsIds } from '../../store/app-user/selectors-app-user';
import PageContainer from '../common/page-container/page-container';
import CartFooter from './components/cart-footer/cart-footer';
import CartItem from './components/cart-item/cart-item';

function CartPage(): JSX.Element {
  const productsInCart = useSelector(getProductsInCart);
  const dispatch = useDispatch();
  const productsIds = useSelector(getProductsIds);


  useEffect(() => {
    dispatch(fetchCartProducts(productsIds));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const headTitle = `${Title.Cart} - ${DOCUMENT_TITLE}`;
  return (
    <>
      <Helmet title={headTitle} />
      <PageContainer title={Title.Cart}>
        <div className='cart'>
          {productsInCart.map((product) => (
            <CartItem key={product.id} product={product} />
          ))}
          <CartFooter />
        </div>
      </PageContainer>
    </>
  );
}

export default CartPage;
