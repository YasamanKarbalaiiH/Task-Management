import CreateTask from "../components/CreateTask";
import Tasks from "../api/Tasks";
import Events from "../api/Events";
import Calendar from "../components/calendar/Calendar";

async function Page() {
  const tasks = await Tasks();
  const events = await Events();

  return (
    <main className="min-h-screen bg-background px-4 py-5 md:px-6 lg:px-8">
      <div className="mx-auto max-w-[1600px]">
        {/* Header */}
        <div className="mb-6">
          <CreateTask title="Calendar" />
        </div>

        {/* Calendar */}
        <section className="w-full">
          <Calendar tasks={tasks} events={events} />
        </section>
      </div>
    </main>
  );
}

export default Page;
