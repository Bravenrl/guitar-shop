import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { Title } from '../../../const';
import { Main, TestReg } from '../../../const-test';
import { MockDATA, MockUSER } from '../../../mock/mockStore';
import PageContainer from './page-container';

const mockStore = configureMockStore();


const componentState = {
  DATA: MockDATA,
  USER: MockUSER,
};
const store = mockStore(componentState);

const renderPageContainer = () =>
  render(
    <Provider store={store} >
      <BrowserRouter>
        <PageContainer title={Title.Catalog}>
          <h1>{Main}</h1>
        </PageContainer>
      </BrowserRouter>
    </Provider>);

describe('Component: PageContainer', () => {
  it('should render correctly', () => {
    renderPageContainer();
    expect(screen.getByText(TestReg.Main)).toBeInTheDocument();
    expect(screen.getByText(Title.Catalog)).toBeInTheDocument();
    expect(screen.getByText(TestReg.BreadcrumbsMain)).toBeInTheDocument();
  });
});
