function NoProduct(): JSX.Element | null {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        width: '100%',
        height: '500px',
      }}
    >
      <h2>Нет гитар с заданными параметрами</h2>
    </div>
  );
}
export default NoProduct;
