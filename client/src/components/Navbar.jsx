import { useNavigate } from "react-router-dom";

function Navbar({ onMenuClick }) {

  const navigate = useNavigate();

  const handleLogout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/");

  };

  return (

    <div className="bg-white shadow px-4 py-5 md:px-8 flex justify-between items-center">

      <div className="flex items-center gap-4">

        <button
          onClick={onMenuClick}
          className="md:hidden text-3xl"
        >
          ☰
        </button>

        <h2 className="text-xl md:text-2xl font-bold">
          Personal Finance Tracker
        </h2>

      </div>

      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Logout
      </button>

    </div>

  );

}

export default Navbar;