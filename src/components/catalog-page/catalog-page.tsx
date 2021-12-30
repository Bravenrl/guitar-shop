import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { DELAY, Title } from '../../const';
import useDebounce from '../../hooks/use-debounce';
import useQuery from '../../hooks/use-query';
import { fetchProductsShow } from '../../store/api-actions';
import PageContainer from '../common/page-container/page-container';
import CatalogCards from './components/catalog-cards/catalog-cards';
import CatalogFilter from './components/catalog-filter/catalog-filter';
import CatalogSort from './components/catalog-sort/catalog-sort';
import Pagination from './components/pagination/pagination';

function CatalogPage() {
  const query = useQuery();
  const dispatch = useDispatch();
  const debouncedFetch = useDebounce(dispatch, DELAY);

  useEffect(() => {
    debouncedFetch(fetchProductsShow(query));
  }, [debouncedFetch, dispatch, query]);

  return (
    <PageContainer title={Title.Catalog}>
      <div className='catalog'>
        <CatalogFilter />
        <CatalogSort />
        <CatalogCards />
        <Pagination />
      </div>
    </PageContainer>
  );
}

export default CatalogPage;
