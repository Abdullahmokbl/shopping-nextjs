import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/usersSlice';
import styles from '../styles/Navbar.module.css';

export default function Navbar() {
    const pathname = useRouter().pathname;
    const dispatch = useDispatch();
    const {isAuthenticated} = useSelector(state => state.users);
    const [showdp, setShowdp] = useState(false)

    const auth = () => {
        return(
            <div className={styles.ul}>
                <Link href='login'>Login</Link>
                <Link href='signup'>Signup</Link>
            </div>
        )
    }
    const welcome = () => {
        return(
            <div className={styles.ul}>
                <Link href='profile'>Welcome Abdullah</Link>
                <Link href='login' onClick={()=> dispatch(logout())}>Logout</Link>
            </div>
        )
    }
  return (
    <nav className={styles.nav}>
        <div className={`${styles.cont} container`}>
            <div className={styles.title}><Link href='/'>Shopping</Link></div>
            <div className={styles.ul}>
                <Link href='add' className={`${pathname === '/add' && styles.active}`} >Add Item</Link>
                <Link href='categories' className={`${pathname === '/categories' && styles.active}`} >Categories</Link>
                <Link href='cart' className={`${pathname === '/cart' && styles.active}`} >Cart</Link>
                <Link href='contact' className={`${pathname === '/contact' && styles.active}`} >Contact Us</Link>
            </div>
            {isAuthenticated? welcome(): auth()}
            <div className={`${styles.menu} ${showdp? styles.active:''}`} onClick={() => !showdp ? setShowdp(true): setShowdp(false)}>
                <div></div>
                <div></div>
            </div>
            <div className={`${styles.dropdown} ${showdp? styles.show: ''}`}>
            <Link href='add' onClick={()=> setShowdp(false)}>Add Item</Link>
            <Link href='categories' onClick={()=> setShowdp(false)}>Categories</Link>
            <Link href='cart' onClick={()=> setShowdp(false)}>Cart</Link>
            <Link href='contact' onClick={()=> setShowdp(false)}>Contact Us</Link>
            <div className={styles.line}></div>
            {!isAuthenticated && <Link href='login' onClick={()=> setShowdp(false)}>Login</Link>}
            {!isAuthenticated && <Link href='signup' onClick={()=> setShowdp(false)}>Sign up</Link>}
            </div>
        </div>
    </nav>
  )
}
