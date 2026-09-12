import CreateTask from "../components/CreateTask";
import Alart from "../api/Alart";
import Notif from "../components/notif/Notif";
async function page() {
  const notifs = await Alart();
  return (
    <div>
      <section>
        <CreateTask title="Notifications" />
      </section>
      <section>
        <Notif data={notifs} />
      </section>
    </div>
  );
}

export default page;
