import React, { Fragment, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
// import { getFilteredEvents } from '../../api';
import EventList from '../../components/events/EventList';
import ResultsTitle from '../../components/events/results-title';
import Button from '../../components/ui/Button';
import useSWR from 'swr';

const FilteredEventsPage = () => {
  // const { hasError, filteredEvents, year, month } = props;
  const router = useRouter();
  const filter = router.query.slug;
  console.log(filter);

  // state & logic for getting client side data for filtered events
  const [loadedEvents, setLoadedEvents] = useState();
  const { data, error } = useSWR(
    'https://dummy-backend-803d1-default-rtdb.firebaseio.com/events.json'
  );
  useEffect(() => {
    const events = [];
    for (const key in data) {
      events.push({ id: key, ...data[key] });
    }
    setLoadedEvents(events);
  }, [data]);

  // loading state
  if (!loadedEvents) {
    return <p className='center'>Loading...</p>;
  }

  // get filters
  const filterYear = filter[0];
  const filterMonth = filter[1];
  const numYear = +filterYear;
  const numMonth = +filterMonth;

  // validate filter
  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12 ||
    error
  ) {
    return (
      <div className='center'>
        <p>Invalid Filter, please adjust values</p>
        <Button destination='/events'>Show All Events</Button>
      </div>
    );
  }

  let filteredEvents = loadedEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === numYear &&
      eventDate.getMonth() === numMonth - 1
    );
  });

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

// Server Side Props is also an option here.
// Choose Server Side OR Client Side Props, never both...

// export async function getServerSideProps(context) {
//   const { params } = context;

//   const filter = params.slug;
//   const filterYear = filter[0];
//   const filterMonth = filter[1];
//   const numYear = +filterYear;
//   const numMonth = +filterMonth;

//   if (
//     isNaN(numYear) ||
//     isNaN(numMonth) ||
//     numYear > 2030 ||
//     numYear < 2021 ||
//     numMonth < 1 ||
//     numMonth > 12
//   ) {
//     return {
//       // can also show notFound: true and do 404 page
//       props: {
//         hasError: true,
//       },
//     };
//   }

//   const filteredEvents = await getFilteredEvents(numYear, numMonth);
//   return {
//     props: {
//       filteredEvents: filteredEvents,
//       date: {
//         year: numYear,
//         month: numMonth,
//       },
//     },
//   };
// }
