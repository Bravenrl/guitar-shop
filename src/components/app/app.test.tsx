import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { HistoryRouter } from 'react-router-dom';
import { AppRoute, Title } from '../../const';
import { MockDATA, MockUSER } from '../../mock/mockStore';
import App from './app';
import * as Redux from 'react-redux';
import { TestReg } from '../../const-test';
import { fakeProduct } from '../../mock/fakeData';
import { HelmetProvider } from 'react-helmet-async';

HelmetProvider.canUseDOM = false;

const dispatch = jest.fn();
const useDispatch = jest.spyOn(Redux, 'useDispatch');
const mockStore = configureMockStore();
const history = createMemoryHistory();

const NAME = 'Product';
const ID = 1;
const fakeCurrentProduct = { ...fakeProduct, name: NAME, id: ID };
const componentState = {
  DATA: { ...MockDATA, currentProduct: fakeCurrentProduct },
  USER: MockUSER,
};
const store = mockStore(componentState);


const renderApp = () =>
  render(
    <Provider store={store}>
      <HistoryRouter history={history}>
        <HelmetProvider>
          <App />
        </HelmetProvider>
      </HistoryRouter>
    </Provider>);


describe('Application Routing', () => {
  it('should render Catalog when user navigate to "/"', () => {
    useDispatch.mockReturnValue(dispatch);
    history.push(AppRoute.Root);
    renderApp();
    expect(screen.getByText(Title.Catalog)).toBeInTheDocument();
  });

  it('should render Catalog when user navigate to /catalog/page_:number', () => {
    useDispatch.mockReturnValue(dispatch);
    history.push('/catalog/page_5');
    renderApp();
    expect(screen.getByText(Title.Catalog)).toBeInTheDocument();
  });

  it('should render ProductPage when user navigate to /product/:id', () => {
    window.scrollTo = jest.fn();
    useDispatch.mockReturnValue(dispatch);
    history.push('/product/1');
    renderApp();
    expect(screen.getAllByText(NAME).length).toEqual(3);
  });

  it('should render CartPage when user navigate to /cart', () => {
    useDispatch.mockReturnValue(dispatch);
    history.push('/cart');
    renderApp();
    expect(screen.getAllByText(Title.Cart).length).toEqual(2);
  });
  it('should render WipPage when user navigate to /about', () => {
    useDispatch.mockReturnValue(dispatch);
    history.push('/about');
    renderApp();
    expect(screen.getByText(TestReg.WipPage)).toBeInTheDocument();
  });
  it('should render WipPage when user navigate to /where', () => {
    useDispatch.mockReturnValue(dispatch);
    history.push('/where');
    renderApp();
    expect(screen.getByText(TestReg.WipPage)).toBeInTheDocument();
  });
  it('should render NotFoundPage when user navigate to /somewrongpath', () => {
    useDispatch.mockReturnValue(dispatch);
    history.push('/somewrongpath');
    renderApp();
    expect(screen.getByText(TestReg.NotFoundPage)).toBeInTheDocument();
  });
});
