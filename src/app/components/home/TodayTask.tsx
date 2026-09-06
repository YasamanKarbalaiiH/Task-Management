"use client";

import { useState } from "react";
import Image from "next/image";

interface Task {
  title: string;
  percent: number;
  dueDate: string;
  project: string;
  assignees: {
    id: string;
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
    <section className="mt-2">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between px-1">
        <p className="text-lg font-bold text-gray-800">Today</p>

        <button
          onClick={() => setShowAll(!showAll)}
          className="cursor-pointer text-sm font-medium text-text-secondary transition-colors hover:text-gray-800"
        >
          {showAll ? "Show less" : "See all"}
        </button>
      </div>

      {/* Tasks */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {displayedTasks.map((item) => (
          <div
            key={item.title}
            className="rounded-2xl bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
          >
            {/* Task title + percentage */}
            <div className="flex items-start justify-between gap-3">
              <p className="min-w-0 text-sm font-semibold text-gray-800">
                {item.title}
              </p>

              <span
                className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium text-text-primary ${
                  projectColors[item.project]
                }`}
              >
                {item.percent}%
              </span>
            </div>

            {/* Assignees */}
            <div className="mt-5 flex -space-x-3">
              {item.assignees.map((assignee) => (
                <Image
                  key={assignee.id}
                  src={assignee.avatar}
                  alt={assignee.name}
                  width={32}
                  height={32}
                  className="rounded-full border-2 border-white object-cover"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
