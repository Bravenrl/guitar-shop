import { Title } from '../../../const';
import Breadcrumbs from '../breadcrumbs/breadcrumbs';
import PageTitle from '../page-title/page-title';

type PageContainerProps = {
  children: JSX.Element;
};

function PageContainer({ children }: PageContainerProps): JSX.Element {
  return (
    <div className='container'>
      <PageTitle>{Title.Main}</PageTitle>
      <Breadcrumbs />
      {children}
    </div>
  );
}

export default PageContainer;
