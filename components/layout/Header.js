import React from 'react';
import Link from 'next/link';

import styles from './header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href='/'>Next Events</Link>
      </div>
      <nav className={styles.navigation}>
        <ul>
          <li>
            <Link href='/events'>All Events</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
