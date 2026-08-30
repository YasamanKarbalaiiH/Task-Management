import Header from "./components/Header";
import Status from "./api/Status";
import Tasks from "../app/api/Tasks";
import Alart from "../app/api/Alart";
import TodayTasks from "./components/TodayTask";
import AlartsCard from "./components/AlartsCard";
import HomeCard from "./components/HomeCard";
export default async function Home() {
  const stats = await Status();
  const data = await Tasks();
  const alart = await Alart();
  return (
    <div>
      <Header title="Dashboard" showDate={true} />

      <div className="flex flex-col md:flex-row justify-between  md:gap-7">
        <div className="pl-2 left-side w-auto md:w-2/3">
          <div>
            <HomeCard stats={stats} />
            <TodayTasks data={data} />
          </div>
        </div>
        <div className="right-side mr-5 w-auto md:w-1/3">
          <div className="chart"></div>
          <AlartsCard data={alart} />
        </div>
      </div>
    </div>
  );
}
