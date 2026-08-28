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

function Sidebar() {
  const pathname = usePathname();

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
    <aside className="bg-white rounded-r-2xl flex flex-col min-h-screen">
      <div className="flex-1 p-8">
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
  );
}

export default Sidebar;
