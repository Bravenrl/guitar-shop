import { useMatch } from 'react-router-dom';
import { AppRoute } from '../../../const';

function NoProduct(): JSX.Element | null {
  const isCartPage = useMatch(AppRoute.Cart);
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        width: '100%',
        height: '500px',
      }}
    >
      {isCartPage ? (
        <h2>В Вашей корзине нет гитар</h2>
      ) : (
        <h2>Нет гитар с заданными параметрами</h2>
      )}
    </div>
  );
}
export default NoProduct;
