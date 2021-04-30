import React, { useRef } from 'react';
import Button from '../ui/Button';
import styles from './eventsSearch.module.css';

const EventsSearch = ({ onSearch }) => {
  const yearInputRef = useRef();
  const monthInputRef = useRef();
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const handleSubmit = (e) => {
    e.preventDefault();
    const year = yearInputRef.current.value;
    const month = monthInputRef.current.value;
    console.log(year, month);

    onSearch(year, month);
  };
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.controls}>
        <div className={styles.control}>
          <label htmlFor='year'>Year</label>
          <select id='year' ref={yearInputRef}>
            <option value={2021}>2021</option>
            <option value={2022}>2022</option>
          </select>
        </div>
        <div className={styles.control}>
          <label htmlFor='month'>Month</label>
          <select id='month' ref={monthInputRef}>
            {months.map((month, i) => (
              <option key={month} value={i + 1}>
                {month}
              </option>
            ))}
          </select>
        </div>
      </div>
      <Button>Find Events</Button>
    </form>
  );
};

export default EventsSearch;
