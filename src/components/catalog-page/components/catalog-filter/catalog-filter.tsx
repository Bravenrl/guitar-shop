import { memo } from 'react';
import StringFilter from '../string-filter/string-filter';
import PriceFilter from '../price-filter/price-filter';
import TypeFilter from '../type-filter/type-filter';
import { useParams } from 'react-router-dom';

function CatalogFilter(): JSX.Element {
  const { number } = useParams();
  const page = Number(number);

  return (
    <form className='catalog-filter' >
      <h2 className='title title--bigger catalog-filter__title'>Фильтр</h2>
      <PriceFilter page={page} />
      <TypeFilter page={page} />
      <StringFilter page={page} />
    </form>
  );
}

export default memo(CatalogFilter);
