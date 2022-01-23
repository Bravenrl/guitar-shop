import { GuitarsType } from '../../../../const';
import { Guitar } from '../../../../types/data';

type ProductInfoProps = {
  currentProduct: Guitar;
};

function ProductInfo({ currentProduct }: ProductInfoProps): JSX.Element {
  const {
    name,
    vendorCode,
    type,
    // description,
    stringCount,

  } = currentProduct;
  const productType = GuitarsType.get(type)?.type;
  return (
    <div className='product-container__info-wrapper'>
      <h2 className='product-container__title title title--big title--uppercase'>
        {name}
      </h2>

      <div className='tabs'>
        <a
          className='button button--medium tabs__button'
          href='#characteristics'
        >
          Характеристики
        </a>
        <a
          className='button button--black-border button--medium tabs__button'
          href='#description'
        >
          Описание
        </a>
        <div className='tabs__content' id='characteristics'>
          <table className='tabs__table'>
            <tbody>
              <tr className='tabs__table-row'>
                <td className='tabs__title'>Артикул:</td>
                <td className='tabs__value'>{vendorCode}</td>
              </tr>
              <tr className='tabs__table-row'>
                <td className='tabs__title'>Тип:</td>
                <td className='tabs__value'>{productType}</td>
              </tr>
              <tr className='tabs__table-row'>
                <td className='tabs__title'>Количество струн:</td>
                <td className='tabs__value'>{stringCount} струнная</td>
              </tr>
            </tbody>
          </table>
          {/* <p className='tabs__product-description hidden'>
         {description}
          </p> */}
        </div>
      </div>
    </div>
  );
}

export default ProductInfo;
