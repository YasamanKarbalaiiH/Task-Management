import CreateTask from "../components/CreateTask";
import Tasks from "../api/Tasks";
import Events from "../api/Events";
import Calendar from "../components/calendar/Calendar";
async function page() {
  const tasks = await Tasks();
  const events = await Events();
  return (
    <div className="min-h-screen bg-background px-4 py-5 md:px-6 lg:px-8">
      <section>
        <CreateTask title="Calendar" />
      </section>
      <section className="p-6">
        <Calendar tasks={tasks} events={events} />
      </section>
    </div>
  );
}

export default page;
