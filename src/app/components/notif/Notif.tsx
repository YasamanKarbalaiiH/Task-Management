"use client";

import Swal from "sweetalert2";

type Data = {
  title: string;
  time: string;
  type: string;
  message: string;
  read: boolean;
};

type DataProps = {
  data: Data[];
};

function alertMessage(message: string) {
  Swal.fire({
    text: message,
    confirmButtonText: "OK",
    confirmButtonColor: "#6756d6",
  });
}

function Notif({ data }: DataProps) {
  return (
    <div className="w-full">
      <div className="flex flex-col gap-4">
        {data.map((item, index) => (
          <div
            key={`${item.title}-${item.time}-${index}`}
            onClick={() => alertMessage(item.message)}
            className={`group flex cursor-pointer items-start gap-4 rounded-2xl border p-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg sm:p-5 ${
              item.read
                ? "border-border bg-white"
                : "border-primary/20 bg-primary-light/30"
            }`}
          >
            <div
              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                item.read ? "bg-green/15" : "bg-red/15"
              }`}
            >
              {item.read ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 128 128"
                  className="fill-green"
                >
                  <path d="M64 1C29.3 1 1 29.3 1 64s28.3 63 63 63 63-28.3 63-63S98.7 1 64 1zm0 6c31.4 0 57 25.6 57 57s-25.6 57-57 57S7 95.4 7 64 32.6 7 64 7zm29.8 31c-.8.1-1.5.4-2.1 1L63.8 71.6 51.1 58.9c-1.2-1.2-3.1-1.2-4.2 0-1.2 1.2-1.2 3.1 0 4.2l15 15c.6.6 1.3.9 2.1.9h.1c.8 0 1.6-.4 2.2-1l30-35c1.1-1.3.9-3.2-.3-4.2-.7-.6-1.5-.9-2.3-.8z" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 48 48"
                  className="fill-red"
                >
                  <path d="M24 2C11.85 2 2 11.85 2 24s9.85 22 22 22 22-9.85 22-22S36.15 2 24 2zm0 4c9.94 0 18 8.06 18 18s-8.06 18-18 18S6 33.94 6 24 14.06 6 24 6zm-7.29 9.29L24 22.59l7.29-7.3 1.42 1.42L25.41 24l7.3 7.29-1.42 1.42L24 25.41l-7.29 7.3-1.42-1.42 7.3-7.29-7.3-7.29 1.42-1.42z" />
                </svg>
              )}
            </div>

            <div className="min-w-0 flex-1">
              <div className="mb-1 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                <p
                  className={`truncate text-sm font-semibold sm:text-base ${
                    item.read ? "text-text" : "text-primary"
                  }`}
                >
                  {item.title}
                </p>

                <span className="shrink-0 text-xs text-text-muted sm:text-sm">
                  {item.time}
                </span>
              </div>

              <p className="line-clamp-2 text-sm leading-6 text-text-muted">
                {item.message}
              </p>
            </div>

            {!item.read && (
              <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-primary" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Notif;
