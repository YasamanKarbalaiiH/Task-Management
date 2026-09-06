"use client";

import { useMemo, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface Task {
  id: string;
  title: string;
  project: string;
  status: "ongoing" | "process" | "complete" | "cancel";
  progress: number;
  dueDate: string;
  assignees: string[];
}

interface TaskChartProps {
  tasks: Task[];
}

type ViewMode = "weekly" | "monthly";

// Convert Date to YYYY-MM-DD
const getDateKey = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

// Get Monday of selected week
const getWeekStart = (date: Date) => {
  const result = new Date(date);
  const day = result.getDay();
  const difference = day === 0 ? -6 : 1 - day;

  result.setDate(result.getDate() + difference);

  return result;
};

// Format weekly X axis
const formatWeekDay = (date: Date) => {
  return date.toLocaleDateString("en-US", {
    weekday: "short",
  });
};

// Format weekly date range
const formatWeekRange = (dateString: string) => {
  const selected = new Date(`${dateString}T00:00:00`);
  const weekStart = getWeekStart(selected);
  const weekEnd = new Date(weekStart);

  weekEnd.setDate(weekStart.getDate() + 6);

  return `${weekStart.getDate()} - ${weekEnd.getDate()}`;
};

// Format monthly date
const formatMonth = (dateString: string) => {
  const date = new Date(`${dateString}T00:00:00`);

  return date.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
};

export default function TaskChart({ tasks }: TaskChartProps) {
  const [viewMode, setViewMode] = useState<ViewMode>("weekly");
  const [selectedDate, setSelectedDate] = useState("2026-09-01");

  const chartData = useMemo(() => {
    const result: {
      date: string;
      label: string;
      complete: number;
      ongoing: number;
    }[] = [];

    // =========================
    // WEEKLY
    // =========================

    if (viewMode === "weekly") {
      const selected = new Date(`${selectedDate}T00:00:00`);
      const weekStart = getWeekStart(selected);

      for (let i = 0; i < 7; i++) {
        const currentDate = new Date(weekStart);

        currentDate.setDate(weekStart.getDate() + i);

        const dateKey = getDateKey(currentDate);

        const complete = tasks.filter(
          (task) => task.dueDate === dateKey && task.status === "complete",
        ).length;

        const ongoing = tasks.filter(
          (task) => task.dueDate === dateKey && task.status === "ongoing",
        ).length;

        result.push({
          date: dateKey,
          label: formatWeekDay(currentDate),
          complete,
          ongoing,
        });
      }
    }

    // =========================
    // MONTHLY
    // =========================

    if (viewMode === "monthly") {
      const selected = new Date(`${selectedDate}T00:00:00`);
      const year = selected.getFullYear();
      const month = selected.getMonth();
      const daysInMonth = new Date(year, month + 1, 0).getDate();

      for (let day = 1; day <= daysInMonth; day++) {
        const currentDate = new Date(year, month, day);
        const dateKey = getDateKey(currentDate);

        const complete = tasks.filter(
          (task) => task.dueDate === dateKey && task.status === "complete",
        ).length;

        const ongoing = tasks.filter(
          (task) => task.dueDate === dateKey && task.status === "ongoing",
        ).length;

        result.push({
          date: dateKey,
          label: `${day}`,
          complete,
          ongoing,
        });
      }
    }

    return result;
  }, [tasks, selectedDate, viewMode]);

  return (
    <section className="mt-2 w-full rounded-2xl bg-white p-4 shadow-sm sm:p-5 lg:p-6">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        {/* Title + Date */}
        <div className="flex items-center justify-between gap-4 sm:justify-start">
          <h2 className="text-lg font-bold text-gray-800 sm:text-xl">
            Overview
          </h2>

          {/* Date Picker */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                const input = document.getElementById(
                  "date-picker",
                ) as HTMLInputElement | null;

                input?.showPicker();
              }}
              className="flex items-center gap-2 rounded-lg px-2 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-800"
            >
              <span>
                {viewMode === "weekly"
                  ? formatWeekRange(selectedDate)
                  : formatMonth(selectedDate)}
              </span>

              {/* Down Arrow */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 16 16"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"
                />
              </svg>
            </button>

            {/* Hidden Date Picker */}
            {viewMode === "weekly" ? (
              <input
                id="date-picker"
                type="date"
                value={selectedDate}
                onChange={(e) => {
                  setSelectedDate(e.target.value);
                }}
                className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
              />
            ) : (
              <input
                id="date-picker"
                type="month"
                value={selectedDate.substring(0, 7)}
                onChange={(e) => {
                  setSelectedDate(`${e.target.value}-01`);
                }}
                className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
              />
            )}
          </div>
        </div>

        {/* Weekly / Monthly */}
        <div className="flex w-fit rounded-lg bg-gray-50 p-1">
          <button
            onClick={() => setViewMode("weekly")}
            className={`rounded-md px-4 py-2 text-sm font-medium transition-all ${
              viewMode === "weekly"
                ? "bg-white text-primary shadow-sm"
                : "text-secondary hover:text-gray-800"
            }`}
          >
            Weekly
          </button>

          <button
            onClick={() => setViewMode("monthly")}
            className={`rounded-md px-4 py-2 text-sm font-medium transition-all ${
              viewMode === "monthly"
                ? "bg-white text-primary shadow-sm"
                : "text-secondary hover:text-gray-800"
            }`}
          >
            Monthly
          </button>
        </div>
      </div>

      {/* Chart */}
      <div className="h-75 w-full sm:h-85 lg:h-87.5">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{
              top: 10,
              right: 10,
              left: -10,
              bottom: 10,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />

            {/* X Axis */}
            <XAxis
              dataKey="label"
              tick={{ fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              interval={viewMode === "monthly" ? 2 : 0}
            />

            {/* Y Axis */}
            <YAxis
              allowDecimals={false}
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12 }}
            />

            <Tooltip />

            {/* Custom Legend */}
            <Legend
              align="left"
              content={() => (
                <div className="mt-3 flex flex-wrap gap-5">
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-md bg-blue" />
                    <span className="text-sm text-gray-600">Complete</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-md bg-purple" />
                    <span className="text-sm text-gray-600">Ongoing</span>
                  </div>
                </div>
              )}
            />

            {/* Complete */}
            <Bar
              dataKey="complete"
              name="Complete"
              fill="#63b9df"
              radius={[6, 6, 0, 0]}
              barSize={18}
            />

            {/* Ongoing */}
            <Bar
              dataKey="ongoing"
              name="Ongoing"
              fill="#6756d6"
              radius={[6, 6, 0, 0]}
              barSize={18}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
