import Breadcrumbs from '../breadcrumbs/breadcrumbs';
import PageTitle from '../page-title/page-title';

type PageContainerProps = {
  children: JSX.Element;
  title: string;
};

function PageContainer({ children, title }: PageContainerProps): JSX.Element {
  return (
    <div className='container'>
      <PageTitle title={title}/>
      <Breadcrumbs />
      {children}
    </div>
  );
}

export default PageContainer;
