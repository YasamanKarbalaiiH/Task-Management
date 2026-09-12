import CreateTask from "../components/CreateTask";
import Tasks from "../api/Tasks";
import TaskList from "../components/tasks/TaskList";

async function Page() {
  const tasks = await Tasks();

  return (
    <section className="min-h-screen bg-background px-4 py-5 md:px-6 lg:px-8">
      <div>
        <CreateTask title="Tasks" />
      </div>
      <div>
        <TaskList tasks={tasks} />
      </div>
    </section>
  );
}

export default Page;
