import Chat from "../components/chats/Chat";
import CreateTask from "../components/CreateTask";

async function Page() {
  const message = await 
  return (
    <main className="min-h-screen bg-background px-4 py-5 md:px-6 lg:px-8">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-6">
          <CreateTask title="Chats" />
        </div>

        <section>
          <Chat messages={messages} users={users} />
        </section>
      </div>
    </main>
  );
}

export default Page;
