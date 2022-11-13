import '../styles/globals.css';
import { store } from './../redux/store';
import { Provider } from 'react-redux';
import Layout from '../components/Layout';
import { useEffect } from 'react';
import { loadUser } from '../redux/usersSlice';
import Head from 'next/head';
// font-awesome
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

function MyApp({ Component, pageProps }) {
  
  useEffect(() => {
    store.dispatch(loadUser());
  },[])

  return (
    <Provider store={store}>
      <Head>
        <title>Shopping</title>
        <link rel="icon" type="image/x-icon" href="/flower.png" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  )
}

export default MyApp
