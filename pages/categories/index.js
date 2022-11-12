import React from 'react';
import { useSelector } from 'react-redux';
import Loading from '../../components/Loading';

export default function Categories() {
  const { isLoading } = useSelector(state => state.users)
  if(isLoading || isLoading === null){
    return <Loading />
  }
  return (
    <div></div>
  )
}
