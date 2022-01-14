import { render, screen } from '@testing-library/react';
import { Title } from '../../../const';
import PageTitle from './page-title';

describe('Component: PageTitle', () => {
  it('should render correctly', () => {
    render(<PageTitle title={Title.Catalog}/>);
    expect(screen.getByText(Title.Catalog)).toBeInTheDocument();
  });
});
