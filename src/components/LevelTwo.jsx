import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { FaUsers, FaTrophy, FaStopwatch } from "react-icons/fa";
const BACK_URL = import.meta.env.VITE_BACK_URL
const socket = io(BACK_URL);

const statements = [
    "2-bit comparator using single-bit comparator",
    "BCD adder using 4-bit binary adder",
    "3-bit synchronous up counter using JK flip-flop",
    "Build a seven segment display to count from 1 to 5 numbers using IC 7447"
];

const LevelTwo = ({ }) => {

    const [counts, setCounts] = useState([0, 0, 0, 0]);
    const [count, setCount] = useState(0);
    const [teams, setTeams] = useState([]);
    const [finishTime, setFinishTime] = useState("");
    const [secondLevelTeams, setSecondLevelTeams] = useState([]);
    const [cardCounts, setCardCounts] = useState([0, 0, 0, 0]);
    const [revealedCard, setRevealedCard] = useState(null);
    const [showLevelTwo, setShowLevelTwo] = useState(false);

    console.log(cardCounts);



    const handleReveal = (cardIndex) => {
        const statement = statements[cardIndex]; // Get the corresponding statement
        socket.emit("reveal_card", { statement }); // Send the statement instead of index
    };

    const handleResetReveal = () => {
        socket.emit("reset_revealed_card");
    };

    const handleDownload = (fileUrl, fileName) => {
        // Ensure file URL is valid
        if (!fileUrl) {
            console.error("File URL is missing");
            return;
        }
    
        // Modify the URL to force download from Cloudinary
        const modifiedUrl = fileUrl.replace("/upload/", "/upload/fl_attachment/");
    
        // Create an invisible link and trigger download
        const link = document.createElement("a");
        link.href = modifiedUrl;
        link.setAttribute("download", fileName || "downloaded_file"); 
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    
      



    useEffect(() => {
        socket.on("update_teams", (data) => {
            setTeams(data);
        });

        socket.on("update_secondlevel", (updatedTeams, finishTime) => {
            setSecondLevelTeams(updatedTeams);
            setFinishTime(finishTime)
        });

        console.log("from admin:",secondLevelTeams);

        const fetchStats = () => {
            fetch(`${BACK_URL}/team/getStats`)
                .then(res => res.json())
                .then(data => {
                    setCardCounts(data.cardCounts);
                })
                .catch(err => console.error("Error fetching admin stats:", err));
        };

        fetchStats(); // Initial fetch

        // Listen for real-time updates
        socket.on("update_click_counts", (updatedCounts) => {
            setCardCounts(updatedCounts);
        });

        socket.on("card_revealed", ({ cardIndex }) => {
            setRevealedCard(cardIndex);
        });

        socket.on("revealed_card_reset", () => {
            setRevealedCard(null);
        });

        const interval = setInterval(fetchStats, 5000);

        return () => {
            socket.off("update_teams");
            socket.off("update_secondlevel");
            socket.off("update_click_counts");
        };
    }, [teams]);

    const [level2Started, setLevel2Started] = useState(false);

    const toggleLevel2 = () => {
        const newState = !level2Started;
        setLevel2Started(newState);
        socket.emit("toggle_level2", newState);
    };

    console.log("finishTime", finishTime)

    const handleStartLevel = () => {
        const now = new Date();

        // Convert to 12-hour format with AM/PM
        const formattedTime = now.toLocaleString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: true
        });

        socket.emit("start_level", { startTime: formattedTime }); // Send to backend
    };



    return (
        <div className="w-full overflow-y-scroll min-h-screen bg-gradient-to-b from-[#0A192F] to-[#112240] p-6 flex flex-col items-center">
            <h2 className="text-4xl font-bold text-white mb-2 tracking-wide">
                🚀 <span className="text-blue-400">Level Two Dashboard</span>
            </h2>


            {/* Statements Cards */}
            <div className="w-full grid grid-cols-4 gap-6 mb-3 mt-10">
                {statements.map((statement, index) => (
                    <div key={index} className="relative flex flex-col items-center">
                        {/* Statement Card */}


                        <div className="bg-[#1B2A41] px-4 py-2 rounded-xl shadow-lg border border-[#2C3E50] text-center w-60 h-40 flex flex-col items-center justify-around">
                            <p className="text-yellow-300 text-lg font-bold">CARD-{index + 1}</p>
                            <p className="text-gray-300 text-md font-semibold">{statement}</p>
                        </div>

                        {/* Count & Button Below the Card */}
                        <div className="flex justify-center mt-2 items-center gap-10">
                            <p className="text-lg font-bold text-white mt-3">Count: {cardCounts[index]}</p>
                            <button
                                onClick={() => handleReveal(index)}
                                className="cursor-pointer mt-2 bg-blue-500 text-white px-4 py-2 font-bold rounded-lg shadow-md hover:bg-blue-600 transition-all"
                            >
                                Reveal
                            </button>
                        </div>

                    </div>
                ))}
            </div>

            <div className="flex justify-between items-center gap-20">
                <button onClick={toggleLevel2} className="cursor-pointer reset-button mt-8 font-semibold bg-green-500 text-white text-lg px-6 py-3 rounded-lg shadow-md 
                hover:bg-green-600 transition-all transform hover:scale-105 duration-300">
                    {level2Started ? "Display Off" : "Display On"}
                </button>

                {/* <button onClick={handleResetReveal} className="cursor-pointer reset-button mt-8 font-semibold bg-green-500 text-white text-lg px-6 py-3 rounded-lg shadow-md 
                // hover:bg-green-600 transition-all transform hover:scale-105 duration-300">
                     Reset Revealed Card
                </button> */}

                <button
                    onClick={handleStartLevel}
                    className="cursor-pointer mt-8 font-semibold bg-green-500 text-white text-lg px-6 py-3 rounded-lg shadow-md 
                hover:bg-green-600 transition-all transform hover:scale-105 duration-300"
                >
                    Start The Level
                </button>
            </div>




            {/* Stats Cards */}
            <div className="w-full grid grid-cols-3 gap-8 mt-8">
                <div className="bg-[#1B2A41] p-4 rounded-xl text-center shadow-lg transition-transform transform hover:scale-105 duration-300 border border-[#2C3E50]">
                    <FaUsers className="text-4xl text-yellow-400 ms-auto me-auto" />
                    <h3 className="text-lg font-semibold text-gray-300 mt-3">Registered Teams</h3>
                    <p className="text-2xl font-bold text-white">{teams.length}</p>
                </div>

                <div className="bg-[#1B2A41] p-4 rounded-xl text-center shadow-lg transition-transform transform hover:scale-105 duration-300 border border-[#2C3E50]">
                    <FaTrophy className="text-4xl text-green-400 ms-auto me-auto" />
                    <h3 className="text-lg font-semibold text-gray-300 mt-3">Teams Submitted</h3>
                    <p className="text-2xl font-bold text-white">{secondLevelTeams.length}</p>
                </div>

                <div className="bg-[#1B2A41] p-4 rounded-xl text-center shadow-lg transition-transform transform hover:scale-105 duration-300 border border-[#2C3E50]">
                    <FaStopwatch className="text-4xl ms-auto me-auto text-red-400" />
                    <h3 className="text-lg font-semibold text-gray-300 mt-3">Teams Not Submitted</h3>
                    <p className="text-2xl font-bold text-white">{teams.length - secondLevelTeams.length}</p>
                </div>
            </div>


            {/* Table */}
            <div className="w-full  mt-8">
                <h2 className="text-2xl text-center font-semibold text-white mb-4">📋 Level Two Submissions</h2>
                <table className="w-full border-collapse border border-gray-700 text-white">
                    <thead>
                        <tr className="bg-[#1B2A41] text-gray-300">
                            <th className="border border-gray-600 p-3">Team Number</th>

                            <th className="border border-gray-600 p-3">Member Name</th>
                            <th className="border border-gray-600 p-3">Registration ID</th>
                            <th className="border border-gray-600 p-3">Start Time</th>
                            <th className="border border-gray-600 p-3">Completion Time</th>
                            <th className="border border-gray-600 p-3">Uploaded File</th>
                        </tr>
                    </thead>
                    <tbody>
                        {secondLevelTeams.map((team, index) =>
                            team.members.map((member, memberIndex) => (
                                <tr key={`${index}-${memberIndex}`} className="text-center transition">
                                    {memberIndex === 0 && (
                                        <td rowSpan={team.members.length} className="border border-gray-600 p-3">{team.teamNumber}</td>
                                    )}

                                    <td className="border border-gray-600 p-3">{member.name}</td>
                                    <td className="border border-gray-600 p-3">{member.teckziteId}</td>
                                    {memberIndex === 0 && (
                                        <td rowSpan={team.members.length} className="border border-gray-600 p-3">
                                            {team.startedTime || "Not Started"}
                                        </td>
                                    )}
                                    {memberIndex === 0 && (
                                        <td rowSpan={team.members.length} className="border border-gray-600 p-3">{team.finishTime}</td>
                                    )}
                                    {memberIndex === 0 && (
                                             <td rowSpan={team.members.length}  className="border border-gray-600 p-3">
                                             {team.levelTwoFile ? (
                                           <button
                                           onClick={() => handleDownload(team.levelTwoFile, `Team_${team.teamNumber}_Submission`)}
                                           className="text-blue-400 underline cursor-pointer"
                                       >
                                           Download File
                                       </button>
                                             ) : (
                                                 "No file uploaded"
                                             )}
                                         </td>
                                    )}
                               
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default LevelTwo;

