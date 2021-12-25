import { Title } from '../../const';
import PageContainer from '../common/page-container/page-container';

function CartPage(): JSX.Element {
  return (
    <PageContainer title={Title.Cart}>
      <div className='cart'></div>
    </PageContainer>
  );
}

export default CartPage;
