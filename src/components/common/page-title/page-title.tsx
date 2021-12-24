type PageTitleProps = {
  children: string;
};

function PageTitle({ children }: PageTitleProps): JSX.Element {
  return (
    <h1 className='page-content__title title title--bigger'>{children}</h1>
  );
}

export default PageTitle;
