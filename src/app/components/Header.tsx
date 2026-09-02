"use client";
import Image from "next/image";
import Notif from "../img/icons8-notification-48.png";
import Boy from "../img/icons8-boy-64.png";
import dateHeader from "../hooks/useDate";
interface headerProps {
  title: string;
  showDate: boolean;
  onCreateTask: () => void;
}

function Header({ title, showDate, onCreateTask }: headerProps) {
  return (
    <div>
      <div className="p-6 pb-0 flex  justify-between items-center flex-wrap">
        <div className="md:block flex flex-col">
          <span className="font-extrabold">{title}</span>
          {showDate ? (
            <span className="text-[10px] md:pl-2 ">{dateHeader()}</span>
          ) : (
            ""
          )}
        </div>
        <div>
          <div className="flex items-center gap-5">
            <div className="flex gap-2 items-center">
              <span className="font-bold text-sm hidden md:block">
                Create Task
              </span>
              <button
                type="button"
                onClick={onCreateTask}
                className="bg-primary mt-2 md:mt-0 p-2 rounded-[100%] font-bold text-white hover:bg-primary-dark"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-plus-lg"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"
                  />
                </svg>
              </button>
            </div>
            <div>
              <div>
                <div className="flex items-center">
                  <Image
                    className="mt-2"
                    width={30}
                    height={30}
                    src={Boy}
                    alt="boy-icon"
                  />
                  <span className="pl-3 pr-3 text-sm font-bold hidden md:block">
                    Nasir jamshed
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-chevron-down hidden md:block"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div className="md:ml-20 ml-0 mt-2">
              <Image width={30} height={30} src={Notif} alt="notif-icon" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
