import { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import SummaryCard from "../components/SummaryCard";
import TransactionTable from "../components/TransactionTable";
import TransactionForm from "../components/TransactionForm";

import CategoryPieChart from "../charts/CategoryPieChart";
import MonthlyBarChart from "../charts/MonthlyBarChart";
import toast from "react-hot-toast";

import {
  getDashboardSummary,
  getRecentTransactions,
  getCategorySummary,
  getMonthlyAnalytics,
  addTransaction,
  deleteTransaction,
  updateTransaction,
} from "../services/dashboardService";

function Dashboard() {
  const [summary, setSummary] = useState({
    totalIncome: 0,
    totalExpense: 0,
    balance: 0,
    totalTransactions: 0,
  });

    const [transactions, setTransactions] = useState([]);
    
    const [categoryData, setCategoryData] = useState([]);
    
    const [monthlyData, setMonthlyData] = useState([]);

    const [editingTransaction, setEditingTransaction] = useState(null);

    const [searchTerm, setSearchTerm] = useState("");

    const [filterType, setFilterType] = useState("");

    const [filterCategory, setFilterCategory] = useState("");

    const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
      try {
        
          setLoading(true);

          // Summary
          const summaryData = await getDashboardSummary();
          setSummary(summaryData.summary);
          
          // Recent Transactions
          const recentData = await getRecentTransactions();
          setTransactions(recentData.data);

          // Category Analytics
          const categoryResponse = await getCategorySummary(); 
          setCategoryData(categoryResponse.data);
        
          // Monthly Analytics
          const monthlyResponse = await getMonthlyAnalytics();
          setMonthlyData(monthlyResponse.data);

      } catch (error) {
          
          console.error("Dashboard Error:", error);
          
      } finally {
          setLoading(false);
      }
      
    };
    

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleAddTransaction = async (transactionData) => {
      try {
        
          if (editingTransaction) {
              await updateTransaction(
                  editingTransaction._id,
                  transactionData
              );

              setEditingTransaction(null);

          } else {
              await addTransaction(
                  transactionData
              );
              
          }
          toast.success(
              editingTransaction
                  ? "Transaction Updated"
                  : "Transaction Added"
          );
      // Refresh dashboard data
      fetchDashboardData();

      } catch (error) {
          toast.error("Something went wrong");
          console.error(error);
          
      }
      
    };

    
    const handleDeleteTransaction = async (id) => {
        const confirmDelete =
            window.confirm(
                "Are you sure want to delete this transaction?"
            );
        
        if (!confirmDelete) return;

        try {
            await deleteTransaction(id);
            toast.success(
                "Transaction Deleted"
            );


            fetchDashboardData();
        } catch (error) {
            toast.error("Something went wrong");

        }
           
    };

    const handleEditTransaction = (transaction) => {
       // console.log("Edit Clicked");
        //console.log(transaction);

        setEditingTransaction(transaction)
    };

    const filteredTransactions = transactions.filter(
        (transaction) => {

            const matchesSearch =
                transaction.title
                    .toLowerCase()
                    .includes(
                        searchTerm.toLowerCase()
                        
                    );
            const matchesType =
                filterType === ""
                    ? true
                    : transaction.type === filterType;
            
            const matchesCategory =
                filterCategory === ""
                    ? true
                    : transaction.category === filterCategory;
            
            return (
                matchesSearch &&
                matchesType &&
                matchesCategory
            );
        }
    );

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

      <Sidebar />

      <div className="flex-1">

        <Navbar />

        {/* Summary Cards */}
        <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

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

        {/* Add Transaction Form */}
        <div className="px-8 pb-8">
          <TransactionForm
                      onAdd={handleAddTransaction}
                      editingTransaction={editingTransaction}
                      key={editingTransaction?._id || "new"}
          />
              </div>
              
              <div className="px-8 pb-6">
                  <div className="bg-white p-4 rounded-xl shadow-md flex gap-4 flex-wrap">
                      <input
                          type="text"
                          placeholder="Search transaction..."
                          value={searchTerm}
                          onChange={(e) =>
                              setSearchTerm(
                              e.target.value
                          )
                      }
                          className="border p-3 rounded flex-1"
                      />

                      <select
                          value={filterType}
                          onChange={(e) =>
                              setFilterType(
                              e.target.value
                          )
                      }
                          className="border p-3 rounded"
                      >
                          <option value="">All Types</option>

                          <option value="income">Income</option>

                          <option value="expense">Expense</option>

                      </select>

                      <input
                          type="text"
                          placeholder="Category"
                          value={filterCategory}
                          onChange={(e) =>
                              setFilterCategory(
                              e.target.value
                          )
                      }
                          className="border p-3 rounded"
                      />
                  </div>
              </div>

        {/* Recent Transactions */}
        <div className="px-8 pb-8">
          <TransactionTable
                      transactions={filteredTransactions}
                      onDelete={handleDeleteTransaction}
                      onEdit={handleEditTransaction}
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 px-8 pb-8">

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