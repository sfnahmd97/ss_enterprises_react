"use client";
import React, { useState, useEffect } from "react";
import { Users, UserCheck, Bus } from "lucide-react";
import StatCard from "../components/StateCard";
import api from "../lib/axios";

interface DashboardData {
  customers_count: number;
  employees_count: number;
  distributors_count: number;
}


const Home: React.FC = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData>({
    customers_count: 0,
    employees_count: 0,
    distributors_count: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const res = await api.get("/get-dashboard-data");
        const data = (res.data as { data: DashboardData }).data;
        setDashboardData(data);
      } catch (error: any) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const formatNumber = (num: number): string => {
    return num.toLocaleString("en-US");
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-3">
        <h2 className="text-xl font-semibold">Welcome to Dashboard</h2>
        <div className="flex flex-wrap gap-3">
          
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="CUSTOMERS"
          value={loading ? "..." : formatNumber(dashboardData.customers_count)}
          change="+3.3%"
          positive={true}
          icon={<Users className="w-6 h-6" />}
          link="/crm/customer"
        />

        <StatCard
          title="EMPLOYEES"
          value={loading ? "..." : formatNumber(dashboardData.employees_count)}
          change="+5.2%"
          positive={true}
          icon={<UserCheck className="w-6 h-6" />}
          link="/hrm/employee"
        />

        <StatCard 
          title="DISTRIBUTORS"
          value={loading ? "..." : formatNumber(dashboardData.distributors_count)}
          change="+1.8%"
          positive={true}
          icon={<Bus className="w-6 h-6" />}
          link="/master/distributor"
        />
      </div>
    </div>
  );
};

export default Home;
