import { Title } from '../../const';
import PageContainer from '../common/page-container/page-container';
import CatalogCards from './components/catalog-cards/catalog-cards';
import CatalogFilter from './components/catalog-filter/catalog-filter';
import CatalogSort from './components/catalog-sort/catalog-sort';
import Pagination from './components/pagination/pagination';

function CatalogPage() {

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
