import CreateTask from "../components/CreateTask";
import Message from "../api/Message";
import Users from "../api/User";
import Chat from "../components/chats/Chat";

async function Page() {
  const messages = await Message();
  const users = await Users();

  return (
    <section className="min-h-screen bg-background px-4 py-5 md:px-6 lg:px-8">
      <CreateTask title="Chats" />

      <Chat messages={messages} users={users} />
    </section>
  );
}

export default Page;
