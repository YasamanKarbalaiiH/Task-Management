import CreateTask from "../components/CreateTask";
import Alart from "../api/Alart";
async function page() {
  const notifs = await Alart();
  return (
    <div>
      <section>
        <CreateTask title="Notifications" />
      </section>
    </div>
  );
}

export default page;
