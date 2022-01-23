import { GuitarsType } from '../../../../const';
import { useToggle } from '../../../../hooks/use-toggle/use-toggle';
import { Guitar } from '../../../../types/data';

type ProductInfoProps = {
  currentProduct: Guitar;
};

function ProductInfo({ currentProduct }: ProductInfoProps): JSX.Element {
  const { name, vendorCode, type, description, stringCount } = currentProduct;
  const [isCharTab, toggleIsCharTab] = useToggle(true);
  const [isDescTab, toggleIsDescTab] = useToggle(false);

  const productType = GuitarsType.get(type)?.type;

  const handleCharButtonClick = (evt: React.MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    if (isCharTab) {
      return;
    }
    toggleIsCharTab();
    toggleIsDescTab();
  };

  const handleDescButtonClick = (evt: React.MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    if (isDescTab) {
      return;
    }
    toggleIsDescTab();
    toggleIsCharTab();
  };

  return (
    <div className='product-container__info-wrapper'>
      <h2 className='product-container__title title title--big title--uppercase'>
        {name}
      </h2>

      <div className='tabs'>
        <a
          onClick={handleCharButtonClick}
          className={`button
          ${!isCharTab && 'button--black-border'}
          button--medium tabs__button`}
          href='#characteristics'
        >
          Характеристики
        </a>
        <a
          onClick={handleDescButtonClick}
          className={`button
            ${!isDescTab && 'button--black-border'}
            button--medium tabs__button`}
          href='#description'
        >
          Описание
        </a>
        <div className='tabs__content' id='characteristics'>
          {isCharTab && (
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
          )}
          {isDescTab && (
            <p className='tabs__product-description '>{description}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductInfo;
