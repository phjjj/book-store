import { useRouteError } from "react-router-dom";

interface ErrorProps {
  statusText: string;
  message: string;
}
function Error() {
  const error = useRouteError() as ErrorProps;
  return (
    <div>
      <h1>Error</h1>
      <p>다음과 같은 오류가 발생하였습니다.</p>
      <p>{error.statusText || error.message}</p>
    </div>
  );
}

export default Error;
