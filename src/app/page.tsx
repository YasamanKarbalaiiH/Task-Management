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
    <div>
      <CreateTask />

      <div className="flex flex-col md:flex-row justify-between  md:gap-7">
        <div className="pl-2 left-side w-auto md:w-2/3">
          <div>
            <HomeCard stats={stats} />
            <TodayTasks data={data} />
            <TaskChart tasks={overview} />
          </div>
        </div>
        <div className="right-side mr-5 w-auto md:w-1/3">
          <TaskStatusPie tasks={overview} />
          <AlartsCard data={alart} />
        </div>
      </div>
    </div>
  );
}
