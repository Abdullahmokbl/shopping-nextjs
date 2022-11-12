import React from 'react';
import { useSelector } from 'react-redux';
import styles from '../../styles/Profile.module.css';
import Loading from '../../components/Loading';

export default function Profile() {
  const { isLoading } = useSelector(state => state.users);
  if(isLoading || isLoading === null){
    return <Loading />
  }
  return (
    <div></div>
  )
}
