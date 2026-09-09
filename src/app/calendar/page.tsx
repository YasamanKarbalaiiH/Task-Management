import CreateTask from "../components/CreateTask";
import Tasks from "../api/Tasks";
import Events from "../api/Events";
import Calendar from "../components/calendar/Calendar";
async function page() {
  const tasks = await Tasks();
  const events = await Events();
  return (
    <div>
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
