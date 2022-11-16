import React from 'react';
import { useSelector } from 'react-redux';
import styles from '../../styles/Contact.module.css';
import Loading from '../../components/Loading';

export default function Contact() {
  const { isLoading } = useSelector(state => state.users);
  if(isLoading || isLoading === null){
    return <Loading />
  }
  return (
    <div className={`${styles.contact} container navpd`}>
        <h2>Contact Us</h2>
        <div>
            <h3>Shopping</h3>
            <h3><a href='tel:+201060619338'>+20106 061 9338</a></h3>
            <h3><a href='mailto:abdullahmokbl@yahoo.com'>abdullahmokbl@yahoo.com</a></h3>
            <p>If you have a query regarding an element of our website whether it be about processing or an aspect of your order, our in-store team would love to assist you. Don't hesitate to contact us on the following email, or call the store between our working hours. We also channel feedback through our Facebook Page and Instagram. We will aim to reply to your query within 24 working hours. For all product and order enquiries please email:<a href='#'>abdullahmokbl@yahoo.com</a></p>
            <p>Our team at Shopping are always interested in your feedback to do with your physical and online shopping experience and our services. You can forward your comments to the supplied emails or find us on Facebook!</p>
            <p>Thank you so much for supporting your local, as well as NZ designers and brands! x</p>
        </div>
    </div>
  )
}
