import Link from 'next/link';
import React from 'react';
import { useSelector } from 'react-redux';
import styles from '../../styles/Cart.module.css';
import Loading from '../../components/Loading';

export default function Cart() {
  const { isLoading } = useSelector(state => state.users);
  if(isLoading || isLoading === null){
    return <Loading />
  }
  return (
    <div className={`${styles.cart} container navpd`}>
        <h2>Your Cart</h2>
        <div>
            <h3>Your cart is empty.</h3>
            <Link href='/' className={styles.link}>Continue browsing here</Link>
        </div>
    </div>
  )
}
