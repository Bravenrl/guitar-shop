import Footer from '../footer/footer';
import Header from '../header/header';

type MainLayoutProps = {
  children: JSX.Element;
};

function MainLayout({ children }: MainLayoutProps): JSX.Element {
  return (
    <div className='wrapper'>
      <Header />
      <main className='page-content'>
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default MainLayout;
