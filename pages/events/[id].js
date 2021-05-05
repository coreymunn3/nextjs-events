import React, { Fragment } from 'react';
import { useRouter } from 'next/router';
import { getEventById } from '../../dummy-data';
// components
import EventLogistics from '../../components/events/event-logistics';
import EventSummary from '../../components/events/event-summary';
import EventContent from '../../components/events/event-content';
import Button from '../../components/ui/Button';

const EventDetailPage = () => {
  const router = useRouter();
  const event = getEventById(router.query.id);
  console.log(router.query);

  if (!event) {
    return (
      <div className='center'>
        <p>No event found</p>
        <Button destination='/events'>Back to Events</Button>
      </div>
    );
  }
  return (
    <Fragment>
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
