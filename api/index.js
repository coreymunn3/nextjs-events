import axios from 'axios';
export async function getAllEvents() {
  const { data } = await axios.get(
    'https://dummy-backend-803d1-default-rtdb.firebaseio.com/events.json'
  );
  const events = [];
  for (const key in data) {
    events.push({ id: key, ...data[key] });
  }
  return events;
}

export async function getFeaturedEvents() {
  const events = await getAllEvents();
  return events.filter((event) => event.isFeatured);
}

export async function getEventById(id) {
  const events = await getAllEvents();
  return events.find((event) => event.id === id);
}

export const getFilteredEvents = async (year, month) => {
  const events = await getAllEvents();
  let filteredEvents = events.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });
  return filteredEvents;
};
