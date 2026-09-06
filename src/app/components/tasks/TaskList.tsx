"use client";

import { useState } from "react";
import Search from "./Search";
import Image from "next/image";

type TaskStatus = "ongoing" | "process" | "complete" | "cancel";

type Task = {
  title: string;
  status: TaskStatus;
  dueDate: string;
  project: string;
  assignees: {
    id: string;
    name: string;
    avatar: string;
  }[];
};

interface TaskListProps {
  tasks: Task[];
}

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  startIndex: number;
  totalTasks: number;
  tasksPerPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

/* ================= STATUS STYLES ================= */

const statusStyles: Record<
  TaskStatus,
  {
    label: string;
    className: string;
  }
> = {
  ongoing: {
    label: "Ongoing",
    className: "bg-purple-bg text-purple",
  },

  process: {
    label: "Process",
    className: "bg-yellow-bg text-yellow",
  },

  complete: {
    label: "Complete",
    className: "bg-green-bg text-green",
  },

  cancel: {
    label: "Cancel",
    className: "bg-red-bg text-red",
  },
};

/* ================= STATUS BADGE ================= */

function StatusBadge({ status }: { status: TaskStatus }) {
  const style = statusStyles[status];

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${style.className}`}
    >
      {style.label}
    </span>
  );
}

/* ================= TASK LIST ================= */

function TaskList({ tasks }: TaskListProps) {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<TaskStatus | "all">("all");

  const tasksPerPage = 6;

  /* ================= SEARCH ================= */

  const filteredTasks = tasks.filter((task) => {
    const value = search.toLowerCase();

    const matchesSearch =
      task.title.toLowerCase().includes(value) ||
      task.project.toLowerCase().includes(value);

    const matchesStatus =
      statusFilter === "all" || task.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  /* ================= PAGINATION ================= */

  const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);

  const startIndex = (currentPage - 1) * tasksPerPage;

  const currentTasks = filteredTasks.slice(
    startIndex,
    startIndex + tasksPerPage,
  );

  /* ================= SEARCH HANDLER ================= */

  const handleSearch = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  return (
    <section className="w-full">
      {/* ================= SEARCH & FILTER ================= */}

      <div className="mb-6 flex w-full flex-col gap-3 sm:flex-row">
        <div className="min-w-0 flex-1">
          <Search onSearch={handleSearch} />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value as TaskStatus | "all");
            setCurrentPage(1);
          }}
          className="h-11 w-full cursor-pointer rounded-xl border border-border bg-white px-4 text-sm font-medium text-text-primary outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/10 sm:w-44"
        >
          <option value="all">All Status</option>
          <option value="ongoing">Ongoing</option>
          <option value="process">Process</option>
          <option value="complete">Complete</option>
          <option value="cancel">Cancel</option>
        </select>
      </div>

      {/* ================= DESKTOP TABLE ================= */}

      <div className="hidden overflow-hidden rounded-2xl border border-border bg-white shadow-sm lg:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-212.5">
            <thead>
              <tr className="border-b border-border bg-primary-light">
                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wide text-text-primary">
                  Task
                </th>

                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wide text-text-primary">
                  Project
                </th>

                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wide text-text-primary">
                  Assignees
                </th>

                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wide text-text-primary">
                  Status
                </th>

                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wide text-text-primary">
                  Due Date
                </th>
              </tr>
            </thead>

            <tbody>
              {currentTasks.length > 0 ? (
                currentTasks.map((task) => (
                  <tr
                    key={task.title}
                    className="border-b border-border last:border-b-0 transition-colors hover:bg-background"
                  >
                    {/* Task */}

                    <td className="px-6 py-5">
                      <p className="max-w-65 truncate text-sm font-semibold text-text-primary">
                        {task.title}
                      </p>
                    </td>

                    {/* Project */}

                    <td className="px-6 py-5">
                      <span className="inline-flex rounded-full bg-primary-light px-3 py-1 text-xs font-semibold text-primary">
                        {task.project}
                      </span>
                    </td>

                    {/* Assignees */}

                    <td className="px-6 py-5">
                      <div className="flex -space-x-2">
                        {task.assignees.map((user) => (
                          <Image
                            width={32}
                            height={32}
                            key={user.id}
                            src={user.avatar}
                            alt={user.name}
                            title={user.name}
                            className="h-8 w-8 rounded-full border-2 border-white object-cover"
                          />
                        ))}
                      </div>
                    </td>

                    {/* Status */}

                    <td className="px-6 py-5">
                      <StatusBadge status={task.status} />
                    </td>

                    {/* Due Date */}

                    <td className="px-6 py-5">
                      <span className="text-sm font-medium text-text-secondary">
                        {task.dueDate}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-14 text-center text-sm text-text-muted"
                  >
                    No tasks found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Desktop Pagination */}

        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            startIndex={startIndex}
            totalTasks={filteredTasks.length}
            tasksPerPage={tasksPerPage}
            setCurrentPage={setCurrentPage}
          />
        )}
      </div>

      {/* ================= MOBILE / TABLET ================= */}

      <div className="space-y-4 lg:hidden">
        {currentTasks.length > 0 ? (
          currentTasks.map((task) => (
            <article
              key={task.title}
              className="rounded-2xl border border-border bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
            >
              {/* Title + Status */}

              <div className="mb-5">
                <div className="flex items-start justify-between gap-3">
                  <p className="min-w-0 text-sm font-bold text-text-primary">
                    {task.title}
                  </p>

                  <StatusBadge status={task.status} />
                </div>

                <span className="mt-3 inline-flex rounded-full bg-primary-light px-3 py-1 text-xs font-semibold text-primary">
                  {task.project}
                </span>
              </div>

              {/* Assignees */}

              <div className="mb-5">
                <p className="mb-2 text-xs font-medium text-text-muted">
                  Assignees
                </p>

                <div className="flex -space-x-2">
                  {task.assignees.map((user) => (
                    <Image
                      width={32}
                      height={32}
                      key={user.id}
                      src={user.avatar}
                      alt={user.name}
                      title={user.name}
                      className="h-8 w-8 rounded-full border-2 border-white object-cover"
                    />
                  ))}
                </div>
              </div>

              {/* Due Date */}

              <div className="flex items-center justify-between border-t border-border pt-4">
                <p className="text-xs font-medium text-text-muted">Due Date</p>

                <p className="text-sm font-semibold text-text-secondary">
                  {task.dueDate}
                </p>
              </div>
            </article>
          ))
        ) : (
          <div className="rounded-2xl border border-border bg-white px-5 py-12 text-center text-sm text-text-muted shadow-sm">
            No tasks found
          </div>
        )}

        {/* Mobile / Tablet Pagination */}

        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            startIndex={startIndex}
            totalTasks={filteredTasks.length}
            tasksPerPage={tasksPerPage}
            setCurrentPage={setCurrentPage}
          />
        )}
      </div>
    </section>
  );
}

/* ================= PAGINATION ================= */

function Pagination({
  currentPage,
  totalPages,
  startIndex,
  totalTasks,
  tasksPerPage,
  setCurrentPage,
}: PaginationProps) {
  return (
    <div className="flex flex-col gap-4 border-t border-border px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
      {/* Showing */}

      <p className="text-center text-sm text-text-secondary sm:text-left">
        Showing{" "}
        <span className="font-semibold text-text-primary">
          {startIndex + 1}
        </span>{" "}
        -{" "}
        <span className="font-semibold text-text-primary">
          {Math.min(startIndex + tasksPerPage, totalTasks)}
        </span>{" "}
        of <span className="font-semibold text-text-primary">{totalTasks}</span>
      </p>

      {/* Buttons */}

      <div className="flex items-center justify-center gap-1">
        {/* Previous */}

        <button
          type="button"
          onClick={() => setCurrentPage((page) => Math.max(page - 1, 1))}
          disabled={currentPage === 1}
          className="rounded-lg border border-border px-3 py-2 text-sm font-medium text-text-secondary transition-colors hover:bg-primary-light hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
        >
          Previous
        </button>

        {/* Page Numbers */}

        <div className="flex items-center gap-1">
          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (page) => (
              <button
                type="button"
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`h-9 w-9 rounded-lg text-sm font-semibold transition-colors ${
                  currentPage === page
                    ? "bg-primary text-white"
                    : "text-text-secondary hover:bg-primary-light hover:text-primary"
                }`}
              >
                {page}
              </button>
            ),
          )}
        </div>

        {/* Next */}

        <button
          type="button"
          onClick={() =>
            setCurrentPage((page) => Math.min(page + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="rounded-lg border border-border px-3 py-2 text-sm font-medium text-text-secondary transition-colors hover:bg-primary-light hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default TaskList;
