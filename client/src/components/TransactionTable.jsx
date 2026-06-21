function TransactionTable({
  transactions,
    onDelete,
    onEdit,
  
}) {

  return (

    <div className="bg-white rounded-xl shadow-md p-6 mt-8">

      <h2 className="text-xl font-bold mb-4">
        Recent Transactions
      </h2>

      <table className="w-full">

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
        
              {transactions.length === 0 ? (
                  <div
                      className="text-center py-6 text-gray-500">
                      No Transactions Found
                  </div>
              ) : (
                      
              

        <tbody>

          {transactions.map((transaction) => (

            <tr
              key={transaction._id}
              className="border-b"
            >

              <td className="p-3">
                {transaction.title}
              </td>

              <td className="p-3">
                {transaction.category}
              </td>

              <td className="p-3">
                {transaction.type}
              </td>

              <td className="p-3">
                ₹ {transaction.amount}
              </td>

                  <td className="p-3 flex gap-2">
                      
                      <button
                          type="button"
                          onClick={() => {
                              console.log("EDIT BUTTON CLICKED");
                            
                              onEdit(transaction);
                          }}
                          className="bg-yellow-500 text-white px-3 py-1 rounded"
                      >
                          Edit

                      </button>

                <button
                  onClick={() =>
                    onDelete(transaction._id)
                  }
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>

              </td>

            </tr>

          ))}

                  </tbody>
                      )}

      </table>

    </div>

  );

}

export default TransactionTable;