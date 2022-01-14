import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { act } from 'react-dom/test-utils';
import { HistoryRouter, Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../../const';
import { ROOT, TestReg, WIP } from '../../../const-test';
import { customRender } from '../../../render-test';
import Footer from './footer';


const history = createMemoryHistory();

describe('Component: Footer', () => {
  it('should render correctly', () => {
    customRender(<Footer/>);
    expect(screen.getByAltText(TestReg.Logo)).toBeInTheDocument();
    expect(screen.getByText(TestReg.FooterAbout)).toBeInTheDocument();
    expect(screen.getByText(TestReg.Where)).toBeInTheDocument();
    expect(screen.getByText(TestReg.FooterBlog)).toBeInTheDocument();
    expect(screen.getByText(TestReg.FooterQuestion)).toBeInTheDocument();
    expect(screen.getByText(TestReg.FooterBack)).toBeInTheDocument();
    expect(screen.getByText(TestReg.FooterService)).toBeInTheDocument();
    expect(screen.getByText(TestReg.FooterConstacts)).toBeInTheDocument();
    expect(screen.getByText(TestReg.FooterWork)).toBeInTheDocument();
  });

  it('should redirect when user clicked on links', () => {
    history.push(`/${AppRoute.Main}`);
    render(
      <HistoryRouter history={history}>
        <Routes>
          <Route path={AppRoute.Main} element={<Footer />} />
          <Route path={AppRoute.Root} element={<h1>{ROOT}</h1>} />
          <Route path={AppRoute.Where} element={<h1>{WIP}</h1>} />
        </Routes>
      </HistoryRouter>);

    expect(screen.queryByAltText(TestReg.Root)).not.toBeInTheDocument();
    userEvent.click(screen.getByAltText(TestReg.Logo));
    expect(screen.getByText(TestReg.Root)).toBeInTheDocument();
    act(()=>{history.push(`/${AppRoute.Main}`);});
    expect(screen.queryByText(TestReg.Root)).not.toBeInTheDocument();
    userEvent.click(screen.getByText(TestReg.FooterBlog));
    expect(screen.getByText(TestReg.Root)).toBeInTheDocument();
    act(()=>{history.push(`/${AppRoute.Main}`);});
    expect(screen.queryByText(TestReg.Root)).not.toBeInTheDocument();
    userEvent.click(screen.getByText(TestReg.FooterQuestion));
    expect(screen.getByText(TestReg.Root)).toBeInTheDocument();
    act(()=>{history.push(`/${AppRoute.Main}`);});
    expect(screen.queryByText(TestReg.Root)).not.toBeInTheDocument();
    userEvent.click(screen.getByText(TestReg.FooterBack));
    expect(screen.getByText(TestReg.Root)).toBeInTheDocument();
    act(()=>{history.push(`/${AppRoute.Main}`);});
    expect(screen.queryByText(TestReg.Root)).not.toBeInTheDocument();
    userEvent.click(screen.getByText(TestReg.FooterService));
    expect(screen.getByText(TestReg.Root)).toBeInTheDocument();
    act(()=>{history.push(`/${AppRoute.Main}`);});
    expect(screen.queryByText(TestReg.WipPage)).not.toBeInTheDocument();
    userEvent.click(screen.getByText(TestReg.Where));
    expect(screen.getByText(TestReg.WipPage)).toBeInTheDocument();
  });
});
