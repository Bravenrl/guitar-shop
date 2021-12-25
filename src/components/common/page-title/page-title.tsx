type PageTitleProps = {
  title: string;
};

function PageTitle({title}: PageTitleProps): JSX.Element {
  return (
    <h1 className='page-content__title title title--bigger'>{title}</h1>
  );
}

export default PageTitle;
