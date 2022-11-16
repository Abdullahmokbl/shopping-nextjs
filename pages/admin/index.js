import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { delAllProducts, delProduct, getSomeProducts } from '../../redux/productsSlice';
import { delAllUsers, delUser, getSomeUsers } from '../../redux/usersSlice';
import styles from '../../styles/Admin.module.css';
import Pagination from '../../components/Pagination';
import Loading from '../../components/Loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';

export default function Admin() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { isLoading, someUsers, usersCount, u_pagesCount, user} = useSelector(state => state.users)
  const { someProducts, productsCount, p_pagesCount} = useSelector(state => state.products)

  useEffect(() => {
    if(user){
      if(!user.isAdmin) router.push('/404')
    }
  })

  const [userPage, setUserPage] = useState(1);
  const [productPage, setProductPage] = useState(1);

  useEffect(() => {
    dispatch(getSomeUsers(userPage))
  }, [userPage])
  useEffect(() => {
    dispatch(getSomeProducts(productPage));
  }, [productPage])

  const user_previous = () => {
    if(userPage > 1) setUserPage(userPage - 1)
  }
  const user_next = () => {
    if(userPage < u_pagesCount) setUserPage(userPage + 1)
  }
  const product_previous = () => {
    if(productPage > 1) setProductPage(productPage - 1)
  }
  const product_next = () => {
    if(productPage < p_pagesCount) setProductPage(productPage + 1)
  }

  let userId = userPage*5 - 5;
  const user_info = someUsers.length !== 0 && someUsers.map(user => {
    const { _id, username, email, gender, date} = user;
    userId++;
    return(
      <ul key={_id}>
        <li>{userId}</li>
        <li>{username}</li>
        <li>{email}</li>
        <li>{gender? 'Male': 'Female'}</li>
        <li>{new Date(date).toDateString()}</li>
        <li><div className={styles.delete} onClick={() => dispatch(delUser(_id))}><FontAwesomeIcon icon={faTrash} size='xl' /></div></li>
      </ul>
    )
  })
  let productId = userPage*5 - 5;
  const product = someProducts.length !== 0 && someProducts.map(product => {
    const { _id, name, price, info, seller } = product;
    productId++;
    return(
      <ul key={_id}>
        <li>{productId}</li>
        <li>{name}</li>
        <li>{price}</li>
        <li>{info}</li>
        <li>{seller}</li>
        <li><div className={styles.delete} onClick={() => dispatch(delProduct(_id))}><FontAwesomeIcon icon={faTrash} size='xl' /></div></li>
      </ul>
    )
  })

  const Users = () => {
    return(
      <div className={styles.users}>
        <ul>
          <li>ID</li>
          <li>Username</li>
          <li>Email</li>
          <li>Gender</li>
          <li>Created At</li>
          <li>Delete</li>
        </ul>
        {user_info}
        <div className={styles.del_all} onClick={() => dispatch(delAllUsers())}>Delete All Users</div>
        <Pagination page={userPage} pagesCount={u_pagesCount} count={usersCount} previous={user_previous} next={user_next} />
      </div>
    )
  }
  const Products = () => {
    return(
      <div className={styles.products}>
        <ul>
        <li>ID</li>
        <li>Name</li>
        <li>Price</li>
        <li>Info</li>
        <li>Seller</li>
        <li>Delete</li>
        </ul>
        {product}
        <div className={styles.del_all} onClick={() => dispatch(delAllProducts())}>Delete All Products</div>
        <Pagination page={productPage} pagesCount={p_pagesCount} count={productsCount} previous={product_previous} next={product_next} />
      </div>
    )
  }
  if(isLoading || isLoading === null){
    return <Loading />
  }
  return (
    <div className={`${styles.admin} container navpd`}>
      <h2 className={styles.welcome}> Welcome {user && user.username} </h2>
      <h2>Users</h2>
      {someUsers.length !== 0 ? <Users /> : <h3 className={styles.no}>There is no users</h3>}
      <div className={styles.line}></div>
      <h2>Products</h2>
      {someProducts.length !== 0 ? <Products /> : <h3 className={styles.no}>There is no products</h3>}
    </div>
  )
}
