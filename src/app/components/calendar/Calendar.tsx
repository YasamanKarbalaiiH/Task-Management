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
        className="relative flex h-full min-h-25 w-full flex-col items-stretch p-1.5 text-left sm:min-h-30 sm:p-2"
      >
        {/* Date number */}
        <div className="flex justify-end">
          <span
            className={`
              flex h-7 w-7 items-center justify-center
              rounded-full text-xs font-semibold
              ${
                modifiers.selected
                  ? "bg-primary text-white"
                  : modifiers.today
                    ? "font-bold text-primary"
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
              className="rounded-lg bg-primary/10 px-2 py-1.5"
            >
              <div className="flex items-center gap-1">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />

                <span className="truncate text-[10px] font-semibold text-primary">
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
                className={`rounded-lg ${style.bg} px-2 py-1.5`}
              >
                <div className="flex items-center gap-1">
                  <span
                    className={`h-1.5 w-1.5 shrink-0 rounded-full ${style.dot}`}
                  />

                  <span
                    className={`truncate text-[10px] font-semibold ${style.text}`}
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

    const start = startOfWeek(currentMonth, {
      weekStartsOn: 0,
    });

    const end = addDays(start, 6);

    return `${format(start, "dd MMM")} - ${format(end, "dd MMM yyyy")}`;
  };

  // -----------------------------
  // Week View
  // -----------------------------

  const renderWeekView = () => {
    const weekStart = startOfWeek(currentMonth, {
      weekStartsOn: 0,
    });

    const days = Array.from({ length: 7 }, (_, index) =>
      addDays(weekStart, index),
    );

    return (
      <div className="overflow-x-auto">
        <div className="grid min-w-175 grid-cols-7 overflow-hidden rounded-2xl border border-border">
          {days.map((day) => (
            <div
              key={day.toISOString()}
              className="min-h-87.5 border-r border-border last:border-r-0"
            >
              {/* Day header */}
              <div className="border-b border-border bg-gray-50/60 p-3 text-center">
                <p className="text-[10px] text-gray-400">
                  {format(day, "EEE")}
                </p>

                <p className="mt-1 text-sm font-semibold text-gray-700">
                  {format(day, "dd")}
                </p>
              </div>

              {/* Content */}
              <div className="space-y-2 p-2">
                {getEvents(day).map((event) => (
                  <div
                    key={`event-${event.id}`}
                    className="rounded-lg bg-primary/10 p-2"
                  >
                    <p className="truncate text-[10px] font-semibold text-primary">
                      {event.title}
                    </p>

                    <p className="mt-1 text-[9px] text-gray-400">
                      {event.time}
                    </p>
                  </div>
                ))}

                {getTasks(day).map((task) => {
                  const style = statusStyle[task.status];

                  return (
                    <div
                      key={`task-${task.id}`}
                      className={`rounded-lg ${style.bg} p-2`}
                    >
                      <p
                        className={`truncate text-[10px] font-semibold ${style.text}`}
                      >
                        {task.title}
                      </p>

                      <p className={`mt-1 text-[9px] ${style.text}`}>
                        Due date
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // -----------------------------
  // Day View
  // -----------------------------

  const renderDayView = () => {
    return (
      <div className="rounded-2xl border border-border">
        {/* Day header */}
        <div className="border-b border-border bg-gray-50/60 p-4 sm:p-5">
          <p className="text-xs text-gray-400">
            {format(currentMonth, "EEEE")}
          </p>

          <p className="mt-1 text-base font-bold text-gray-800 sm:text-lg">
            {format(currentMonth, "dd MMMM yyyy")}
          </p>
        </div>

        {/* Day content */}
        <div className="min-h-87.5 p-4 sm:p-5">
          <div className="w-full max-w-md space-y-2">
            {getEvents(currentMonth).map((event) => (
              <div
                key={`event-${event.id}`}
                className="rounded-xl bg-primary/10 p-4"
              >
                <p className="text-sm font-semibold text-primary">
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
                  className={`rounded-xl ${style.bg} p-4`}
                >
                  <p className={`text-sm font-semibold ${style.text}`}>
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
                <div className="rounded-xl border border-dashed border-border p-8 text-center">
                  <p className="text-sm text-gray-400">
                    No events or tasks for this day.
                  </p>
                </div>
              )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="relative w-full rounded-2xl bg-white p-4 shadow-sm sm:p-5 lg:p-6">
      {/* =====================================
          HEADER
      ===================================== */}

      <div className="mb-6 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        {/* Title */}
        <div>
          <h1 className="text-lg font-bold text-gray-800 sm:text-xl">
            Calendar
          </h1>

          <p className="mt-1 text-xs text-gray-400">
            Manage your tasks and events
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          {/* View switch */}
          <div className="flex w-full rounded-xl bg-gray-100 p-1 sm:w-fit">
            {(["month", "week", "day"] as ViewMode[]).map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => setViewMode(mode)}
                className={`
                    flex-1 rounded-lg px-3 py-2
                    text-xs capitalize transition-all duration-200
                    sm:flex-none sm:px-4
                    ${
                      viewMode === mode
                        ? "bg-white font-semibold text-primary shadow-sm"
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
            type="button"
            onClick={() => setShowCreateEvent(true)}
            className="w-full rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-primary-dark hover:shadow-md sm:w-auto"
          >
            + Create Event
          </button>
        </div>
      </div>

      {/* =====================================
          NAVIGATION
      ===================================== */}

      <div className="mb-5 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={previous}
            aria-label="Previous"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-border text-lg text-gray-500 transition-colors hover:bg-gray-50 hover:text-gray-800"
          >
            ‹
          </button>

          <button
            type="button"
            onClick={next}
            aria-label="Next"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-border text-lg text-gray-500 transition-colors hover:bg-gray-50 hover:text-gray-800"
          >
            ›
          </button>
        </div>

        <h2 className="min-w-0 truncate text-center text-xs font-semibold text-gray-800 sm:text-sm">
          {getTitle()}
        </h2>

        <button
          type="button"
          onClick={today}
          className="shrink-0 rounded-xl border border-border px-3 py-2 text-xs font-semibold text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-800 sm:px-4"
        >
          Today
        </button>
      </div>

      {/* =====================================
          MONTH
      ===================================== */}

      {viewMode === "month" && (
        <div className="calendar-wrapper overflow-x-auto overflow-y-hidden rounded-2xl border border-border">
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
              months: "w-full min-w-[700px]",
              month: "w-full",

              month_caption: "hidden",

              month_grid: "w-full border-collapse",

              weekdays: "grid grid-cols-7 bg-gray-50/60",

              weekday:
                "py-3 text-center text-[11px] font-semibold text-gray-400",

              week: "grid grid-cols-7",

              day: `
                relative
                border-b
                border-r
                border-border
                p-0
                last:border-r-0
              `,

              day_button: "w-full",

              outside: "bg-gray-50/40",

              today: "",

              selected: "bg-primary/5",
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

      <div className="mt-5 flex flex-wrap gap-x-5 gap-y-3">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-purple" />
          <span className="text-xs text-gray-500">Meeting</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-green" />
          <span className="text-xs text-gray-500">Ongoing</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-yellow" />
          <span className="text-xs text-gray-500">Process</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-blue" />
          <span className="text-xs text-gray-500">Complete</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-red" />
          <span className="text-xs text-gray-500">Cancel</span>
        </div>
      </div>

      {/* =====================================
          CREATE EVENT MODAL
      ===================================== */}

      {showCreateEvent && (
        <div className="absolute inset-0 z-50 flex items-center justify-center rounded-2xl bg-black/30 p-4 backdrop-blur-sm">
          <div className="max-h-[90%] w-full max-w-md overflow-y-auto rounded-2xl bg-white p-5 shadow-2xl sm:p-6">
            {/* Modal Header */}
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <h3 className="text-base font-bold text-gray-800 sm:text-lg">
                  Create Event
                </h3>

                <p className="mt-1 text-xs text-gray-400">
                  Add a new task to your calendar
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowCreateEvent(false)}
                aria-label="Close modal"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-lg text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700"
              >
                ×
              </button>
            </div>

            {/* Title */}
            <div className="mb-4">
              <label
                htmlFor="event-title"
                className="mb-2 block text-sm font-medium text-gray-600"
              >
                Title
              </label>

              <input
                id="event-title"
                value={eventTitle}
                onChange={(e) => setEventTitle(e.target.value)}
                type="text"
                placeholder="Event title"
                className="w-full rounded-xl border border-border bg-white px-3 py-2.5 text-sm text-gray-700 outline-none transition-all placeholder:text-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/10"
              />
            </div>

            {/* Date */}
            <div className="mb-4">
              <label
                htmlFor="event-date"
                className="mb-2 block text-sm font-medium text-gray-600"
              >
                Date
              </label>

              <input
                id="event-date"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                type="date"
                className="w-full rounded-xl border border-border bg-white px-3 py-2.5 text-sm text-gray-600 outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/10"
              />
            </div>

            {/* Time */}
            <div className="mb-5">
              <label
                htmlFor="event-time"
                className="mb-2 block text-sm font-medium text-gray-600"
              >
                Time
              </label>

              <input
                id="event-time"
                value={eventTime}
                onChange={(e) => setEventTime(e.target.value)}
                type="time"
                className="w-full rounded-xl border border-border bg-white px-3 py-2.5 text-sm text-gray-600 outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/10"
              />
            </div>
            {/* Type */}
            <div className="mb-5">
              <label
                htmlFor="event-time"
                className="mb-2 block text-sm font-medium text-gray-600"
              >
                Event Type
              </label>

              <input
                id="event-type"
                value={eventType}
                onChange={(e) => setEventType(e.target.value)}
                type="text"
                className="w-full rounded-xl border border-border bg-white px-3 py-2.5 text-sm text-gray-600 outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/10"
              />
            </div>

            {/* Buttons */}
            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setShowCreateEvent(false)}
                className="w-full rounded-xl border border-border px-4 py-2.5 text-sm font-medium text-gray-500 transition-colors hover:bg-gray-50 sm:w-auto"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={createEvent}
                disabled={!eventTitle.trim() || !eventDate || !eventTime}
                className="w-full rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-primary-dark hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
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
