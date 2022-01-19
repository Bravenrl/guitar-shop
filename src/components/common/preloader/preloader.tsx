function Preloader(): JSX.Element | null {

  return (
    <div style={{
      'display': 'flex',
      'alignItems': 'center',
      'justifyContent': 'center',
      'backgroundColor': 'white',
      'width': '100%',
      'height': '500px',
    }}
    >
      <img src='./img/svg/preloader.svg' alt="Loading" />
    </div>
  );
}
export default Preloader;
