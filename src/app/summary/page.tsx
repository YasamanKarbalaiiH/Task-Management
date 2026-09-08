import CreateTask from "../components/CreateTask";
import Status from "../api/Status";
import SummaryCard from "../components/summary/SummaryCard";
import TopCard from "../components/summary/TopCard";
import Tasks from "../api/Tasks";
import TaskLineChart from "../components/summary/LineChart";
async function page() {
  const stats = await Status();
  const task = await Tasks();

  return (
    <div>
      <section>
        <CreateTask title="Summary" />
      </section>
      <section>
        <SummaryCard stats={stats} />
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
