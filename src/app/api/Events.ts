export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  type: string;
}

async function Events(): Promise<CalendarEvent[]> {
  const res = await fetch("http://localhost:8000/events", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch events");
  }

  return res.json();
}

export default Events;
