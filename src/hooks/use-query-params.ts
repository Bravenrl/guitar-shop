import { useSearchParams } from 'react-router-dom';

function useQueryParam(): [
  ParsedQuery<string> | Pizza,
  (newQuery: Pizza, options?: NavigateOptions) => void
] {
  let [searchParams, setSearchParams] = useSearchParams();
  const pizza: Pizza = {
    toppings: [],
    crust: 'regular',
  };
  let value =
    searchParams.toString() === ''
      ? pizza
      : queryString.parse(`?${searchParams.toString()}`);

  // React.useMemo(() => {
  // if (searchParams.!==0) {
  //   const ff = queryString.parse(`?${searchParams.toString()}`)
  //   console.log(`1${ff}`);
  //   return ff
  // } else {
  //   const params = queryString.stringify(pizza);
  // setSearchParams(params);
  // console.log(`2${params}`);
  // return pizza;}}, [searchParams])

  let setValue = useCallback(
    (newValue: Pizza, options?: NavigateOptions) => {
      setSearchParams(queryString.stringify(newValue));
    },
    [setSearchParams]
  );
  return [value, setValue];
}

export default useQueryParam;
