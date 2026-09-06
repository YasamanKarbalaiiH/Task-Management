import CreateTask from "../components/CreateTask";
import Tasks from "../api/Tasks";
import TaskList from "../components/tasks/TaskList";

async function Page() {
  const tasks = await Tasks();

  return (
    <section>
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
