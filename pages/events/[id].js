import React, { Fragment } from 'react';
import { getEventById, getFeaturedEvents } from '../../api';
import Head from 'next/head';
// components
import EventLogistics from '../../components/events/event-logistics';
import EventSummary from '../../components/events/event-summary';
import EventContent from '../../components/events/event-content';
import Button from '../../components/ui/Button';

const EventDetailPage = (props) => {
  const { event } = props;

  // events not featured will show a short loading screen
  if (!event) {
    return (
      <div className='center'>
        <p>Loading</p>
      </div>
    );
  }
  return (
    <Fragment>
      <Head>
        <title>{event.title}</title>
        <meta name='description' content={event.description} />
      </Head>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </Fragment>
  );
};

export default EventDetailPage;

export async function getStaticProps(context) {
  const { params } = context;
  const eventId = params.id;

  const event = await getEventById(eventId);

  if (!event) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      event: event,
    },
    revalidate: 30,
  };
}

// we don't need to prerender all events, just featured events
// need to allow fallback since not all pages are pregenerated
export async function getStaticPaths() {
  const eventsToPrerender = await getFeaturedEvents();
  const eventPaths = eventsToPrerender.map((event) => ({
    params: { id: event.id },
  }));
  console.log(eventPaths);
  return {
    paths: eventPaths,
    fallback: true,
  };
}
