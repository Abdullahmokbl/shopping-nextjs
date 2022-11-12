import React, { useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import Loading from './Loading';

export default function Layout(props) {
  // const { isLoading } = useSelector(state => state.users)
  const { pathname, push } = useRouter();
  useEffect(() => {
    setTimeout(() => {
      if(pathname === '/_error') push('/')
    }, 5000)
  })

  return (
    <>
      {pathname !== '/login' && pathname !== '/signup' && pathname !== '/_error' && <Navbar />}
      {props.children}
      {pathname !== '/login' && pathname !== '/signup' && pathname !== '/_error' && <Footer />}
    </>
  )

  // return(
  //   <>
  //   {/* {isLoading || isLoading === null? <Loading /> : <Layout />} */}
  //   <Layout />
  //   </>
  // )
}
