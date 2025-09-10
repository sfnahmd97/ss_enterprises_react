"use client";

import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface RevenueData {
  name: string;
  revenue: number;
}

const data: RevenueData[] = [
  { name: "Jan", revenue: 50 },
  { name: "Feb", revenue: 60 },
  { name: "Mar", revenue: 55 },
  { name: "Apr", revenue: 62 },
  { name: "May", revenue: 48 },
  { name: "Jun", revenue: 35 },
  { name: "Jul", revenue: 40 },
  { name: "Aug", revenue: 52 },
  { name: "Sep", revenue: 58 },
];

const RevenueChart: React.FC = () => {
  return (
    <div className="bg-white shadow rounded-xl p-6 mt-6">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="font-semibold text-lg">REVENUE</h3>
          <p className="text-gray-500 text-sm">
            Revenue is the income that a business has from its normal business
            activities, usually from the sale of goods and services.
          </p>
        </div>
        <div className="flex space-x-2">
          {["Today", "Week", "Month", "Year"].map((period) => (
            <button
              key={period}
              className={`px-3 py-1 rounded-lg text-sm border ${
                period === "Month"
                  ? "bg-blue-600 text-white"
                  : "text-blue-600 border-blue-600 hover:bg-blue-50"
              }`}
            >
              {period}
            </button>
          ))}
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#6366F1"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueChart;
