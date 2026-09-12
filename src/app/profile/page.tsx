import CreateTask from "../components/CreateTask";

async function page() {
  return (
    <div className="min-h-screen bg-background px-4 py-5 md:px-6 lg:px-8">
      <section>
        <CreateTask title="Profile" />
      </section>
    </div>
  );
}

export default page;
