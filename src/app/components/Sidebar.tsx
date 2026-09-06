"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Home from "../img/home-48.png";
import Task from "../img/icons8-task-planning-48.png";
import Chat from "../img/icons8-chat-bubble-48.png";
import Summary from "../img/icons8-summary-48.png";
import Calendar from "../img/icons8-calendar-48.png";
import Notif from "../img/icons8-notification-bell-48.png";
import Person from "../img/icons8-person-48.png";
import Logo from "../img/Logo.png";
import Alert from "../img/Alert.png";
import { useState } from "react";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  function clickSide() {
    setIsOpen(!isOpen);
  }

  const pathname = usePathname();

  const menuItems = [
    { name: "Home", path: "/", icon: Home },
    { name: "Task", path: "/tasks", icon: Task },
    { name: "Chat", path: "/chats", icon: Chat },
    { name: "Summary", path: "/summary", icon: Summary },
    { name: "Calendar", path: "/calendar", icon: Calendar },
    { name: "Notification", path: "/notifications", icon: Notif },
    { name: "Profile", path: "/profile", icon: Person },
  ];
  return (
    <>
      {!isOpen && (
        <svg
          onClick={clickSide}
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          fill="currentColor"
          className="z-100 ml-5 mt-7 lg:hidden fill-primary cursor-pointer"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
          />
        </svg>
      )}
      <aside
        className={`
    fixed left-0 top-0 z-50
    flex h-screen w-56 flex-col
    overflow-y-auto
    sidebar-scroll
    bg-white rounded-r-2xl
    shadow-lg
    transition-transform duration-300
    ${isOpen ? "translate-x-0" : "-translate-x-full"}
    lg:translate-x-0
  `}
      >
        <div className="flex-1 p-4 md:p-7 ">
          <div className="flex justify-end mb-2">
            <svg
              onClick={clickSide}
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className=" bi bi-x-lg lg:hidden fill-primary"
              viewBox="0 0 16 16"
            >
              <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
            </svg>
          </div>
          <div className="mb-8 flex flex-col items-center">
            <p className="font-bold">Toko</p>

            <Image
              width={50}
              height={50}
              src={Logo}
              loading="eager"
              alt="logo image"
            />
          </div>
          <div>
            <ul>
              {menuItems.map((item) => {
                const isActive = pathname === item.path;
                return (
                  <li key={item.name} className="mb-6">
                    <Link href={item.path} className="block">
                      <div
                        className={`flex gap-2 items-center p-1 rounded-lg transition-all  duration-300 ease-in-out ${
                          isActive
                            ? "active-sidebar"
                            : "text-text-primary hover:bg-primary-light"
                        }`}
                      >
                        <Image
                          width={20}
                          height={20}
                          src={item.icon}
                          alt={`${item.name}-icon`}
                          className={isActive ? "brightness-0 invert" : ""}
                        />
                        <span>{item.name}</span>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className="mt-auto">
          <div className="flex flex-col items-center ">
            <div className="bg-background p-5 rounded-xl flex flex-col items-center">
              <Image width={50} height={50} src={Alert} alt="alert-logo" />
              <span className="font-bold text-primary">Manage Alert</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
