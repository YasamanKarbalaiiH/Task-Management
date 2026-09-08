"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface Task {
  title: string;
  status: "ongoing" | "process" | "complete" | "cancel";
  dueDate: string;
}

interface TaskLineChartProps {
  data: Task[];
}

function TaskLineChart({ data }: TaskLineChartProps) {
  const chartData = data
    .filter((item) => item.status === "ongoing" || item.status === "complete")
    .map((item) => ({
      date: new Date(item.dueDate).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      ongoing: item.status === "ongoing" ? 1 : 0,
      complete: item.status === "complete" ? 1 : 0,
    }));

  return (
    <div className="w-full rounded-2xl bg-white p-6 shadow-2xl">
      <div className="mb-6">
        <h2 className="font-semibold">Task Overview</h2>
      </div>

      <div className="h-75 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{
              top: 10,
              right: 20,
              left: 0,
              bottom: 10,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="date" />

            <YAxis allowDecimals={false} />

            <Tooltip />

            <Legend
              align="left"
              content={() => (
                <div className="mt-3 mb-4 flex gap-5">
                  <div className="flex items-center gap-2">
                    <span className="h-4 w-4 rounded-md bg-blue" />

                    <span className="text-sm text-gray-600">Complete</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="h-4 w-4 rounded-md bg-purple" />

                    <span className="text-sm text-gray-600">Ongoing</span>
                  </div>
                </div>
              )}
            />

            <Line
              type="monotone"
              dataKey="ongoing"
              name="Ongoing"
              stroke="#6756d6"
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />

            <Line
              type="monotone"
              dataKey="complete"
              name="Complete"
              stroke="#63b9df"
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default TaskLineChart;
