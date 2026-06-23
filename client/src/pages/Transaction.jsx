import { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import TransactionForm from "../components/TransactionForm";
import TransactionTable from "../components/TransactionTable";

import toast from "react-hot-toast";

import {
  getRecentTransactions,
  addTransaction,
  deleteTransaction,
  updateTransaction,
} from "../services/dashboardService";

function Transactions() {

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const [transactions, setTransactions] = useState([]);
    
    const [editingTransaction, setEditingTransaction] = useState(null);
    
    const [searchTerm, setSearchTerm] = useState("");
    
    const [filterType, setFilterType] = useState("");
    
    const [filterCategory, setFilterCategory] = useState("");

    const [loading, setLoading] = useState(true);
    
    const fetchTransactions = async () => {
      
        try {
        
            setLoading(true);
            

            const recentData =
          
                await getRecentTransactions();
            

            setTransactions(recentData.data);
            

        } catch (error) {
            
            console.error(error);
            

        } finally {
            
            setLoading(false);
            
        }
        
    };
    

    useEffect(() => {
      
        fetchTransactions();
        
    }, []);
    

    const handleAddTransaction = async (
      
        transactionData
        
    ) => {
        
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
            

            fetchTransactions();
            

    } catch (error) {

      toast.error(
        "Something went wrong"
      );

      console.error(error);

    }
  };

  const handleDeleteTransaction =
    async (id) => {

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

        fetchTransactions();

      } catch (error) {

        toast.error(
          "Something went wrong"
        );

      }
    };

  const handleEditTransaction =
    (transaction) => {

      setEditingTransaction(
        transaction
      );

    };

  const filteredTransactions =
    transactions.filter(
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

  // if (loading) {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center">
  //       <h1 className="text-2xl font-bold">
  //         Loading...
  //       </h1>
  //     </div>
  //   );
  // }

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

        <div className="px-4 md:px-8 py-8">

          <TransactionForm
            onAdd={handleAddTransaction}
            editingTransaction={editingTransaction}
            key={
              editingTransaction?._id ||
              "new"
            }
          />

        </div>

        <div className="px-4 md:px-8 pb-6">

          <div className="bg-white p-4 rounded-xl shadow-md flex flex-col lg:flex-row gap-4">

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
              className="border p-3 rounded w-full lg:w-auto"
            >
              <option value="">
                All Types
              </option>

              <option value="income">
                Income
              </option>

              <option value="expense">
                Expense
              </option>

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
              className="border p-3 rounded w-full lg:w-auto"
            />

          </div>

        </div>

        <div className="px-4 md:px-8 pb-8">

          <TransactionTable
            loading={
              loading
            }
            transactions={
              filteredTransactions
            }
            onDelete={
              handleDeleteTransaction
            }
            onEdit={
              handleEditTransaction
            }
          />

        </div>

      </div>

    </div>
  );
}

export default Transactions;