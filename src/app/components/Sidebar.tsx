"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import Home from "../img/home-48.png";
import Task from "../img/icons8-task-planning-48.png";
import Chat from "../img/icons8-chat-bubble-48.png";
import Summary from "../img/icons8-summary-48.png";
import Calendar from "../img/icons8-calendar-48.png";
import Notif from "../img/icons8-notification-bell-48.png";
import Person from "../img/icons8-person-48.png";
import Logo from "../img/Logo.png";
import Alert from "../img/Alert.png";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  function clickSide() {
    setIsOpen(!isOpen);
  }

  const menuItems = [
    { name: "Home", path: "/", icon: Home },
    { name: "Task", path: "/tasks", icon: Task },
    { name: "Chat", path: "/chat", icon: Chat },
    { name: "Summary", path: "/summary", icon: Summary },
    { name: "Calendar", path: "/calendar", icon: Calendar },
    { name: "Notification", path: "/notifications", icon: Notif },
    { name: "Profile", path: "/profile", icon: Person },
  ];

  return (
    <>
      {/* Mobile menu button */}
      {!isOpen && (
        <button
          type="button"
          onClick={clickSide}
          aria-label="Open sidebar"
          className="fixed left-4 top-5 z-40 flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg bg-white shadow-sm lg:hidden"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            fill="currentColor"
            className="fill-primary"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
            />
          </svg>
        </button>
      )}

      {/* Mobile overlay */}
      {isOpen && (
        <div
          onClick={clickSide}
          className="fixed inset-0 z-40 bg-black/30 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed left-0 top-0 z-50
          flex h-screen w-56 flex-col
          overflow-y-auto
          sidebar-scroll
          rounded-r-2xl bg-white
          shadow-lg
          transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        <div className="flex min-h-full flex-col px-4 py-5 sm:px-5 lg:px-6">
          {/* Mobile close button */}
          <div className="mb-2 flex justify-end lg:hidden">
            <button
              type="button"
              onClick={clickSide}
              aria-label="Close sidebar"
              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg transition-colors hover:bg-gray-100"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                fill="currentColor"
                className="fill-primary"
                viewBox="0 0 16 16"
              >
                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
              </svg>
            </button>
          </div>

          {/* Logo */}
          <div className="mb-8 flex flex-col items-center">
            <p className="mb-1 text-lg font-bold text-gray-800">Toko</p>

            <Image
              width={50}
              height={50}
              src={Logo}
              loading="eager"
              alt="logo image"
            />
          </div>

          {/* Navigation */}
          <nav>
            <ul className="space-y-2">
              {menuItems.map((item) => {
                const isActive = pathname === item.path;

                return (
                  <li key={item.name}>
                    <Link
                      href={item.path}
                      onClick={() => setIsOpen(false)}
                      className={`
                        flex items-center gap-3 rounded-xl px-3 py-2.5
                        text-sm font-medium
                        transition-all duration-200
                        ${
                          isActive
                            ? "active-sidebar shadow-sm"
                            : "text-text-primary hover:bg-primary-light"
                        }
                      `}
                    >
                      <Image
                        width={20}
                        height={20}
                        src={item.icon}
                        alt={`${item.name}-icon`}
                        className={`
                          shrink-0
                          ${isActive ? "brightness-0 invert" : ""}
                        `}
                      />

                      <span>{item.name}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Alert card */}
          <div className="mt-auto pt-8">
            <div className="flex justify-center">
              <div className="w-full rounded-2xl bg-background p-5 text-center">
                <Image
                  width={48}
                  height={48}
                  src={Alert}
                  alt="alert-logo"
                  className="mx-auto"
                />

                <span className="mt-2 block text-sm font-bold text-primary">
                  Manage Alert
                </span>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
