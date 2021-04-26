import React from 'react';
import Link from 'next/link';
import styles from './button.module.css';

const Button = ({ destination, children }) => {
  return (
    <Link href={destination}>
      <a className={styles.btn}> {children}</a>
    </Link>
  );
};

export default Button;
