"use client";

import { useState } from "react";
import { DayPicker, type DayButtonProps } from "react-day-picker";
import {
  addDays,
  addMonths,
  addWeeks,
  format,
  isSameDay,
  startOfWeek,
  subDays,
  subMonths,
  subWeeks,
} from "date-fns";
import "react-day-picker/style.css";

import type { CalendarEvent } from "../../api/Events";

interface Task {
  id: string;
  title: string;
  percent: number;
  status: "ongoing" | "process" | "complete" | "cancel";
  dueDate: string;
  project: string;
  assignees: {
    id: string;
    name: string;
    avatar: string;
  }[];
}

interface CalendarProps {
  tasks: Task[];
  events: CalendarEvent[];
}

type ViewMode = "month" | "week" | "day";

const statusStyle = {
  ongoing: {
    bg: "bg-green/10",
    text: "text-green",
    dot: "bg-green",
  },
  process: {
    bg: "bg-yellow/15",
    text: "text-[#c3912c]",
    dot: "bg-yellow",
  },
  complete: {
    bg: "bg-blue/15",
    text: "text-[#3498c4]",
    dot: "bg-blue",
  },
  cancel: {
    bg: "bg-red/15",
    text: "text-[#d65378]",
    dot: "bg-red",
  },
};

export default function Calendar({ tasks, events }: CalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 8, 1));

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  const [viewMode, setViewMode] = useState<ViewMode>("month");

  const [showCreateEvent, setShowCreateEvent] = useState(false);

  const [eventTitle, setEventTitle] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [eventType, setEventType] = useState("");

  const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>(events);

  // -----------------------------
  // Events of selected day
  // -----------------------------

  const getEvents = (date: Date) => {
    return calendarEvents.filter((event) =>
      isSameDay(new Date(`${event.date}T00:00:00`), date),
    );
  };

  // -----------------------------
  // Tasks of selected day
  // -----------------------------

  const getTasks = (date: Date) => {
    return tasks.filter((task) =>
      isSameDay(new Date(`${task.dueDate}T00:00:00`), date),
    );
  };

  // -----------------------------
  // Navigation
  // -----------------------------

  const previous = () => {
    if (viewMode === "month") {
      setCurrentMonth(subMonths(currentMonth, 1));
    } else if (viewMode === "week") {
      setCurrentMonth(subWeeks(currentMonth, 1));
    } else {
      setCurrentMonth(subDays(currentMonth, 1));
    }
  };

  const next = () => {
    if (viewMode === "month") {
      setCurrentMonth(addMonths(currentMonth, 1));
    } else if (viewMode === "week") {
      setCurrentMonth(addWeeks(currentMonth, 1));
    } else {
      setCurrentMonth(addDays(currentMonth, 1));
    }
  };

  const today = () => {
    setCurrentMonth(new Date());
  };

  // -----------------------------
  // Create Event
  // -----------------------------

  const createEvent = async () => {
    if (!eventTitle.trim() || !eventDate || !eventTime) {
      return;
    }

    const newEvent: CalendarEvent = {
      id: Date.now().toString(),
      title: eventTitle,
      date: eventDate,
      time: eventTime,
      type: eventType,
    };

    try {
      const response = await fetch("http://localhost:8000/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newEvent),
      });

      if (!response.ok) {
        throw new Error("Failed to create event");
      }

      const savedEvent: CalendarEvent = await response.json();

      setCalendarEvents((prev) => [...prev, savedEvent]);

      setEventTitle("");
      setEventDate("");
      setEventTime("");
      setEventType("");
      setShowCreateEvent(false);
    } catch (error) {
      console.error(error);
    }
  };

  // -----------------------------
  // Custom Day Button
  // -----------------------------

  function CustomDayButton(props: DayButtonProps) {
    const { day, modifiers, ...buttonProps } = props;

    const date = day.date;

    const dayEvents = getEvents(date);
    const dayTasks = getTasks(date);

    return (
      <button
        {...buttonProps}
        type="button"
        className="relative flex h-full min-h-30 w-full flex-col items-stretch p-2 text-left"
      >
        {/* Date number */}
        <div className="flex justify-end">
          <span
            className={`
              flex h-7 w-7 items-center
              justify-center rounded-full
              text-xs font-medium

              ${
                modifiers.selected
                  ? "bg-[#6756d6] text-white"
                  : modifiers.today
                    ? "font-bold text-[#6756d6]"
                    : "text-gray-700"
              }
            `}
          >
            {format(date, "d")}
          </span>
        </div>

        {/* Events */}
        <div className="mt-1 space-y-1">
          {dayEvents.map((event) => (
            <div
              key={`event-${event.id}`}
              className="rounded-md bg-[#6756d6]/10 px-2 py-1"
            >
              <div className="flex items-center gap-1">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#6756d6]" />

                <span className="truncate text-[10px] font-medium text-[#6756d6]">
                  {event.title}
                </span>
              </div>

              <p className="pl-2.5 text-[9px] text-gray-400">{event.time}</p>
            </div>
          ))}

          {/* Tasks */}
          {dayTasks.map((task) => {
            const style = statusStyle[task.status];

            return (
              <div
                key={`task-${task.id}`}
                className={`rounded-md ${style.bg} px-2 py-1`}
              >
                <div className="flex items-center gap-1">
                  <span
                    className={`h-1.5 w-1.5 shrink-0 rounded-full ${style.dot}`}
                  />

                  <span
                    className={`truncate text-[10px] font-medium ${style.text}`}
                  >
                    {task.title}
                  </span>
                </div>

                <p className={`pl-2.5 text-[9px] ${style.text}`}>Due date</p>
              </div>
            );
          })}
        </div>
      </button>
    );
  }

  // -----------------------------
  // Header title
  // -----------------------------

  const getTitle = () => {
    if (viewMode === "month") {
      return format(currentMonth, "MMMM yyyy");
    }

    if (viewMode === "day") {
      return format(currentMonth, "EEEE, dd MMMM yyyy");
    }

    const start = startOfWeek(currentMonth, { weekStartsOn: 0 });

    const end = addDays(start, 6);

    return `${format(start, "dd MMM")} - ${format(end, "dd MMM yyyy")}`;
  };

  // -----------------------------
  // Week View
  // -----------------------------

  const renderWeekView = () => {
    const weekStart = startOfWeek(currentMonth, { weekStartsOn: 0 });

    const days = Array.from({ length: 7 }, (_, index) =>
      addDays(weekStart, index),
    );

    return (
      <div className="grid grid-cols-7 overflow-hidden rounded-xl border border-gray-100">
        {days.map((day) => (
          <div
            key={day.toISOString()}
            className="min-h-87.5 border-r border-gray-100 last:border-r-0"
          >
            {/* Day header */}
            <div className="border-b border-gray-100 bg-gray-50/60 p-3 text-center">
              <p className="text-[10px] text-gray-400">{format(day, "EEE")}</p>

              <p className="mt-1 text-sm font-semibold text-gray-700">
                {format(day, "dd")}
              </p>
            </div>

            {/* Content */}
            <div className="space-y-2 p-2">
              {getEvents(day).map((event) => (
                <div
                  key={`event-${event.id}`}
                  className="rounded-md bg-[#6756d6]/10 p-2"
                >
                  <p className="text-[10px] font-medium text-[#6756d6]">
                    {event.title}
                  </p>

                  <p className="mt-1 text-[9px] text-gray-400">{event.time}</p>
                </div>
              ))}

              {getTasks(day).map((task) => {
                const style = statusStyle[task.status];

                return (
                  <div
                    key={`task-${task.id}`}
                    className={`rounded-md ${style.bg} p-2`}
                  >
                    <p className={`text-[10px] font-medium ${style.text}`}>
                      {task.title}
                    </p>

                    <p className={`mt-1 text-[9px] ${style.text}`}>Due date</p>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    );
  };

  // -----------------------------
  // Day View
  // -----------------------------

  const renderDayView = () => {
    return (
      <div className="rounded-xl border border-gray-100">
        <div className="border-b border-gray-100 bg-gray-50/60 p-5">
          <p className="text-xs text-gray-400">
            {format(currentMonth, "EEEE")}
          </p>

          <p className="mt-1 text-lg font-semibold text-gray-800">
            {format(currentMonth, "dd MMMM yyyy")}
          </p>
        </div>

        <div className="min-h-87.5 p-5">
          <div className="max-w-md space-y-2">
            {getEvents(currentMonth).map((event) => (
              <div
                key={`event-${event.id}`}
                className="rounded-lg bg-[#6756d6]/10 p-4"
              >
                <p className="text-sm font-medium text-[#6756d6]">
                  {event.title}
                </p>

                <p className="mt-1 text-xs text-gray-400">{event.time}</p>
              </div>
            ))}

            {getTasks(currentMonth).map((task) => {
              const style = statusStyle[task.status];

              return (
                <div
                  key={`task-${task.id}`}
                  className={`rounded-lg ${style.bg} p-4`}
                >
                  <p className={`text-sm font-medium ${style.text}`}>
                    {task.title}
                  </p>

                  <p className={`mt-1 text-xs ${style.text}`}>
                    {task.project} · Due date
                  </p>
                </div>
              );
            })}

            {getEvents(currentMonth).length === 0 &&
              getTasks(currentMonth).length === 0 && (
                <p className="text-xs text-gray-400">
                  No events or tasks for this day.
                </p>
              )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="relative w-full rounded-2xl bg-white p-5 shadow-xl">
      {/* =====================================
          HEADER
      ===================================== */}

      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        {/* Title */}
        <div>
          <h1 className="text-xl font-semibold text-gray-800">Calendar</h1>

          <p className="mt-1 text-xs text-gray-400">
            Manage your tasks and events
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* View switch */}
          <div className="flex rounded-lg bg-gray-100 p-1">
            {(["month", "week", "day"] as ViewMode[]).map((mode) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`
                  rounded-md px-4 py-2
                  text-xs capitalize
                  transition

                  ${
                    viewMode === mode
                      ? "bg-white font-medium text-[#6756d6] shadow-sm"
                      : "text-gray-500 hover:text-gray-800"
                  }
                `}
              >
                {mode}
              </button>
            ))}
          </div>

          {/* Create */}
          <button
            onClick={() => setShowCreateEvent(true)}
            className="rounded-lg bg-[#6756d6] px-4 py-2.5 text-xs font-medium text-white transition hover:bg-[#5847c5]"
          >
            + Create Event
          </button>
        </div>
      </div>

      {/* =====================================
          NAVIGATION
      ===================================== */}

      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={previous}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-100 text-gray-500 hover:bg-gray-50"
          >
            ‹
          </button>

          <button
            onClick={next}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-100 text-gray-500 hover:bg-gray-50"
          >
            ›
          </button>
        </div>

        <h2 className="text-sm font-semibold text-gray-800">{getTitle()}</h2>

        <button
          onClick={today}
          className="rounded-lg border border-gray-200 px-4 py-2 text-xs font-medium text-gray-600 hover:bg-gray-50"
        >
          Today
        </button>
      </div>

      {/* =====================================
          MONTH
      ===================================== */}

      {viewMode === "month" && (
        <div className="calendar-wrapper overflow-hidden rounded-xl border border-gray-100">
          <DayPicker
            mode="single"
            month={currentMonth}
            onMonthChange={setCurrentMonth}
            selected={selectedDate}
            onSelect={setSelectedDate}
            showOutsideDays
            fixedWeeks
            hideNavigation
            components={{
              DayButton: CustomDayButton,
            }}
            classNames={{
              months: "w-full",
              month: "w-full",

              month_caption: "hidden",

              month_grid: "w-full border-collapse",

              weekdays: "grid grid-cols-7 bg-gray-50/60",

              weekday: "py-3 text-center text-[11px] font-medium text-gray-400",

              week: "grid grid-cols-7",

              day: `
                relative
                border-b
                border-r
                border-gray-100
                p-0
                last:border-r-0
              `,

              day_button: "w-full",

              outside: "bg-gray-50/40",

              today: "",

              selected: "bg-[#6756d6]/5",
            }}
          />
        </div>
      )}

      {/* =====================================
          WEEK
      ===================================== */}

      {viewMode === "week" && renderWeekView()}

      {/* =====================================
          DAY
      ===================================== */}

      {viewMode === "day" && renderDayView()}

      {/* =====================================
          LEGEND
      ===================================== */}

      <div className="mt-5 flex flex-wrap gap-5">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-purple" />
          <span className="text-[10px] text-gray-500">Meeting</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-green" />
          <span className="text-[10px] text-gray-500">Ongoing</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-yellow" />
          <span className="text-[10px] text-gray-500">Process</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-blue" />
          <span className="text-[10px] text-gray-500">Complete</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-red" />
          <span className="text-[10px] text-gray-500">Cancel</span>
        </div>
      </div>

      {/* =====================================
          CREATE EVENT MODAL
      ===================================== */}

      {showCreateEvent && (
        <div className="absolute inset-0 z-50 flex items-center justify-center rounded-2xl bg-black/20 backdrop-blur-sm">
          <div className="w-[90%] max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-5 flex items-start justify-between">
              <div>
                <h3 className="text-base font-semibold text-gray-800">
                  Create Event
                </h3>

                <p className="mt-1 text-xs text-gray-400">
                  Add a new task to your calendar
                </p>
              </div>

              <button
                onClick={() => setShowCreateEvent(false)}
                className="flex h-7 w-7 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100"
              >
                ×
              </button>
            </div>

            {/* Title */}
            <div className="mb-4">
              <label className="mb-2 block text-xs font-medium text-gray-600">
                Title
              </label>

              <input
                value={eventTitle}
                onChange={(e) => setEventTitle(e.target.value)}
                type="text"
                placeholder="Event title"
                className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-xs outline-none focus:border-[#6756d6]"
              />
            </div>

            {/* Date */}
            <div className="mb-4">
              <label className="mb-2 block text-xs font-medium text-gray-600">
                Date
              </label>

              <input
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                type="date"
                className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-xs text-gray-600 outline-none focus:border-[#6756d6]"
              />
            </div>

            {/* Time */}
            <div className="mb-5">
              <label className="mb-2 block text-xs font-medium text-gray-600">
                Time
              </label>

              <input
                value={eventTime}
                onChange={(e) => setEventTime(e.target.value)}
                type="time"
                className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-xs text-gray-600 outline-none focus:border-[#6756d6]"
              />
            </div>
            {/* Type*/}
            <div className="mb-5">
              <label className="mb-2 block text-xs font-medium text-gray-600">
                Event Type
              </label>

              <input
                value={eventType}
                onChange={(e) => setEventType(e.target.value)}
                type="text"
                className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-xs text-gray-600 outline-none focus:border-[#6756d6]"
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowCreateEvent(false)}
                className="rounded-lg border border-gray-200 px-4 py-2.5 text-xs text-gray-500 hover:bg-gray-50"
              >
                Cancel
              </button>

              <button
                onClick={createEvent}
                disabled={!eventTitle.trim() || !eventDate || !eventTime}
                className="rounded-lg bg-purple px-5 py-2.5 text-xs font-medium text-white hover:bg-[#5847c5] disabled:cursor-not-allowed disabled:opacity-50"
              >
                Create Event
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
