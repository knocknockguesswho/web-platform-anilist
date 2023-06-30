import React from 'react';
import Link from 'next/link';
import Button from 'Components/atoms/button';
import { useRouter } from 'next/router';

const Error500 = () => {
  const router = useRouter();
  return (
    <div className='w-full min-h-screen flex flex-col items-center justify-center'>
      <Link className='absolute top-0 flex items-start justify-start self-start z-50 px-6' href='/' aria-label='go to homepage'>
        Go to Home Page
      </Link>
      <h1 className='text-5xl text-shadow-sm'>500</h1>
      <h2 className='font-normal'>Ooops sorry, something happened.</h2>
      <div className='py-10 flex flex-row space-x-4'>
        <Button variant='secondary' onClick={() => router.back()}>Back</Button>
        <Button variant='secondary' onClick={() => router.replace('/')}>Home</Button>
      </div>
    </div>
  );
};

export default Error500;
