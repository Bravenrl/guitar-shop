import { configureMockStore, MockStore } from '@jedmao/redux-mock-store';
import { cleanup, render, screen } from '@testing-library/react';
import { TestID, TestReg } from '../../../const-test';
import { MockAPP } from '../../../mock/mockStore';
import * as Redux from 'react-redux';
import userEvent from '@testing-library/user-event';
import {
  toggleIsCartSuccessOpen
} from '../../../store/app-process/slice-app-process';
import ModalCartSuccess from './modal-cart-success';
import { createMemoryHistory } from 'history';
import { HistoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { AppRoute } from '../../../const';

const dispatch = jest.fn();
const useDispatch = jest.spyOn(Redux, 'useDispatch');

const mockStore = configureMockStore();
const componentState = {
  APP: { ...MockAPP, isCartSuccessOpen: true },
};
const history = createMemoryHistory();

const renderModalCartSuccess = (store: MockStore) =>
  render(
    <Provider store={store}>
      <HistoryRouter history={history}>
        <HelmetProvider>
          <ModalCartSuccess />
        </HelmetProvider>
      </HistoryRouter>
    </Provider>);


describe('Component: ModalCartSuccess', () => {
  afterAll(cleanup);
  it('should not render', () => {
    const store = mockStore({...componentState, APP: {isCartSuccessOpen: false}});
    renderModalCartSuccess(store);
    expect(screen.queryByText(TestReg.CartSuccessMessage)).not.toBeInTheDocument();
  });
  it('should render correctly', () => {
    const store = mockStore(componentState);
    renderModalCartSuccess(store);
    expect(screen.getByText(TestReg.CartSuccessMessage)).toBeInTheDocument();
    expect(screen.getByText(TestReg.CartSuccessRedirect)).toBeInTheDocument();
    expect(screen.getByText(TestReg.CartResume)).toBeInTheDocument();
  });
  it('should dispatch correctly & redirect to AppRoute.Cart if click  on CartSuccessRedirectBtn', () => {
    useDispatch.mockReturnValue(dispatch);
    const store = mockStore(componentState);
    renderModalCartSuccess(store);
    userEvent.click(screen.getByText(TestReg.CartSuccessRedirect));
    expect(dispatch).toBeCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith(toggleIsCartSuccessOpen(false));
    expect(history.location.pathname).toBe(`/${AppRoute.Cart}`);
  });
  it('should dispatch correctly if click &  redirect to AppRoute.Main on ResumeBtn', () => {
    useDispatch.mockReturnValue(dispatch);
    const store = mockStore(componentState);
    renderModalCartSuccess(store);
    userEvent.click(screen.getByText(TestReg.CartResume));
    expect(dispatch).toBeCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith(toggleIsCartSuccessOpen(false));
    expect(history.location.pathname).toBe(`/${AppRoute.Main}`);
  });
  it('should dispatch correctly if click CloseBtn', () => {
    useDispatch.mockReturnValue(dispatch);
    const store = mockStore(componentState);
    renderModalCartSuccess(store);
    userEvent.click(screen.getByTestId(TestID.ModalCloseBtn));
    expect(dispatch).toBeCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith(toggleIsCartSuccessOpen(false));
  });
});
