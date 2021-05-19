import styles from './newsletter-registration.module.css';
import { useRef, useContext } from 'react';
import axios from 'axios';
import NotificationContext from '../../store/notificationContext';

function NewsletterRegistration() {
  const emailRef = useRef();
  const notificationCtx = useContext(NotificationContext);

  function registrationHandler(event) {
    event.preventDefault();
    notificationCtx.showNotification({
      title: 'Signin Up...',
      message: 'Registering for Newsletter',
      status: 'pending',
    });

    axios
      .post('/api/newsletter', { email: emailRef.current.value })
      .then(({ data }) => {
        notificationCtx.showNotification({
          title: 'Success',
          message: 'Registered for Newsletter',
          status: 'success',
        });
        console.log(data);
      })
      .catch((error) => {
        notificationCtx.showNotification({
          title: 'Error',
          message: error.message || 'Unable to Signup for Newsletter',
          status: 'error',
        });
      });
  }

  return (
    <section className={styles.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={styles.control}>
          <input
            type='email'
            id='email'
            placeholder='Your email'
            aria-label='Your email'
            ref={emailRef}
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
