import { Link } from "react-router-dom";

function Sidebar({ isOpen, closeMenu }) {

  return (
    <>
      <div
        className={`
          fixed md:static
          top-0 left-0
          min-h-screen
          w-64
          bg-blue-700
          text-white
          p-6
          z-50
          transform
          transition-transform
          duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >

        <button
          className="md:hidden mb-6 text-2xl"
          onClick={closeMenu}
        >
          ✕
        </button>

        <h1 className="text-2xl font-bold mb-10">
          Finance Tracker
        </h1>

        <nav className="flex flex-col gap-4">

          <Link
            to="/dashboard"
            onClick={closeMenu}
            className="hover:bg-blue-600 p-3 rounded"
          >
            Dashboard
          </Link>

          <Link
            to="/transactions"
            onClick={closeMenu}
            className="hover:bg-blue-600 p-3 rounded"
          >
            Transactions
          </Link>

          <Link
            to="/profile"
            onClick={closeMenu}
            className="hover:bg-blue-600 p-3 rounded"
          >
            Profile
          </Link>

        </nav>

      </div>
    </>
  );
}

export default Sidebar;