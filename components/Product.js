import React from 'react';
import Image from 'next/image';
import styles from '../styles/Product.module.css';
import { useSelector } from 'react-redux';

export default function Product(props) {
    const { id, name, price, img } = props;
    const {imgUrl} = useSelector(state => state.products)
    const image =  imgUrl + img
    
  return (
    <div className={styles.product}>
        <Image src={image} width={273} height={250} alt='' />
        {/* <img src={imga} alt='' /> */}
        <div className={styles.name}>{name}</div>
        <div className={styles.price}>{price}$</div>
    </div>
  )
}
