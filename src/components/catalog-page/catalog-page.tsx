
import { Title } from '../../const';
import PageContainer from '../common/page-container/page-container';
import CatalogCards from './components/catalog-cards/catalog-cards';
import CatalogFilter from './components/catalog-filter/catalog-filter';
import CatalogSort from './components/catalog-sort/catalog-sort';
import Pagination from './components/pagination/pagination';
import queryString from 'query-string';
import { getFilter } from '../../store/app-user/selectors-app-user';
import { useDispatch, useSelector } from 'react-redux';
import useQuery from '../../hooks/use-query';
import { useSearchParams } from 'react-router-dom';
import { fetchProductsShow } from '../../store/api-actions';
import { useEffect } from 'react';

function CatalogPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const filter = useSelector(getFilter);
  const { productTypes, stringCounts, priceMin, priceMax } = filter;
  const query = useQuery();

  useEffect(() => {
    let actualFilter = filter;
    const typesSearch = searchParams.getAll('type') || [];
    const strigCountsSearch = searchParams.getAll('stringCount') || [];
    const priceMinSearch = searchParams.get('price_gte') || '';
    const priceMaxSearch = searchParams.get('price_lte') || '';
    if (typesSearch.length !== 0) {
      actualFilter = { ...actualFilter, productTypes: typesSearch };
    }
    if (strigCountsSearch.length !== 0) {
      actualFilter = { ...actualFilter, stringCounts: strigCountsSearch };
    }
    if (priceMinSearch !== '') {
      actualFilter = { ...actualFilter, priceMin: priceMinSearch };
    }
    if (priceMaxSearch !== '') {
      actualFilter = { ...actualFilter, priceMax: priceMaxSearch };
    }
    dispatch(fetchProductsShow(query, actualFilter));
  }, []);

  useEffect(() => {
    const params = queryString.stringify(
      {
        'type': productTypes,
        'stringCount': stringCounts,
        'price_gte': priceMin,
        'price_lte': priceMax,
      },
      { skipEmptyString: true, skipNull: true },
    );
    setSearchParams(params);
  }, [priceMax, priceMin, productTypes, setSearchParams, stringCounts]);


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
