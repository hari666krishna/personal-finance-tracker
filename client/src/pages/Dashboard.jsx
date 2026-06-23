import { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import SummaryCard from "../components/SummaryCard";

import CategoryPieChart from "../charts/CategoryPieChart";
import MonthlyBarChart from "../charts/MonthlyBarChart";

import {
  getDashboardSummary,
  getCategorySummary,
  getMonthlyAnalytics,
} from "../services/dashboardService";

function Dashboard() {
  const [summary, setSummary] = useState({
    totalIncome: 0,
    totalExpense: 0,
    balance: 0,
    totalTransactions: 0,
  });
    
    const [categoryData, setCategoryData] = useState([]);
    
    const [monthlyData, setMonthlyData] = useState([]);
    
    const [loading, setLoading] = useState(true);

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      const summaryData =
        await getDashboardSummary();

      setSummary(
        summaryData.summary
      );

      const categoryResponse =
        await getCategorySummary();

      setCategoryData(
        categoryResponse.data
      );

      const monthlyResponse =
        await getMonthlyAnalytics();

      setMonthlyData(
        monthlyResponse.data
      );

    } catch (error) {

      console.error(
        "Dashboard Error:",
        error
      );

    } finally {

      setLoading(false);

    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold">
          Loading...
        </h1>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-100">

          <Sidebar
              isOpen={isSidebarOpen}
              closeMenu={() =>
                  setIsSidebarOpen(false)    
              }
          />
          

      <div className="flex-1">

              <Navbar
                  onMenuClick={() =>
                      setIsSidebarOpen(true)
                  }
              />

        <div className="p-4 md:p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

          <SummaryCard
            title="Total Income"
            amount={summary.totalIncome}
          />

          <SummaryCard
            title="Total Expense"
            amount={summary.totalExpense}
          />

          <SummaryCard
            title="Balance"
            amount={summary.balance}
          />

          <SummaryCard
            title="Transactions"
            amount={summary.totalTransactions}
          />

        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 px-4 md:px-8 pb-8">

          <CategoryPieChart
            data={categoryData}
          />

          <MonthlyBarChart
            data={monthlyData}
          />

        </div>

      </div>

    </div>
  );
}

export default Dashboard;