import { Link, useNavigate } from "react-router-dom";

const Sidebar = ({onLogout}) => {
  const handleNavigation = (path) => {
    window.location.href = path; 
  };

  // const navigate = useNavigate(); // ✅ React Router navigation

  // const handleNavigation = (path) => {
  //   navigate(path); // ✅ Navigate without full reload
  // };

  return (
    <div className="w-64 h-screen bg-[#112240] p-6 flex flex-col shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-white text-center tracking-wide">
        Admin Panel
      </h2>

      <div className="space-y-4">
        <button
          onClick={() => handleNavigation("/")}
          className="w-full p-3 text-lg text-white bg-[#1E3A8A] hover:bg-[#2563EB] hover:scale-105 rounded-lg transition duration-300 shadow-md flex justify-center"
        >
          Registrations
        </button>

        <button
          onClick={() => handleNavigation("/levelOne")}
          className="w-full p-3 text-lg text-white bg-[#1E3A8A] hover:bg-[#2563EB] hover:scale-105 rounded-lg transition duration-300 shadow-md flex justify-center"
        >
          Level One
        </button>

        <button
          onClick={() => handleNavigation("/levelTwo")}
          className="w-full p-3 text-lg text-white bg-[#1E3A8A] hover:bg-[#2563EB] hover:scale-105 rounded-lg transition duration-300 shadow-md flex justify-center"
        >
          Level Two
        </button>

        {/* Logout Button */}
      {/* <button
        onClick={onLogout}
        className="mt-6 w-full p-3 text-lg text-white bg-red-600 hover:bg-red-700 hover:scale-105 rounded-lg transition duration-300 shadow-md flex justify-center"
      >
        Logout
      </button> */}
      </div>
    </div>
  );
};

export default Sidebar;
