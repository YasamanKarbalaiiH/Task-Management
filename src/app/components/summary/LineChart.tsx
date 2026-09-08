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
    <section className="w-full rounded-2xl bg-white p-4 shadow-sm sm:p-5 lg:p-6">
      {/* Header */}
      <div className="mb-5">
        <h2 className="text-lg font-bold text-gray-800 sm:text-xl">
          Task Overview
        </h2>
      </div>

      {/* Chart */}
      <div className="h-70 w-full sm:h-80 lg:h-87.5">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{
              top: 10,
              right: 15,
              left: -15,
              bottom: 10,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />

            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{
                fontSize: 12,
                fill: "#85838f",
              }}
              dy={8}
            />

            <YAxis
              allowDecimals={false}
              axisLine={false}
              tickLine={false}
              tick={{
                fontSize: 12,
                fill: "#85838f",
              }}
              width={30}
            />

            <Tooltip
              contentStyle={{
                borderRadius: "12px",
                border: "1px solid #eeeef3",
                boxShadow: "0 4px 15px rgba(0, 0, 0, 0.08)",
              }}
              labelStyle={{
                color: "#303039",
                fontWeight: 600,
              }}
            />

            <Legend
              align="left"
              content={() => (
                <div className="mb-5 flex flex-wrap gap-x-5 gap-y-2">
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-sm bg-blue" />
                    <span className="text-sm text-text-secondary">
                      Complete
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-sm bg-purple" />
                    <span className="text-sm text-text-secondary">Ongoing</span>
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
    </section>
  );
}

export default TaskLineChart;
