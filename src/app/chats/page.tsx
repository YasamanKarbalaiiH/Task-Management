import CreateTask from "../components/CreateTask";
import Message from "../api/Message";
import Users from "../api/User";
import Chat from "../components/chats/Chat";

async function Page() {
  const messages = await Message();
  const users = await Users();

  return (
    <section>
      <CreateTask title="Chats" />

      <Chat messages={messages} users={users} />
    </section>
  );
}

export default Page;
