import React, {use, useState} from 'react';
import Link from 'next/link';
import styles from '../../styles/Login.module.css';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/usersSlice';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faFacebookF, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';

export default function Login() {
  const dispatch = useDispatch();
  const router = useRouter();

  const [error, setError] = useState('');
  const [user, setUser] = useState({
    email: '',
    password: '',
    remember: false
  })

  const handleChange = e => {
    if(e.target.name === 'remember'){
      setUser({
        ...user,
        [e.target.name] : e.target.checked
      })
    }else{
      setUser({
        ...user,
        [e.target.name] : e.target.value
      })
    }
  }

  const handleSubmit = async e => {
    e.preventDefault();
    dispatch(login(user))
    .unwrap()
    .then(() => {
      setError('')
      router.push('/')
    })
    .catch( e => {
      setError(e.msg)
    })
  }
  return (
    <div className={styles.page}>
        <div className={styles.login}>
            <h3>Login</h3>
            <div className={styles.error}>{error}</div>
            <form method='POST' onSubmit={handleSubmit}>
                <label htmlFor='email'>Email</label>
                <input type='email' name='email' onChange={handleChange} required/>
                <label htmlFor='password'>Password</label>
                <input type='password' name='password' onChange={handleChange} required/>
                <label>
                  <input type='checkbox' name='remember' onChange={handleChange}/>Remember me?
                </label>
                <input type='submit' value='Login'/>
            </form>
            <div className={styles.forget}><a href='#'>Forget password?</a></div>
            <div className={styles.or}><span>OR</span></div>
            <div className={styles.svg}>
              <a><FontAwesomeIcon icon={faGoogle} size='xl'/></a>
              <a><FontAwesomeIcon icon={faFacebookF} size='xl'/></a>
              <a><FontAwesomeIcon icon={faLinkedinIn} size='xl'/></a>
            </div>
            <div className={styles.signup}>Need an account? <Link href='/signup'>Sign up</Link></div>
        </div>
    </div>
  )
}
