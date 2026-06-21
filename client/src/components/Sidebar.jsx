import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="w-64 h-screen bg-blue-700 text-white p-6">

      <h1 className="text-2xl font-bold mb-10">
        Finance Tracker
      </h1>

      <nav className="flex flex-col gap-4">

        <Link to="/dashboard" className="hover:bg-blue-600 p-3 rounded">
          Dashboard
        </Link>

        <Link to="/transactions" className="hover:bg-blue-600 p-3 rounded">
          Transactions
        </Link>

        <Link to="/profile" className="hover:bg-blue-600 p-3 rounded">
          Profile
        </Link>

      </nav>

    </div>
  );
}

export default Sidebar;