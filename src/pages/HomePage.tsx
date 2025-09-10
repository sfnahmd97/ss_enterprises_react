"use client";
import React from "react";
// import StatCard from "./../../../UtilComponent/StatCard";
// import RevenueChart from "./../../../UtilComponent/RevenueChart";
import { LineChart, Line, BarChart, Bar, ResponsiveContainer } from "recharts";
import StatCard from "../components/StateCard";
import RevenueChart from "../components/RevenueChart";

interface ChartData {
  name: string;
  value: number;
}

const lineData: ChartData[] = [
  { name: "A", value: 2 },
  { name: "B", value: 4 },
  { name: "C", value: 3 },
  { name: "D", value: 5 },
];

const barData: ChartData[] = [
  { name: "A", value: 3 },
  { name: "B", value: 5 },
  { name: "C", value: 2 },
  { name: "D", value: 4 },
];

const Home: React.FC = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-3">
        <h2 className="text-xl font-semibold">Welcome to Dashboard</h2>
        <div className="flex flex-wrap gap-3">
          <input
            type="date"
            className="border px-3 py-2 rounded-lg text-sm"
            defaultValue="2025-09-07"
          />
          <button className="px-4 py-2 border rounded-lg text-blue-600 border-blue-600 hover:bg-blue-50">
            Print
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Download Report
          </button>
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="NEW CUSTOMERS"
          value="3,897"
          change="+3.3%"
          positive={true}
          chart={
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineData}>
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#6366F1"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          }
        />

        <StatCard
          title="NEW ORDERS"
          value="35,084"
          change="-2.8%"
          positive={false}
          chart={
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <Bar dataKey="value" fill="#6366F1" />
              </BarChart>
            </ResponsiveContainer>
          }
        />

        <StatCard 
          title="GROWTH"
          value="89.87%"
          change="+2.8%"
          positive={true}
          chart={
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineData}>
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#6366F1"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          }
        />
      </div>

      {/* Revenue Chart */}
      <RevenueChart />
    </div>
  );
};

export default Home;
