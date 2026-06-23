function TransactionTable({
  transactions,
  loading,
  onDelete,
  onEdit,
}) {

  return (

    <div className="bg-white rounded-xl shadow-md p-3 md:p-6 mt-8">

      <h2 className="text-xl font-bold mb-4">
        Recent Transactions
      </h2>
      {loading ? (
        <div className="flex justify-center py-10">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
        </div>
      ) : (

      <div className="overflow-x-auto">

        <table className="min-w-175 w-full">

          <thead>

            <tr className="border-b">

              <th className="text-left p-3">
                Title
              </th>

              <th className="text-left p-3">
                Category
              </th>

              <th className="text-left p-3">
                Type
              </th>

              <th className="text-left p-3">
                Amount
              </th>

              <th className="text-left p-3">
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {transactions.length === 0 ? (

              <tr>

                <td
                  colSpan="5"
                  className="text-center p-6 text-gray-500"
                >

                  No Transactions Yet.
                  <br />
                  Add your first transaction above.

                </td>

              </tr>

            ) : (

              transactions.map((transaction) => (

                <tr
                  key={transaction._id}
                  className="border-b"
                >

                  <td className="p-3 max-w-37.5 truncate">
                    {transaction.title}
                  </td>

                  <td className="p-3 max-w-30 truncate">
                    {transaction.category}
                  </td>

                  <td className="p-3">
                    {transaction.type}
                  </td>

                  <td className="p-3">
                    ₹ {transaction.amount}
                  </td>

                  <td className="p-3">

                    <div className="flex flex-col sm:flex-row gap-2">

                      <button
                        type="button"
                        onClick={() => onEdit(transaction)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition"
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          onDelete(transaction._id)
                        }
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                      >
                        Delete
                      </button>

                    </div>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

          </div>
          
      )}
      

    </div>

  );

}

export default TransactionTable;