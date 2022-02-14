import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  getIsLoading,
  getProductsShow
} from '../../../../store/app-data/selectors-app-data';
import NoProduct from '../../../common/no-product/no-product';
import Preloader from '../../../common/preloader/preloader';
import ProductCard from '../product-card/product-card';

function CatalogCards(): JSX.Element {
  const productsShow = useSelector(getProductsShow);
  const isLoading = useSelector(getIsLoading);
  const [isCurrentLoading, setIsCurrentLoading] = useState(true);

  useEffect(() => {
    setIsCurrentLoading(isLoading);
    return () => setIsCurrentLoading(true);
  }, [isLoading]);

  if (isCurrentLoading) {
    return <Preloader />;
  }

  if (productsShow.length === 0 && !isCurrentLoading) {
    return <NoProduct />;
  }

  return (
    <div className='cards catalog__cards'>
      {productsShow.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default CatalogCards;
