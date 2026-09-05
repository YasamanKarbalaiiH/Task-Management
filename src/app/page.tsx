import Status from "./api/Status";
import Tasks from "../app/api/Tasks";
import TaskChartData from "./api/TaskChartData";
import TaskChart from "./components/home/TaskChart";
import TaskStatusPie from "./components/home/TaskStatusPie";
import Alart from "../app/api/Alart";
import TodayTasks from "./components/home/TodayTask";
import AlartsCard from "./components/home/AlartsCard";
import HomeCard from "./components/home/HomeCard";
import CreateTask from "./components/CreateTask";

export default async function Home() {
  const stats = await Status();
  const data = await Tasks();
  const alart = await Alart();
  const overview = await TaskChartData();

  return (
    <main className="min-h-screen bg-background px-4 py-5 md:px-6 lg:px-8">
      <div className="mx-auto max-w-[1600px]">
        {/* Create Task */}
        <div className="mb-6">
          <CreateTask />
        </div>

        {/* Dashboard */}
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          {/* Left Section */}
          <section className="space-y-6 xl:col-span-2">
            {/* Statistics */}
            <HomeCard stats={stats} />

            {/* Today's Tasks */}
            <TodayTasks data={data} />

            {/* Task Overview */}
            <TaskChart tasks={overview} />
          </section>

          {/* Right Section */}
          <aside className="space-y-6">
            {/* Task Status */}
            <TaskStatusPie tasks={overview} />

            {/* Alerts */}
            <AlartsCard data={alart} />
          </aside>
        </div>
      </div>
    </main>
  );
}
