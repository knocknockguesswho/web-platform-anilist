import React from 'react';

interface IProps {
  children: React.ReactNode;
}
const Layout = (props: IProps) => {
  return (
    <React.Fragment>
      <main className='min-w-screen max-w-[1140px] mx-auto'>
        {props.children}
      </main>
    </React.Fragment>
  );
};

export default Layout;
