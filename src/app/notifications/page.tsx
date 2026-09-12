import CreateTask from "../components/CreateTask";
import Alart from "../api/Alart";
import Notif from "../components/notif/Notif";

async function Page() {
  const notifs = await Alart();

  return (
    <main className="min-h-screen bg-background px-4 py-5 md:px-6 lg:px-8">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-6">
          <CreateTask title="Notifications" />
        </div>

        <section className="mb-6">
          <Notif data={notifs} />
        </section>
      </div>
    </main>
  );
}

export default Page;
