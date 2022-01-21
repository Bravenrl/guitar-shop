import ProductInfo from '../product-info/product-info';
import ProductPrice from '../product-price/product-price';

function ProductContainer(): JSX.Element {
  return (
    <div className='product-container'>
      <img
        className='product-container__img'
        src='img/content/guitar-2.jpg'
        width='90'
        height='235'
        alt=''
      />
      <ProductInfo />
      <ProductPrice />
    </div>
  );
}

export default ProductContainer;
