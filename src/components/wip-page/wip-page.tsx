import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

function WipPage(): JSX.Element {
  return (
    <div
      style={{
        textAlign: 'center',
      }}
    >
      <h1>Эта страница находится в разработке</h1>
      <Link to={AppRoute.Main}>
        <h2>Перейти главную страницу</h2>
      </Link>
    </div>
  );
}

export default WipPage;
