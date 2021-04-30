import React from 'react';
import Link from 'next/link';
import styles from './button.module.css';

const Button = ({ destination, children, onClick }) => {
  if (destination) {
    return (
      <Link href={destination}>
        <a className={styles.btn}> {children}</a>
      </Link>
    );
  }
  return (
    <button className={styles.btn} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
