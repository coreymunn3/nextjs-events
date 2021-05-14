import React from 'react';
import Head from 'next/head';
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
      <Head>
        <title>NextJS Events</title>
        <meta name='description' content='find great networking events' />
      </Head>
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
