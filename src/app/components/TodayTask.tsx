"use client";

import { useState } from "react";
import Image from "next/image";

interface Task {
  title: string;
  percent: number;
  dueDate: string;
  project: string;
  assignees: {
    id: number;
    name: string;
    avatar: string;
  }[];
}

interface TodayTasksProps {
  data: Task[];
}

export default function TodayTasks({ data }: TodayTasksProps) {
  const [showAll, setShowAll] = useState(false);

  const projectColors: Record<string, string> = {
    Medical: "bg-purple-bg",
    Finance: "bg-green-bg",
    Marketing: "bg-blue-bg",
    Design: "bg-red-bg",
    Development: "bg-yellow-bg",
  };

  const displayedTasks = showAll ? data : data.slice(0, 2);

  return (
    <div>
      <div className="ml-3 flex justify-between">
        <p className="font-bold">Today</p>

        <button
          onClick={() => setShowAll(!showAll)}
          className="mr-2 text-sm text-text-secondary cursor-pointer"
        >
          {showAll ? "Show less" : "See all"}
        </button>
      </div>

      <div className="flex gap-2 flex-wrap">
        {displayedTasks.map((item) => (
          <div key={item.title} className="bg-white p-5 rounded-xl">
            <div className="flex gap-5">
              <p className="font-bold">{item.title}</p>

              <span
                className={`${
                  projectColors[item.project]
                } text-text-primary text-xs rounded-2xl p-1 w-15 h-6 text-center`}
              >
                {item.percent}%
              </span>
            </div>

            <div className="-space-x-3 mt-5 flex">
              {item.assignees.map((assignee) => (
                <Image
                  key={assignee.id}
                  src={assignee.avatar}
                  alt={assignee.name}
                  width={32}
                  height={32}
                  className="rounded-full border-2 border-white"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
