async function Tasks() {
  type Task = {
    id: string;
    title: string;
    status: "ongoing" | "process" | "complete" | "cancel";
    assignees: string[];
    dueDate: string;
    project: string;
  };

  type User = {
    id: string;
    name: string;
    avatar: string;
  };

  const res = await fetch("http://localhost:8000/tasks");

  if (!res.ok) {
    throw new Error("Failed to fetch tasks");
  }

  const data: Task[] = await res.json();

  const res2 = await fetch("http://localhost:8000/users");

  if (!res2.ok) {
    throw new Error("Failed to fetch users");
  }

  const users: User[] = await res2.json();

  const tasks = data.map((task) => {
    const assignees = task.assignees.map((userId) => {
      const user = users.find((user) => user.id === userId);

      if (!user) {
        throw new Error(`User with id ${userId} not found`);
      }

      return {
        id: user.id,
        name: user.name,
        avatar: user.avatar,
      };
    });

    return {
      title: task.title,
      status: task.status,
      dueDate: task.dueDate,
      project: task.project,
      assignees,
    };
  });

  return tasks;
}

export default Tasks;
