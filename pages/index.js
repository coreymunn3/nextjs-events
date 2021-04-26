import React from 'react';
import { getFeaturedEvents } from '../dummy-data';
import EventList from '../components/events/EventList';

const HopePage = () => {
  const featuredEvents = getFeaturedEvents();
  return <EventList events={featuredEvents} />;
};

export default HopePage;
