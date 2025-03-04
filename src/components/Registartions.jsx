import React, { useState,useEffect } from "react";
import { io } from "socket.io-client";
import { FaUsers, FaTrophy, FaStopwatch } from "react-icons/fa";
const BACK_URL = import.meta.env.VITE_BACK_URL
const socket = io(BACK_URL);

const Registrations = () => {
  const [count,setCount] = useState(0);
  const [teams,setTeams] = useState([]);

  console.log(teams)

  useEffect(() => {
    socket.on("update_teams", (data) => {
        setTeams(data);
    });

    return () => {
        socket.off("update_teams");
    };
}, []);


  return (
    <div className="w-full max-w-6xl max-h-[700px] overflow-y-scroll bg-gradient-to-b from-[#0A192F] to-[#112240]  p-6">
      <h2 className="text-3xl font-bold mb-6 text-white text-center tracking-wider">
        📋 <span className="text-blue-400 drop-shadow-lg">Registrations</span>
      </h2>

      <div className="bg-[#1B2A41] p-6 w-75 mb-7 ms-auto me-auto rounded-xl text-center shadow-lg transition-transform transform hover:scale-105 duration-300 border border-[#2C3E50]">
                <FaTrophy className="text-4xl text-green-400  me-auto ms-auto" />
                <h3 className="text-lg font-semibold text-gray-300 mt-3">
                 No of Teams Registered
                </h3>
                <p className="text-2xl font-bold text-white">{teams.length}</p>
              </div>

      <div className="overflow-x-auto">


        <table className="w-full border-collapse border border-gray-600">
  <thead>
    <tr className=" bg-[#1B2A41]">
      <th className="border border-gray-600 p-2 py-3">Team Number</th>
      <th className="border border-gray-600 p-2 py-3">Member Name</th>
      <th className="border border-gray-600 p-2 py-3">Registration ID</th>
    </tr>
  </thead>
  <tbody>
    {teams.map((team, index) => (
      team.members.map((member, memberIndex) => (
        <tr key={`${index}-${memberIndex}`} className="text-center">
          {memberIndex === 0 && (
            <td rowSpan={team.members.length} className="border border-gray-600 p-2">{team.teamNumber}</td>
          )}
          
          <td className="border border-gray-600 p-2 py-3">{member.name}</td>
          <td className="border border-gray-600 p-2">{member.teckziteId}</td>
        </tr>
      ))
    ))}
  </tbody>
</table>
      </div>
    </div>
  );
};

export default Registrations;
