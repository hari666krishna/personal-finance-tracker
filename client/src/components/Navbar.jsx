import { useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  const handleLogout = () => {

    localStorage.removeItem("token");

    navigate("/");

  };

  return (

    <div className="bg-white shadow p-5 flex justify-between items-center">

      <h2 className="text-2xl font-bold">
        Dashboard
      </h2>

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