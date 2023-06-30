import React from 'react';
import Error404 from './404';
import Error500 from './500';

function Error({ statusCode }: {statusCode: number | boolean}) {
  console.log({ statusCode });
  if (statusCode === 404) return <Error404 />;
  if (statusCode === 500) return <Error500 />;
  return (
    <p>
      {statusCode
        ? `An error ${statusCode} occurred on server`
        : 'An error occurred on client'}
    </p>
  );
}

Error.getInitialProps = ({ res, err }: any) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
