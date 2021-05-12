import React from 'react';
import { useRouter } from 'next/router';
import { getAllEvents } from '../../api';
import EventList from '../../components/events/EventList';
import EventsSearch from '../../components/events/EventsSearch';

const Events = (props) => {
  const { events } = props;
  const router = useRouter();

  const handleFindEvents = (year, month) => {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  };
  return (
    <div>
      <EventsSearch onSearch={handleFindEvents} />
      <EventList events={events} />
    </div>
  );
};

export default Events;

export async function getStaticProps() {
  const events = await getAllEvents();

  return {
    props: {
      events: events,
    },
    revalidate: 60,
  };
}
