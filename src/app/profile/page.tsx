import CreateTask from "../components/CreateTask";
import Profile from "../components/profile/Profile";
import Profiledata from "../api/Profile";
async function page() {
  const data = await Profiledata();
  return (
    <div className="min-h-screen bg-background px-4 py-5 md:px-6 lg:px-8">
      <section>
        <CreateTask title="Profile" />
      </section>
      <section>
        <Profile data={data} />
      </section>
    </div>
  );
}

export default page;
