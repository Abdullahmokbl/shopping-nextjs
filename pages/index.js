import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../styles/Home.module.css';
import Product from '../components/Product';
import { getProducts } from '../redux/productsSlice';
import Loading from '../components/Loading';

export default function Home() {
  const { isLoading } = useSelector(state => state.users)
  const { products } = useSelector( state => state.products)
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getProducts())
  },[])
  
  const product = products && products.map( product => {
    return(
      <Product key={product._id.toString()} name={product.name} price={product.price} img={product.img} />
      )
    })
    if(isLoading || isLoading === null){
      return <Loading />
    }
    return (
      <div className={styles.home}>
      <div className={styles.hero}></div>
      <h2>Featured Products</h2>
      <div className='container'>
        <div className={styles.products}>
          {product}
        </div>
      </div>
      <div className={styles.shop}><div>Shop Here Whatever You Want</div></div>
    </div>
  )
}