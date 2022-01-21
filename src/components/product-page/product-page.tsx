import { Title } from '../../const';
import PageContainer from '../common/page-container/page-container';
import ProductContainer from './common/product-container/product-container';
import ReviewsContainer from './common/reviews-container/reviews-container';

function ProductPage(): JSX.Element {
  return (
    <PageContainer title={Title.Product}>
      <>
        <ProductContainer />
        <ReviewsContainer />
      </>
    </PageContainer>
  );
}

export default ProductPage;
