import { Guitar } from '../../../../types/data';
import ProductInfo from '../product-info/product-info';
import ProductPrice from '../product-price/product-price';

type ProductContainerProps = {
  currentProduct: Guitar
}

function ProductContainer({currentProduct}: ProductContainerProps): JSX.Element {
  const {name, previewImg } = currentProduct;
  return (
    <div className='product-container'>
      <img
        className='product-container__img'
        src={previewImg}
        width='90'
        height='235'
        alt={name}
      />
      <ProductInfo currentProduct = {currentProduct}/>
      <ProductPrice product = {currentProduct}/>
    </div>
  );
}

export default ProductContainer;
