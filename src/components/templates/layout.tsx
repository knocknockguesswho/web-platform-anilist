import Icon from 'Components/atoms/icon';
import Link from 'next/link';
import React from 'react';

interface IProps {
  children: React.ReactNode;
}
const Layout = (props: IProps) => {
  return (
    <React.Fragment>
      <header className='sticky top-0 w-screen bg-white shadow-md z-20 flex justify-center items-center'>
        <div className='w-full max-w-[1440px] p-4 flex flex-row justify-between'>
          <Link href='/'><span className='font-bold'>Anime Collection</span></Link>
          <Link href='/collection'>
            <span className='sr-only'>Go to collection list page</span>
            <Icon name='grid' size={24} color='black' />
          </Link>
        </div>
      </header>
      <main className='min-w-screen max-w-[1140px] mx-auto'>
        {props.children}
      </main>
    </React.Fragment>
  );
};

export default Layout;
