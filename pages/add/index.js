import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct } from '../../redux/productsSlice';
import styles from '../../styles/Add.module.css';
import Loading from '../../components/Loading';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Add() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isLoading, isAuthenticated, user } = useSelector(state => state.users)
  const seller_name = user? user.username : '';
  const [disabled, setDisabled] = useState(false);
  const [error, setError] = useState('');
  const [ product, setProduct ] = useState({
    name: '',
    price: '',
    info: '',
    seller: seller_name
  })
  const [img, setImg] = useState('')

  const handleChange = e => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value
    })
  }
  const handleImg = e => {
    setImg(e.target.files[0])
  }
  const handleSubmit = e => {
    e.preventDefault();
    if(img){
      var formData = new FormData();
      formData.append('img', img);
      formData.append('product', JSON.stringify(product))
    }
    setDisabled(true);
    dispatch(addProduct(formData))
    .unwrap()
    .then(() => {
      setError('')
      router.push('/')
    })
    .catch( e => {
      setError(e.msg);
      setDisabled(false);
    })
  }
  const login = () => {
    return(
      <Link href='login' className={styles.link}>Login to continue</Link>
    )
  }
  const form = () => {
    return(
      <form method='POST' encType='multipart/form-data' onSubmit={handleSubmit}>
        <div className='error'>{error}</div>
        <label htmlFor='name'>Name</label>
        <input type='text' name='name' onChange={(e) => handleChange(e)} required/>
        <label htmlFor='price'>Price</label>
        <input type='number' name='price' onChange={(e) => handleChange(e)} required/>
        <label htmlFor='info'>Info</label>
        <input type='text' name='info' onChange={(e) => handleChange(e)} required/>
        <label htmlFor='upload-photo'>Picture</label>
        <input type='file' name='img' id='upload-photo' onChange={(e) => handleImg(e)} required/>
        <button type='submit' disabled={disabled} style={disabled? {opacity: .5,cursor: 'initial'}:{opacity: 1,cursor:'pointer'}} >{disabled? <FontAwesomeIcon icon={faSpinner} size='xl' spin/>:'Add Product'}</button>
      </form>
    )
  }
  if(isLoading || isLoading === null){
    return <Loading />
  }
  return (
    <div className={`${styles.add} container navpd`}>
        {isAuthenticated ? form() : login()}
    </div>
  )
}
