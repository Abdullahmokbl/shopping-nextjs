import React, {use, useState} from 'react';
import Link from 'next/link';
import styles from '../../styles/Login.module.css';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/usersSlice';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faFacebookF, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import Head from 'next/head';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

export default function Login() {
  const dispatch = useDispatch();
  const router = useRouter();

  const [disabled, setDisabled] = useState(false);
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
    setDisabled(true);
    dispatch(login(user))
    .unwrap()
    .then((res) => {
      setError('')
      if(!res.token) router.push('/code')
      else router.push('/')
    })
    .catch( e => {
      setError(e.msg);
      setDisabled(false);
    })
  }
  return (
    <div className={styles.page}>
      <Head><title>Forgetten password</title></Head>
        <div className={styles.login}>
            <h3>Login</h3>
            <div className='error'>{error}</div>
            <form method='POST' onSubmit={handleSubmit}>
                <label htmlFor='email'>Email</label>
                <input type='email' name='email' onChange={handleChange} required/>
                <label htmlFor='password'>Password</label>
                <input type='password' name='password' onChange={handleChange} required/>
                <label>
                  <input type='checkbox' name='remember' onChange={handleChange} />Remember me?
                </label>
                <button type='submit' disabled={disabled} style={disabled? {opacity: .5,cursor: 'initial'}:{opacity: 1,cursor:'pointer'}} >{disabled? <FontAwesomeIcon icon={faSpinner} size='xl' spin/>:'Login'}</button>
            </form>
            <div className={styles.forget}><Link href='identify'>Forget password?</Link></div>
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
