import CreateTask from "../components/CreateTask";
import Status from "../api/Status";
import TopCard from "../components/summary/TopCard";
import Tasks from "../api/Tasks";
import TaskLineChart from "../components/summary/LineChart";
import HomeCard from "../components/home/HomeCard";
async function page() {
  const stats = await Status();
  const task = await Tasks();

  return (
    <div className="min-h-screen bg-background px-4 py-5 md:px-6 lg:px-8">
      <section>
        <CreateTask title="Summary" />
      </section>
      <section>
        <HomeCard stats={stats} />
      </section>
      <div className="p-5">
        <section className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <TaskLineChart data={task} />
          </div>
          <div>
            <TopCard data={task} />
          </div>
        </section>
      </div>
    </div>
  );
}

export default page;
