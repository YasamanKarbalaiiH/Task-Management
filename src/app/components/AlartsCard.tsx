"use client";

import { useState } from "react";
type Time = {
  title: string;
  time: string;
  type: string;
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
  console.log(displayed);
  return (
    <div className="mt-7 bg-white p-5 rounded-xl">
      <div className="ml-3 flex justify-between">
        <p className="font-bold">Alarts</p>
        <button
          onClick={() => setShowAll(!showAll)}
          className="mr-2 text-sm text-text-secondary cursor-pointer"
        >
          {showAll ? "Show less" : "See all"}
        </button>
      </div>
      <div>
        {displayed.map((item) => (
          <div
            key={item.title}
            className="bg-white rounded-xl p-5 shadow-xl mb-2 flex justify-between gap-3"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className={`bi bi-bell-fill ${typeColors[item.type]}`}
              viewBox="0 0 16 16"
            >
              <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2m.995-14.901a1 1 0 1 0-1.99 0A5 5 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901" />
            </svg>
            <p className="font-bold text-sm ">{item.title}</p>
            <span className="text-sm">{item.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AlartsCard;
