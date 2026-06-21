import { useState, useEffect } from "react";

function TransactionForm({
    onAdd,
    editingTransaction,
}) {
    console.log("FORM RECEIVED:", editingTransaction);

  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    type: "expense",
    category: "",
    description: "",
  });
    useEffect(() => {

        console.log("Editing Transaction Changed");
        console.log(editingTransaction);
        if (editingTransaction) {

            setFormData({
                title: editingTransaction.title,
                amount: editingTransaction.amount,
                type: editingTransaction.type,
                category: editingTransaction.category,
                description: editingTransaction.description,
            });
        }
    }, [editingTransaction]);

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  const handleSubmit = (e) => {

    e.preventDefault();

    onAdd(formData);

    setFormData({
      title: "",
      amount: "",
      type: "expense",
      category: "",
      description: "",
    });

  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow-md"
    >

      <h2 className="text-xl font-bold mb-4">
        Add Transaction
      </h2>

      <input
        type="text"
        name="title"
        placeholder="Title"
        value={formData.title}
        onChange={handleChange}
        className="w-full border p-3 rounded mb-3"
      />

      <input
        type="number"
        name="amount"
        placeholder="Amount"
        value={formData.amount}
        onChange={handleChange}
        className="w-full border p-3 rounded mb-3"
      />

      <select
        name="type"
        value={formData.type}
        onChange={handleChange}
        className="w-full border p-3 rounded mb-3"
      >
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>

      <input
        type="text"
        name="category"
        placeholder="Category"
        value={formData.category}
        onChange={handleChange}
        className="w-full border p-3 rounded mb-3"
      />

      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        className="w-full border p-3 rounded mb-3"
      />

      <button
        type="submit"
        className="w-full bg-blue-600 text-white p-3 rounded"
          >
              {
                  editingTransaction
                      ? "Update Transaction"
                      : "Add Transaction"
              }
      </button>

    </form>
  );
}

export default TransactionForm;