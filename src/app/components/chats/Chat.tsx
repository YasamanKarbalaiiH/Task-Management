"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import type { Message } from "../../api/Message";
import type { User } from "../../api/User";

type ChatProps = {
  messages: Message[];
  users: User[];
};

type Conversation = {
  id: string;
  participants: string[];
};
export default function Chat({ messages, users }: ChatProps) {
  const currentUserId = "1";

  const [localMessages, setLocalMessages] = useState<Message[]>(messages);

  const [conversations, setConversations] = useState<Conversation[]>([]);

  const [selectedUserId, setSelectedUserId] = useState("2");

  const [search, setSearch] = useState("");

  const [messageText, setMessageText] = useState("");

  useEffect(() => {
    async function fetchConversations() {
      try {
        const res = await fetch("http://localhost:8000/conversations");

        if (!res.ok) {
          throw new Error("Failed to fetch conversations");
        }

        const data: Conversation[] = await res.json();

        setConversations(data);
      } catch (error) {
        console.error("Error fetching conversations:", error);
      }
    }

    fetchConversations();
  }, []);

  const selectedUser = users.find((user) => user.id === selectedUserId);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase()),
  );

  const selectedConversation = conversations.find(
    (conversation) =>
      conversation.participants.includes(currentUserId) &&
      conversation.participants.includes(selectedUserId),
  );

  const selectedConversationId = selectedConversation?.id;

  const selectedMessages = localMessages.filter(
    (message) =>
      message.conversationId === selectedConversationId &&
      (message.senderId === currentUserId ||
        message.senderId === selectedUserId),
  );

  const handleSend = async () => {
    const text = messageText.trim();

    if (!text || !selectedUser) {
      return;
    }

    try {
      let conversationId = selectedConversationId;

      if (!conversationId) {
        const newConversation: Conversation = {
          id: Date.now().toString(),
          participants: [currentUserId, selectedUserId],
        };

        const conversationRes = await fetch(
          "http://localhost:8000/conversations",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newConversation),
          },
        );

        if (!conversationRes.ok) {
          throw new Error("Failed to create conversation");
        }

        const savedConversation: Conversation = await conversationRes.json();

        conversationId = savedConversation.id;

        setConversations((prev) => [...prev, savedConversation]);
      }

      const newMessage: Message = {
        id: Date.now().toString(),
        conversationId: conversationId,
        senderId: currentUserId,
        text: text,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      const res = await fetch("http://localhost:8000/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newMessage),
      });

      if (!res.ok) {
        throw new Error("Failed to send message");
      }

      const savedMessage: Message = await res.json();

      setLocalMessages((prev) => [...prev, savedMessage]);

      setMessageText("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="mt-5 flex min-h-[calc(100vh-180px)] w-full flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-sm lg:flex-row">
      <aside className="flex w-full shrink-0 flex-col border-b border-border lg:w-75 lg:border-b-0 lg:border-r">
        <div className="hidden border-b border-border px-5 py-4 lg:block">
          <div className="mb-4">
            <h2 className="text-base font-semibold text-text-primary">
              Messages
            </h2>

            <p className="mt-1 text-xs text-text-secondary">
              Your recent conversations
            </p>
          </div>

          <div className="relative">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>

            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search people..."
              className="h-10 w-full rounded-xl border border-border bg-background pl-9 pr-3 text-xs text-text-primary outline-none transition placeholder:text-text-muted focus:border-primary/40 focus:bg-white focus:ring-4 focus:ring-primary-light"
            />
          </div>
        </div>

        <div className="flex items-center justify-between border-b border-border px-4 py-3 lg:hidden">
          <div>
            <h2 className="text-sm font-semibold text-text-primary">
              Messages
            </h2>

            <p className="mt-0.5 text-[10px] text-text-secondary">
              {users.length} conversations
            </p>
          </div>

          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-background text-text-secondary transition hover:bg-primary-light hover:text-primary"
          >
            <svg
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </button>
        </div>

        <div className="flex gap-2 overflow-x-auto p-3 scrollbar-none lg:flex-1 lg:flex-col lg:gap-1 lg:overflow-x-hidden lg:overflow-y-auto lg:p-3">
          {filteredUsers.map((user) => {
            const isSelected = user.id === selectedUserId;

            const lastMessage = getLastMessage(
              user.id,
              currentUserId,
              localMessages,
              conversations,
            );

            const lastMessageTime = getLastMessageTime(
              user.id,
              currentUserId,
              localMessages,
              conversations,
            );

            return (
              <button
                key={user.id}
                type="button"
                onClick={() => setSelectedUserId(user.id)}
                className={`group relative flex shrink-0 items-center gap-3 rounded-xl p-2.5 text-left transition-all duration-200 lg:w-full ${
                  isSelected ? "bg-primary-light" : "hover:bg-background"
                }`}
              >
                <div className="relative shrink-0">
                  <Image
                    width={44}
                    height={44}
                    src={user.avatar}
                    alt={user.name}
                    className="h-10 w-10 rounded-full object-cover ring-2 ring-white"
                  />

                  <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-green" />
                </div>

                <div className="hidden min-w-0 flex-1 lg:block">
                  <div className="flex items-center justify-between gap-2">
                    <p
                      className={`truncate text-sm font-semibold ${
                        isSelected ? "text-primary" : "text-text-primary"
                      }`}
                    >
                      {user.name}
                    </p>

                    <span className="shrink-0 text-[9px] text-text-muted">
                      {lastMessageTime}
                    </span>
                  </div>

                  <p className="mt-1 truncate text-xs text-text-secondary">
                    {lastMessage}
                  </p>
                </div>

                <div className="max-w-22.5 lg:hidden">
                  <p
                    className={`truncate text-[11px] font-semibold ${
                      isSelected ? "text-primary" : "text-text-primary"
                    }`}
                  >
                    {user.name}
                  </p>
                </div>

                {isSelected && (
                  <span className="absolute left-0 top-1/2 hidden h-7 w-1 -translate-y-1/2 rounded-r-full bg-primary lg:block" />
                )}
              </button>
            );
          })}
        </div>
      </aside>

      <section className="flex min-h-137.5 min-w-0 flex-1 flex-col">
        {selectedUser ? (
          <>
            <header className="flex shrink-0 items-center justify-between border-b border-border bg-white px-4 py-3 sm:px-6">
              <div className="flex min-w-0 items-center gap-3">
                <div className="relative shrink-0">
                  <Image
                    width={44}
                    height={44}
                    src={selectedUser.avatar}
                    alt={selectedUser.name}
                    className="h-10 w-10 rounded-full object-cover"
                  />

                  <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-green" />
                </div>

                <div className="min-w-0">
                  <h3 className="truncate text-sm font-semibold text-text-primary sm:text-[15px]">
                    {selectedUser.name}
                  </h3>

                  <div className="mt-0.5 flex items-center gap-1.5">
                    <span className="text-[10px] text-text-secondary sm:text-xs">
                      Active now
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-text-secondary transition hover:bg-background hover:text-primary"
                >
                  <svg
                    width="17"
                    height="17"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.62 2.63a2 2 0 0 1-.45 2.11L8 9.73a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.85.29 1.73.5 2.63.62A2 2 0 0 1 22 16.92z" />
                  </svg>
                </button>

                <button
                  type="button"
                  className="hidden h-9 w-9 items-center justify-center rounded-lg text-text-secondary transition hover:bg-background hover:text-primary sm:flex"
                >
                  <svg
                    width="17"
                    height="17"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="2" />

                    <path d="m8 16 3-3 2 2 3-4 3 4" />
                  </svg>
                </button>

                <button
                  type="button"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-text-secondary transition hover:bg-background hover:text-primary"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="12" cy="5" r="1" />
                    <circle cx="12" cy="12" r="1" />
                    <circle cx="12" cy="19" r="1" />
                  </svg>
                </button>
              </div>
            </header>

            <div className="min-h-0 flex-1 overflow-y-auto bg-background/60 px-3 py-5 sm:px-6 sm:py-6">
              <div className="mx-auto flex w-full max-w-4xl flex-col gap-5">
                {selectedMessages.length > 0 && (
                  <div className="flex items-center justify-center">
                    <span className="rounded-full bg-white px-3 py-1 text-[9px] font-medium text-text-muted shadow-sm">
                      Today
                    </span>
                  </div>
                )}

                {selectedMessages.map((message) => {
                  const isMine = message.senderId === currentUserId;

                  const sender = users.find(
                    (user) => user.id === message.senderId,
                  );

                  return (
                    <div
                      key={message.id}
                      className={`flex items-end gap-2.5 ${
                        isMine ? "justify-end" : "justify-start"
                      }`}
                    >
                      {!isMine && sender && (
                        <Image
                          width={32}
                          height={32}
                          src={sender.avatar}
                          alt={sender.name}
                          className="h-7 w-7 shrink-0 rounded-full object-cover"
                        />
                      )}

                      <div
                        className={`flex max-w-[82%] flex-col sm:max-w-[65%] ${
                          isMine ? "items-end" : "items-start"
                        }`}
                      >
                        <div
                          className={`px-3.5 py-2.5 text-xs leading-5 sm:px-4 sm:py-3 sm:text-sm ${
                            isMine
                              ? "rounded-2xl rounded-br-md bg-primary text-white shadow-sm shadow-primary/10"
                              : "rounded-2xl rounded-bl-md border border-border bg-white text-text-primary shadow-sm"
                          }`}
                        >
                          <p className="wrap-break-word">{message.text}</p>
                        </div>

                        <div
                          className={`mt-1 flex items-center gap-1.5 px-1 ${
                            isMine ? "flex-row-reverse" : ""
                          }`}
                        >
                          <span className="text-[9px] text-text-muted sm:text-[10px]">
                            {message.time}
                          </span>

                          {isMine && (
                            <svg
                              width="13"
                              height="13"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              className="text-primary"
                            >
                              <path d="m5 12 4 4L19 6" />
                              <path d="m11 12 4 4 5-6" />
                            </svg>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}

                {selectedMessages.length === 0 && (
                  <div className="flex min-h-75 flex-col items-center justify-center text-center">
                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-light text-primary">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      >
                        <path d="M21 11.5a8.4 8.4 0 0 1-9 8.5 9.4 9.4 0 0 1-4-.9L3 21l1.9-4.6A8.4 8.4 0 0 1 3 11.5 8.4 8.4 0 0 1 12 3a8.4 8.4 0 0 1 9 8.5Z" />
                      </svg>
                    </div>

                    <p className="text-sm font-medium text-text-primary">
                      No messages yet
                    </p>

                    <p className="mt-1 text-xs text-text-secondary">
                      Start the conversation with {selectedUser.name}
                    </p>
                  </div>
                )}
              </div>
            </div>

            <footer className="shrink-0 border-t border-border bg-white p-3 sm:p-4">
              <div className="mx-auto flex max-w-4xl items-end gap-2 rounded-2xl border border-border bg-background p-1.5 transition focus-within:border-primary/30 focus-within:bg-white focus-within:ring-4 focus-within:ring-primary-light">
                <button
                  type="button"
                  className="mb-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-text-secondary transition hover:bg-primary-light hover:text-primary"
                >
                  <svg
                    width="19"
                    height="19"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </button>

                <input
                  type="text"
                  value={messageText}
                  onChange={(event) => setMessageText(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" && !event.shiftKey) {
                      event.preventDefault();

                      handleSend();
                    }
                  }}
                  placeholder="Write a message..."
                  className="min-w-0 flex-1 bg-transparent px-1 py-2.5 text-xs text-text-primary outline-none placeholder:text-text-muted sm:text-sm"
                />

                <button
                  type="button"
                  onClick={handleSend}
                  disabled={!messageText.trim()}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary text-white transition hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <svg
                    width="17"
                    height="17"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="m22 2-7 20-4-9-9-4Z" />
                    <path d="M22 2 11 13" />
                  </svg>
                </button>
              </div>
            </footer>
          </>
        ) : (
          <div className="flex flex-1 items-center justify-center p-6">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-light text-primary">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path d="M21 11.5a8.4 8.4 0 0 1-9 8.5 9.4 9.4 0 0 1-4-.9L3 21l1.9-4.6A8.4 8.4 0 0 1 3 11.5 8.4 8.4 0 0 1 12 3a8.4 8.4 0 0 1 9 8.5Z" />
                </svg>
              </div>

              <h3 className="text-sm font-semibold text-text-primary">
                Select a conversation
              </h3>

              <p className="mt-1 text-xs text-text-secondary">
                Choose someone from your conversations.
              </p>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

function getLastMessage(
  userId: string,
  currentUserId: string,
  messages: Message[],
  conversations: Conversation[],
): string {
  const conversation = conversations.find(
    (item) =>
      item.participants.includes(currentUserId) &&
      item.participants.includes(userId),
  );

  if (!conversation) {
    return "No messages yet";
  }

  const conversationMessages = messages.filter(
    (message) => message.conversationId === conversation.id,
  );

  if (conversationMessages.length === 0) {
    return "No messages yet";
  }

  return conversationMessages[conversationMessages.length - 1].text;
}

function getLastMessageTime(
  userId: string,
  currentUserId: string,
  messages: Message[],
  conversations: Conversation[],
): string {
  const conversation = conversations.find(
    (item) =>
      item.participants.includes(currentUserId) &&
      item.participants.includes(userId),
  );

  if (!conversation) {
    return "";
  }

  const conversationMessages = messages.filter(
    (message) => message.conversationId === conversation.id,
  );

  if (conversationMessages.length === 0) {
    return "";
  }

  return conversationMessages[conversationMessages.length - 1].time;
}
