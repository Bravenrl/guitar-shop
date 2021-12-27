import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Title } from '../../const';
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

  useEffect(() => {
    dispatch(fetchProductsShow(query));
  }, [dispatch, query]);

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
