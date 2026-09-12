import CreateTask from "../components/CreateTask";
import Profile from "../components/profile/Profile";
import Profiledata from "../api/Profile";

async function Page() {
  const data = await Profiledata();

  return (
    <main className="min-h-screen bg-background px-4 py-5 md:px-6 lg:px-8">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-6">
          <CreateTask title="Profile" />
        </div>

        <section>
          <Profile data={data} />
        </section>
      </div>
    </main>
  );
}

export default Page;
