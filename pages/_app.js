import '../styles/globals.css';
import { store } from './../redux/store';
import { Provider } from 'react-redux';
import Layout from '../components/Layout';
import { useEffect } from 'react';
import { loadUser } from '../redux/usersSlice';

function MyApp({ Component, pageProps }) {
  
  useEffect(() => {
    store.dispatch(loadUser());
  },[])

  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  )
}

export default MyApp
