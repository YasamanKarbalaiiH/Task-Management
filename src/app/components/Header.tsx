"use client";

import Image from "next/image";

import Notif from "../img/icons8-notification-48.png";
import Boy from "../img/icons8-boy-64.png";

import dateHeader from "../hooks/useDate";

interface HeaderProps {
  title: string;
  showDate: boolean;
  onCreateTask: () => void;
}

function Header({ title, showDate, onCreateTask }: HeaderProps) {
  return (
    <header className="px-4 pb-5 pt-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between gap-4">
        {/* Left side */}
        <div className="min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
            <span className="truncate text-xl font-extrabold text-gray-900">
              {title}
            </span>

            {showDate && (
              <span className="text-xs text-text-secondary">
                {dateHeader()}
              </span>
            )}
          </div>
        </div>

        {/* Right side */}
        <div className="flex shrink-0 items-center gap-3 sm:gap-5">
          {/* Create Task */}
          <div className="flex items-center gap-2">
            <span className="hidden text-sm font-semibold text-gray-700 md:block">
              Create Task
            </span>

            <button
              type="button"
              onClick={onCreateTask}
              aria-label="Create task"
              className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-primary text-white transition-all duration-200 hover:bg-primary-dark hover:shadow-md"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"
                />
              </svg>
            </button>
          </div>

          {/* User */}
          <div className="flex items-center">
            <Image
              width={32}
              height={32}
              src={Boy}
              alt="boy-icon"
              className="rounded-full object-cover"
            />

            <span className="hidden px-3 text-sm font-bold text-gray-800 lg:block">
              Nasir jamshed
            </span>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              fill="currentColor"
              className="hidden text-gray-500 lg:block"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"
              />
            </svg>
          </div>

          {/* Notification */}
          <button
            type="button"
            aria-label="Notifications"
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full transition-colors hover:bg-gray-100"
          >
            <Image width={24} height={24} src={Notif} alt="notification" />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
