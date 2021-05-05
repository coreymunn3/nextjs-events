import React, { Fragment } from 'react';
import { useRouter } from 'next/router';
import { getFilteredEvents } from '../../dummy-data';
import EventList from '../../components/events/EventList';
import ResultsTitle from '../../components/events/results-title';
import Button from '../../components/ui/Button';

const FilteredEventsPage = () => {
  const router = useRouter();
  const filter = router.query.slug;

  if (!filter) {
    return <p className='center'>Loading...</p>;
  }
  const filterYear = filter[0];
  const filterMonth = filter[1];
  const numYear = +filterYear;
  const numMonth = +filterMonth;

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12
  ) {
    return (
      <div className='center'>
        <p>Invalid Filter, please adjust values</p>
        <Button destination='/events'>Show All Events</Button>
      </div>
    );
  }

  const filteredEvents = getFilteredEvents(numYear, numMonth);
  console.log(filteredEvents);
  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <div className='center'>
        <p>No Events Found for this Filter</p>
        <Button destination='/events'>Show All Events</Button>
      </div>
    );
  }
  return (
    <Fragment>
      <ResultsTitle date={new Date(numYear, numMonth - 1)} />
      <EventList events={filteredEvents} />
    </Fragment>
  );
};

export default FilteredEventsPage;
