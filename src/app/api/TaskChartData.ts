export type Task = {
  id: string;
  title: string;
  project: string;
  status: "ongoing" | "process" | "complete" | "cancel";
  progress: number;
  dueDate: string;
  assignees: string[];
};

async function TaskChartData(): Promise<Task[]> {
  const res = await fetch("http://localhost:8000/tasks");

  if (!res.ok) {
    throw new Error("Failed to fetch tasks");
  }

  const data: Task[] = await res.json();

  return data;
}

export default TaskChartData;
