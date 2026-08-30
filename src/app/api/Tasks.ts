async function Tasks() {
  type Task = {
    id: string;
    title: string;
    progress: number;
    assignees: string[];
    dueDate: string;
    project: string;
  };

  type User = {
    id: string;
    avatar: string;
  };
  const res = await fetch("http://localhost:8000/tasks");

  if (!res.ok) {
    throw new Error("Failed to fetch tasks");
  }

  const data = await res.json();

  const res2 = await fetch("http://localhost:8000/users");

  if (!res2.ok) {
    throw new Error("Failed to fetch users");
  }

  const users = await res2.json();

  const tasks = data.map((task: Task) => {
    const assignees = task.assignees.map((userId: string) => {
      const user = users.find((user: User) => user.id === userId);

      return {
        id: user.id,
        name: user.name,
        avatar: user.avatar,
      };
    });

    return {
      title: task.title,
      percent: task.progress,
      dueDate: task.dueDate,
      project: task.project,
      assignees,
    };
  });

  return tasks;
}

export default Tasks;
