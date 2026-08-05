import React from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const defaultData = [
  { date: "17", height: 0, bmi: 20.5, weight: 10 },
  { date: "18", height: 0, bmi: 18.5, weight: 20 },
  { date: "19", height: 102, bmi: 22.5, weight: 12 },
  { date: "20", height: 105, bmi: 25.5, weight: 40 },
];

const LineChartComponent = ({
  keys = [
    { key: "height", fill: "red" },
    { key: "weight", fill: "green" },
    { key: "bmi", fill: "blue" },
  ],
  data = defaultData,
  width,
  height,
  title = "",
  xAxisKey = "date",
  selectedMetric,
}) => {
  return (
    <div className="w-full h-full ">
      {title && <h1 className="text-lg font-bold">{title}</h1>}
      <ResponsiveContainer width={width ?? "100%"} height={height ?? "100%"}>
        <LineChart
          data={data}
          margin={{ top: 25, left: 25, right: 25, bottom: 60 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
          {keys.map((val, i) => (
            <Line
              key={val.key}
              type="monotone"
              dataKey={val.key}
              stroke={val.fill}
              strokeWidth={2.5}
              dot={{ r: 4, strokeWidth: 2, stroke: val.fill, fill: "#fff" }}
              activeDot={{ r: 7, strokeWidth: 2, stroke: val.fill, fill: "#fff" }}
              connectNulls={true}
            />
          ))}
          <XAxis
            dataKey={xAxisKey}
            tick={{ fontSize: 11 }}
            interval={0}
            angle={-20}
            textAnchor="end"
            height={60}
          />
          <YAxis
            tick={{ fontSize: 11 }}
            tickFormatter={(val) =>
              selectedMetric === "weight"
                ? `${val} kg`
                : selectedMetric === "height"
                  ? `${val} cm`
                  : val
            }
          />
          <Tooltip
            content={({ active, payload, label }) => {
              if (!active || !payload?.length) return null;
              return (
                <div className="bg-white shadow-lg border border-gray-200 rounded-xl px-4 py-3 text-xs">
                  <p className="font-semibold text-gray-700 mb-2 border-b pb-1.5">
                    {label}
                  </p>
                  {payload.map((entry) => (
                    <div key={entry.name} className="flex items-center gap-2 py-0.5">
                      <span
                        className="w-2.5 h-2.5 rounded-full shrink-0"
                        style={{ backgroundColor: entry.color }}
                      />
                      <span className="text-gray-500">{entry.name}:</span>
                      <span className="font-semibold text-gray-800">
                        {entry.value}
                      </span>
                    </div>
                  ))}
                </div>
              );
            }}
          />
          <Legend
            verticalAlign="bottom"
            height={36}
            iconType="circle"
            formatter={(value) => (
              <span className="text-xs text-gray-600 font-medium">{value}</span>
            )}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChartComponent;
