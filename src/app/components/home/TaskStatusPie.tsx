"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  PieLabelRenderProps,
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

interface TaskStatusPieProps {
  tasks: Task[];
}

const statusLabels = {
  ongoing: "Ongoing",
  complete: "Complete",
  process: "Process",
  cancel: "Cancel",
};

const COLORS = {
  ongoing: " #6756d6",
  complete: " #63b9df",
  process: "#e8bd63",
  cancel: "#e86f91",
};

export default function TaskStatusPie({ tasks }: TaskStatusPieProps) {
  const totalTasks = tasks.length;
  const renderLabel = ({
    cx,
    cy,
    midAngle,
    outerRadius,
    percent,
    fill,
  }: PieLabelRenderProps) => {
    const RADIAN = Math.PI / 180;

    const startX =
      Number(cx) + Number(outerRadius) * Math.cos(-Number(midAngle) * RADIAN);

    const startY =
      Number(cy) + Number(outerRadius) * Math.sin(-Number(midAngle) * RADIAN);

    const lineX =
      Number(cx) +
      (Number(outerRadius) + 20) * Math.cos(-Number(midAngle) * RADIAN);

    const lineY =
      Number(cy) +
      (Number(outerRadius) + 20) * Math.sin(-Number(midAngle) * RADIAN);

    const isRight = lineX >= Number(cx);

    const endX = lineX + (isRight ? 8 : -8);

    const percentage = `${(Number(percent) * 100).toFixed(0)}%`;

    return (
      <g>
        <line
          x1={startX}
          y1={startY}
          x2={lineX}
          y2={lineY}
          stroke={fill}
          strokeWidth={2}
        />

        <line
          x1={lineX}
          y1={lineY}
          x2={endX}
          y2={lineY}
          stroke={fill}
          strokeWidth={2}
        />

        <text
          x={endX + (isRight ? 3 : -3)}
          y={lineY}
          textAnchor={isRight ? "start" : "end"}
          dominantBaseline="central"
          fill={fill}
          style={{
            fontSize: "13px",
            fontWeight: 600,
          }}
        >
          {percentage}
        </text>
      </g>
    );
  };
  const statusData = [
    {
      name: statusLabels.ongoing,
      status: "ongoing",
      value: tasks.filter((task) => task.status === "ongoing").length,
    },
    {
      name: statusLabels.complete,
      status: "complete",
      value: tasks.filter((task) => task.status === "complete").length,
    },
    {
      name: statusLabels.process,
      status: "process",
      value: tasks.filter((task) => task.status === "process").length,
    },
    {
      name: statusLabels.cancel,
      status: "cancel",
      value: tasks.filter((task) => task.status === "cancel").length,
    },
  ];

  return (
    <div className="w-full rounded-xl bg-white p-6 shadow-sm mt-6">
      <h2 className="text-xl font-bold text-gray-900">Summary</h2>

      <div className="relative mt-4 h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={statusData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={80}
              paddingAngle={3}
              stroke="none"
              label={renderLabel}
              labelLine={false}
            >
              {statusData.map((item) => (
                <Cell
                  key={item.status}
                  fill={COLORS[item.status as keyof typeof COLORS]}
                />
              ))}
            </Pie>

            <Tooltip
              formatter={(value) => {
                const percentage =
                  totalTasks > 0
                    ? ((Number(value) / totalTasks) * 100).toFixed(0)
                    : 0;

                return [`${percentage}%`, "Tasks"];
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="mt-4 grid grid-cols-2 gap-4">
        {statusData.map((item) => {
          return (
            <div
              key={item.status}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <span
                  className="h-3 w-3 rounded-sm"
                  style={{
                    backgroundColor: COLORS[item.status as keyof typeof COLORS],
                  }}
                />

                <span className="text-sm text-gray-600">{item.name}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
