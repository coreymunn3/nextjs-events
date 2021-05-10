import React from 'react';
import { getFeaturedEvents } from '../api';
import EventList from '../components/events/EventList';

const HopePage = (props) => {
  return <EventList events={props.featuredEvents} />;
};

export default HopePage;

export async function getStaticProps(context) {
  const featuredEvents = await getFeaturedEvents();
  return {
    props: {
      featuredEvents: featuredEvents,
    },
    // regenerate the page every half hour
    revalidate: 1800,
  };
}
