import { useSelector } from 'react-redux';
import { getProductsShow } from '../../../../store/app-data/selectors-app-data';
import ProductCard from '../product-card/product-card';

function CatalogCards(): JSX.Element {
  const productsShow = useSelector(getProductsShow);
  return (
    <div className='cards catalog__cards'>
      {productsShow.map((product)=><ProductCard key = {product.id} product={product}/>)}
    </div>
  );
}

export default CatalogCards;
