async function Status() {
  const res = await fetch("http://localhost:8000/summary");

  if (!res.ok) {
    throw new Error("Failed to fetch tasks");
  }

  const tasks = await res.json();
  const stats = {
    cancel: tasks.cancelled,
    complete: tasks.completed,
    ongoing: tasks.ongoing,
    process: tasks.inProgress,
  };

  return stats;
}
export default Status;
