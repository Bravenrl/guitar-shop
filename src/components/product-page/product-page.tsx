import { useDispatch, useSelector } from 'react-redux';
import { DOCUMENT_TITLE } from '../../const';
import PageContainer from '../common/page-container/page-container';
import ProductContainer from './components/product-container/product-container';
import ReviewsContainer from './components/reviews-container/reviews-container';
import { getCurrentProduct } from '../../store/app-data/selectors-app-data';
import Preloader from '../common/preloader/preloader';
import { useParams } from 'react-router-dom';
import { fetchCurrentProduct } from '../../store/api-actions';
import {
  clearCurrentComments,
  clearCurrentProduct
} from '../../store/app-data/slice-app-data';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';


function ProductPage(): JSX.Element {
  const currentProduct = useSelector(getCurrentProduct);
  const headTitle = `${currentProduct.name} - ${DOCUMENT_TITLE}`;

  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (id) {
      dispatch(fetchCurrentProduct(id));
    }
    return () => {
      dispatch(clearCurrentProduct());
      dispatch(clearCurrentComments());
    };
  }, [dispatch, id]);

  if (!currentProduct.id) {
    return <Preloader />;
  }

  return (
    <>
      <Helmet title={headTitle} />
      <PageContainer title={currentProduct.name}>
        <>
          <ProductContainer currentProduct={currentProduct} />
          <ReviewsContainer />
        </>
      </PageContainer>
    </>
  );
}

export default ProductPage;
