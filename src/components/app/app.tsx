import { Navigate, Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../const';
import MainLayout from '../common/main-layout/main-layout';
import MainPage from '../main-page/main-page';

function App(): JSX.Element {
  return (
    <Routes >
      <Route path={AppRoute.Root} element={<MainLayout />}>
        <Route index element={<Navigate to = {AppRoute.Catalog}/>} />
        <Route path={AppRoute.Catalog} element={<MainPage />} />
      </Route>
    </Routes>
  );
}
export default App;

