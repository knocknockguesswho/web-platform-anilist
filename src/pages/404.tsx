import React from 'react';
import { useRouter } from 'next/router';
import Button from 'Components/atoms/button';

const Error404 = () => {
  const router = useRouter();
  return (
    <div className='w-full min-h-screen flex flex-col items-center justify-center'>
      <h1 className='text-5xl text-shadow-sm'>404</h1>
      <h2 className='font-normal'>Page not found.</h2>
      <div className='py-10 flex flex-row space-x-4'>
        <Button variant='secondary' onClick={() => router.back()}>Back</Button>
        <Button variant='secondary' onClick={() => router.replace('/')}>Home</Button>
      </div>
    </div>
  );
};

export default Error404;
