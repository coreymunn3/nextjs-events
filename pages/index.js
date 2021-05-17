import React from 'react';
import Head from 'next/head';
import { getFeaturedEvents } from '../api';
import EventList from '../components/events/EventList';
import NewsletterRegistration from '../components/input/newsletter-registration';

const HopePage = (props) => {
  return (
    <div>
      <Head>
        <title>NextJS Featured Events</title>
        <meta name='description' content='find great networking events' />
      </Head>
      <NewsletterRegistration />
      <EventList events={props.featuredEvents} />
    </div>
  );
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
