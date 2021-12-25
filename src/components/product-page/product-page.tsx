import { Title } from '../../const';
import PageContainer from '../common/page-container/page-container';

function ProductPage(): JSX.Element {
  return (
    <PageContainer title={Title.Product}>
      <div className="product-container"></div>
    </PageContainer>
  );
}

export default ProductPage;
