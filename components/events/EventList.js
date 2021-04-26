import React from 'react';
import EventItem from './EventItem';
import styles from './eventList.module.css';

const EventList = ({ events }) => {
  return (
    <div>
      <ul className={styles.list}>
        {events.map((event) => (
          <EventItem event={event} key={event.id} />
        ))}
      </ul>
    </div>
  );
};

export default EventList;
