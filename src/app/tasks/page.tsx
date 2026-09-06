import CreateTask from "../components/CreateTask";
import Tasks from "../api/Tasks";
import TaskList from "../components/tasks/TaskList";

async function Page() {
  const tasks = await Tasks();

  return (
    <main className="min-h-screen bg-background px-4 py-5 md:px-6 lg:px-8">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-6">
          <CreateTask title="Tasks" />
        </div>

        <section>
          <TaskList tasks={tasks} />
        </section>
      </div>
    </main>
  );
}

export default Page;
