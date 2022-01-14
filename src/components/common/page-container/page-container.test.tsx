import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Title } from '../../../const';
import { Main, TestReg } from '../../../const-test';
import PageContainer from './page-container';

const renderPageContainer = () =>
  render(
    <BrowserRouter>
      <PageContainer title={Title.Catalog}>
        <h1>{Main}</h1>
      </PageContainer>
    </BrowserRouter>);

describe('Component: PageContainer', () => {
  it('should render correctly', () => {
    renderPageContainer();
    expect(screen.getByText(TestReg.Main)).toBeInTheDocument();
    expect(screen.getByText(Title.Catalog)).toBeInTheDocument();
    expect(screen.getByText(TestReg.BreadcrumbsMain)).toBeInTheDocument();
  });
});
