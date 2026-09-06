"use client";

import { useState } from "react";
import Swal from "sweetalert2";

type Time = {
  title: string;
  time: string;
  type: string;
  message: string;
};

interface Props {
  data: Time[];
}

function AlartsCard({ data }: Props) {
  const [showAll, setShowAll] = useState(false);

  const typeColors: Record<string, string> = {
    meeting: "fill-blue",
    success: "fill-green",
  };

  const displayed = showAll ? data : data.slice(0, 2);

  function alertMassage(message: string) {
    Swal.fire(message);
  }

  return (
    <section className="w-full rounded-2xl bg-white p-4 shadow-sm sm:p-5 lg:p-6">
      <div className="mb-4 flex items-center justify-between px-1">
        <p className="text-lg font-bold text-gray-800">Alerts</p>

        <button
          onClick={() => setShowAll(!showAll)}
          className="cursor-pointer text-sm font-medium text-text-secondary transition-colors hover:text-gray-800"
        >
          {showAll ? "Show less" : "See all"}
        </button>
      </div>

      <div className="space-y-3">
        {displayed.map((item) => (
          <div
            key={item.title}
            onClick={() => alertMassage(item.message)}
            className="flex cursor-pointer items-center gap-3 rounded-xl border border-gray-100 bg-gray-50 p-4 transition-all duration-200 hover:-translate-y-0.5 hover:bg-white hover:shadow-sm"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white shadow-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className={`bi bi-bell-fill ${typeColors[item.type]}`}
                viewBox="0 0 16 16"
              >
                <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2m.995-14.901a1 1 0 1 0-1.99 0A5 5 0 0 0 3 6c0 1.098-.5 6-2.005 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901" />
              </svg>
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-gray-800">
                {item.title}
              </p>

              <span className="text-xs text-text-secondary">{item.time}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default AlartsCard;
