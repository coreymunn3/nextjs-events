import React, { Fragment } from 'react';
import { useRouter } from 'next/router';
import { getFilteredEvents } from '../../api';
import EventList from '../../components/events/EventList';
import ResultsTitle from '../../components/events/results-title';
import Button from '../../components/ui/Button';

const FilteredEventsPage = (props) => {
  const router = useRouter();
  const { hasError, filteredEvents, year, month } = props;

  if (hasError) {
    return (
      <div className='center'>
        <p>Invalid Filter, please adjust values</p>
        <Button destination='/events'>Show All Events</Button>
      </div>
    );
  }

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
      <ResultsTitle date={new Date(year, month - 1)} />
      <EventList events={filteredEvents} />
    </Fragment>
  );
};

export default FilteredEventsPage;

export async function getServerSideProps(context) {
  const { params } = context;

  const filter = params.slug;
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
    return {
      // can also show notFound: true and do 404 page
      props: {
        hasError: true,
      },
    };
  }

  const filteredEvents = await getFilteredEvents(numYear, numMonth);
  return {
    props: {
      filteredEvents: filteredEvents,
      date: {
        year: numYear,
        month: numMonth,
      },
    },
  };
}
