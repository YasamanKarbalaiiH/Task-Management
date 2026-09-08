"use client";

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

interface TasksProps {
  data: Task[];
}

function TopCard({ data }: TasksProps) {
  return (
    <section className="w-full rounded-2xl bg-white p-4 shadow-sm sm:p-5 lg:p-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-lg font-bold text-gray-800 sm:text-xl">
          Top Projects
        </h2>
      </div>

      {/* Projects */}
      <div className="flex flex-col gap-6">
        {data.map((item) => (
          <div key={item.project} className="flex flex-col gap-2.5">
            <div className="flex items-center justify-between gap-3">
              <span className="min-w-0 truncate text-sm font-medium text-gray-700">
                {item.title}
              </span>

              <span className="shrink-0 text-sm font-semibold text-gray-800">
                {item.percent}%
              </span>
            </div>

            <div className="h-2.5 w-full overflow-hidden rounded-full bg-gray-100">
              <div
                className="h-full rounded-full bg-blue transition-all duration-300"
                style={{ width: `${item.percent}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default TopCard;
