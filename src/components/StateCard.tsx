

import React, {type ReactNode } from "react";
import { Link } from "react-router-dom";

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  positive: boolean;
  icon?: ReactNode;
  link?: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, positive, icon, link }) => {
  const cardContent = (
    <div className="bg-white shadow rounded-xl p-5 flex-1 min-w-[250px] hover:shadow-lg transition-shadow cursor-pointer">
      <div className="flex justify-between items-center mb-3">
        <h4 className="text-gray-600 font-medium">{title}</h4>
        {icon && (
          <div className="text-gray-400">
            {icon}
          </div>
        )}
      </div>
      <p className="text-2xl font-bold">{value}</p>
      <p
        className={`text-sm mt-1 ${
          positive ? "text-green-500" : "text-red-500"
        }`}
      >
        {change} {positive ? "↑" : "↓"}
      </p>
    </div>
  );

  if (link) {
    return <Link to={link}>{cardContent}</Link>;
  }

  return cardContent;
};

export default StatCard;
