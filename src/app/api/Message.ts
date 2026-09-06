export type Message = {
  id: string;
  conversationId: string;
  senderId: string;
  text: string;
  time: string;
};

async function Message(): Promise<Message[]> {
  const res = await fetch("http://localhost:8000/messages");

  if (!res.ok) {
    throw new Error("Failed to fetch messages");
  }

  const data: Message[] = await res.json();

  return data;
}

export default Message;
