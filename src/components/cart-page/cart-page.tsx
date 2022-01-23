import { Helmet } from 'react-helmet-async';
import { DOCUMENT_TITLE, Title } from '../../const';
import PageContainer from '../common/page-container/page-container';

function CartPage(): JSX.Element {
  const headTitle = `${Title.Cart} - ${DOCUMENT_TITLE}`;
  return (
    <>
      <Helmet title={headTitle} />
      <PageContainer title={Title.Cart}>
        <div className='cart'></div>
      </PageContainer>
    </>
  );
}

export default CartPage;
