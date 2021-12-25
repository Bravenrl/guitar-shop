import { Navigate, Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../const';
import MainLayout from '../common/main-layout/main-layout';
import CatalogPage from '../catalog-page/catalog-page';
import NotFoundPage from '../not-found-page/not-found-page';
import ProductPage from '../product-page/product-page';
import CartPage from '../cart-page/cart-page';

function App(): JSX.Element {
  return (
    <Routes>
      <Route path={AppRoute.Root} element={<MainLayout />}>
        <Route index element={<Navigate to={AppRoute.MainPage} replace />} />
        <Route path={AppRoute.Catalog} element={<CatalogPage />} />
        <Route path={AppRoute.Product} element={<ProductPage />} />
        <Route path={AppRoute.Cart} element={<CartPage />} />
        <Route path={AppRoute.NotFound} element={<NotFoundPage />} />
      </Route>
      <Route path={AppRoute.NotFound} element={<Navigate to={AppRoute.NotFoundPage} replace />} />

    </Routes>
  );
}
export default App;
