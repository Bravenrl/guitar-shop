
function ScrollBtn(): JSX.Element {

  return (
    <a
      className='button button--up button--red-border button--big reviews__up-button'
      style={{zIndex: 1000}}
      href='#header'
      onClick={(evt) => {
        evt.preventDefault();
        window.scrollTo(0, 0);
      }}
    >
      Наверх
    </a>
  );
}

export default ScrollBtn;
