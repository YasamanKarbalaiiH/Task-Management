import CreateTask from "../components/CreateTask";
import Status from "../api/Status";
import TopCard from "../components/summary/TopCard";
import Tasks from "../api/Tasks";
import TaskLineChart from "../components/summary/LineChart";
import HomeCard from "../components/home/HomeCard";

async function Page() {
  const stats = await Status();
  const task = await Tasks();

  return (
    <main className="min-h-screen bg-background px-4 py-5 md:px-6 lg:px-8">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-6">
          <CreateTask title="Summary" />
        </div>

        <section className="mb-6">
          <HomeCard stats={stats} />
        </section>

        <section className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          <div className="min-w-0">
            <TaskLineChart data={task} />
          </div>

          <div className="min-w-0">
            <TopCard data={task} />
          </div>
        </section>
      </div>
    </main>
  );
}

export default Page;
