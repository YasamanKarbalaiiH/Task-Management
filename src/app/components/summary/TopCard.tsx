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
    <div className="bg-white rounded-2xl shadow-2xl p-8 w-[80%]">
      <p className="font-semibold mb-8">Top Projects</p>

      <div className="flex flex-col gap-8">
        {data.map((item) => (
          <div key={item.project} className="flex flex-col gap-2">
            <span>{item.title}</span>

            <div className="flex items-center gap-3">
              <div className="h-2 w-[50%] rounded-full bg-gray-200">
                <div
                  className="h-2 rounded-full bg-blue transition-all duration-300"
                  style={{ width: `${item.percent}%` }}
                />
              </div>

              <span className="text-sm font-medium">{item.percent}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TopCard;
