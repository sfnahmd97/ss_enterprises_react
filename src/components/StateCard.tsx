

import React, {type ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  positive: boolean;
  chart: ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, positive, chart }) => {
  return (
    <div className="bg-white shadow rounded-xl p-5 flex-1 min-w-[250px]">
      <div className="flex justify-between items-center mb-3">
        <h4 className="text-gray-600 font-medium">{title}</h4>
        <span className="text-gray-400">...</span>
      </div>
      <p className="text-2xl font-bold">{value}</p>
      <p
        className={`text-sm mt-1 ${
          positive ? "text-green-500" : "text-red-500"
        }`}
      >
        {change} {positive ? "↑" : "↓"}
      </p>
      <div className="h-12 mt-3">{chart}</div>
    </div>
  );
};

export default StatCard;
