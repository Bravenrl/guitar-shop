import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

function NotFoundPage(): JSX.Element {
  return (
    <div
      style={{
        textAlign: 'center',
      }}
    >
      <h1>404. Этой страницы не существует</h1>
      <Link to={AppRoute.MainPage}>
        <h2>Перейти главную страницу</h2>
      </Link>
    </div>
  );
}

export default NotFoundPage;
