import { Helmet } from 'react-helmet-async';
import { DOCUMENT_TITLE, Title } from '../../const';
import PageContainer from '../common/page-container/page-container';
import CartFooter from './components/cart-footer/cart-footer';
import CartItem from './components/cart-item/cart-item';

function CartPage(): JSX.Element {
  const headTitle = `${Title.Cart} - ${DOCUMENT_TITLE}`;
  return (
    <>
      <Helmet title={headTitle} />
      <PageContainer title={Title.Cart}>
        <div className='cart'>
          <CartItem />
          <CartFooter />
        </div>
      </PageContainer>
    </>
  );
}

export default CartPage;
