import React, { useState,useEffect } from "react";
import { io } from "socket.io-client";
import { FaUsers, FaTrophy, FaStopwatch } from "react-icons/fa";
const BACK_URL = import.meta.env.VITE_BACK_URL

const socket = io(BACK_URL);

const LevelOne = () => {

   const [count,setCount] = useState(0)
   const [teams,setTeams] = useState([]);
  const [firstlevelTeams,setFirstLevelTeams] = useState([]);

  //  update_firstlevel
    
    useEffect(() => {
        
        socket.on("update_teams", (data) => {
          setTeams(data);
      });

      socket.on("update_firstlevel", (data) => {
        setFirstLevelTeams(data);
    });
    
        return () => {
            socket.off("update_teams");
            socket.off("update_teams");
        };
    }, []);

  return (
    <div
      className="w-full min-h-screen p-6 bg-gradient-to-b from-[#0A192F] to-[#112240] flex flex-col items-center"
    >
      <h2 className="text-4xl font-bold text-white mb-6 tracking-wide">
        🚀 <span className="text-blue-400">Admin Dashboard</span>
      </h2>

      {/* Stats Cards */}
      <div className="w-full max-w-4xl grid grid-cols-3 gap-6">
        {/* Registered Teams Card */}
        <div className="bg-[#1B2A41] p-6 rounded-xl text-center shadow-lg transition-transform transform hover:scale-105 duration-300 border border-[#2C3E50]">
          <FaUsers className="text-4xl text-yellow-400 ms-auto me-auto" />
          <h3 className="text-lg font-semibold text-gray-300 mt-3">
            Registered Teams
          </h3>
          <p className="text-2xl font-bold text-white">{teams.length}</p>
        </div>

        {/* Teams Submitted Card */}
        <div className="bg-[#1B2A41] p-6 rounded-xl text-center shadow-lg transition-transform transform hover:scale-105 duration-300 border border-[#2C3E50]">
          <FaTrophy className="text-4xl text-green-400  me-auto ms-auto" />
          <h3 className="text-lg font-semibold text-gray-300 mt-3">
            Teams Submitted
          </h3>
          <p className="text-2xl font-bold text-white">{firstlevelTeams.length}</p>
        </div>

        {/* Teams Not Submitted Card */}
        <div className="bg-[#1B2A41] p-6 rounded-xl text-center shadow-lg transition-transform transform hover:scale-105 duration-300 border border-[#2C3E50]">
          <FaStopwatch className="text-4xl text-red-400 me-auto ms-auto" />
          <h3 className="text-lg font-semibold text-gray-300 mt-3">
            Teams Not Submitted
          </h3>
          <p className="text-2xl font-bold text-white">{teams.length - firstlevelTeams.length}</p>
        </div>
      </div>

      {/* Start Button */}
      <button
        className="mt-8 bg-green-500 text-white text-lg px-6 py-3 rounded-lg shadow-md cursor-pointer
        hover:bg-green-600 transition-all transform hover:scale-105 duration-300"
      >
        Start
      </button>
    </div>
  );
};

export default LevelOne;
