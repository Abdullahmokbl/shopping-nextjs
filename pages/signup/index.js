import React, {useState} from 'react';
import Link from 'next/link';
import styles from '../../styles/Signup.module.css';
import { useDispatch } from 'react-redux';
import { signup } from '../../redux/usersSlice';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faFacebookF, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';

export default function Signup() {
  const dispatch = useDispatch();
  const router = useRouter();

  const [error, setError] = useState('');
  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
    gender: 'male'
  })

  const handleChange = e => {
    setUser({
      ...user,
      [e.target.name] : e.target.value
    })
  }

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(signup(user))
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
      <div className={styles.signup}>
        <h3>Signup</h3>
        <div className={styles.error}>{error}</div>
        <form method='POST' onSubmit={handleSubmit}>
          <label htmlFor='username'>Username</label>
          <input type='text' name='username' onChange={handleChange} required/>
          <label htmlFor='email'>Email</label>
          <input type='email' name='email' onChange={handleChange} required/>
          <label htmlFor='password'>Password</label>
          <input type='password' name='password' onChange={handleChange} required/>
          <label htmlFor='gender' className={styles.gender} onChange={handleChange}>
            <input type='radio' name='gender' value='male' defaultChecked />Male
            <input type='radio' name='gender' value='female' />Female
          </label>
          <input type='submit' value='SIGN UP' />
        </form>
        <div className={styles.or}>
          <span>OR</span>
        </div>
        <div className={styles.svg}>
          <a><FontAwesomeIcon icon={faGoogle} size='xl'/></a>
          <a><FontAwesomeIcon icon={faFacebookF} size='xl'/></a>
          <a><FontAwesomeIcon icon={faLinkedinIn} size='xl'/></a>
        </div>
        <div className={styles.login}>ALready a user? <Link href='/login'>Login</Link></div>
      </div>
    </div>
  )
}
