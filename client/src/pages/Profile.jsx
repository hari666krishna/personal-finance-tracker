import { useState } from "react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function Profile() {

  const [isSidebarOpen, setIsSidebarOpen] =
    useState(false);

  const user = JSON.parse(
    localStorage.getItem("user")
  );

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

        <div className="p-4 md:p-8">

          <h1 className="text-3xl font-bold mb-6">
            Profile
          </h1>

          <div className="bg-white p-6 rounded-xl shadow-md">

            <div className="mb-6">

              <h2 className="text-gray-500 font-medium">
                Name
              </h2>

              <p className="text-xl font-semibold">
                {user?.name || "Not Available"}
              </p>

            </div>

            <div className="mb-6">

              <h2 className="text-gray-500 font-medium">
                Email
              </h2>

              <p className="text-xl font-semibold break-all">
                {user?.email || "Not Available"}
              </p>

            </div>

            <div>

              <h2 className="text-gray-500 font-medium">
                User ID
              </h2>

              <p className="text-sm md:text-base break-all">
                {user?.id || "Not Available"}
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}

export default Profile;