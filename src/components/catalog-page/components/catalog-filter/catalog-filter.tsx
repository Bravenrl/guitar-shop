import { memo } from 'react';
import StringFilter from '../string-filter/string-filter';
import PriceFilter from '../price-filter/price-filter';
import TypeFilter from '../type-filter/type-filter';

function CatalogFilter(): JSX.Element {

  return (
    <form className='catalog-filter' >
      <h2 className='title title--bigger catalog-filter__title'>Фильтр</h2>
      <PriceFilter />
      <TypeFilter />
      <StringFilter />
    </form>
  );
}

export default memo(CatalogFilter);
