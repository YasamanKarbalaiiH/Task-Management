import CreateTask from "../components/CreateTask";
import Alart from "../api/Alart";
import Notif from "../components/notif/Notif";
async function page() {
  const notifs = await Alart();
  return (
    <div className="min-h-screen bg-background px-4 py-5 md:px-6 lg:px-8">
      <section>
        <CreateTask title="Notifications" />
      </section>
      <section className=" mb-6">
        <Notif data={notifs} />
      </section>
    </div>
  );
}

export default page;
