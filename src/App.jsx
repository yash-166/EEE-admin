import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Registrations from "./components/Registartions";
import LevelOne from "./components/LevelOne";
import LevelTwo from "./components/LevelTwo";
import { useState } from "react";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <Router>
    <div className="min-h-screen bg-[#0A192F] text-white flex max-h-[600px]">
      <Sidebar />
      <div className="flex-1 ps-4 flex flex-col items-center">
        <Routes>
          <Route path="/"  element={<Registrations />} />
          <Route path="/levelOne" element={<LevelOne  />} />
          <Route path="/levelTwo" element={<LevelTwo/>} />
        </Routes>
      </div>
    </div>
  </Router>
  );
}

export default App;




// import { BrowserRouter as Router, Route, Routes,Navigate } from "react-router-dom";
// import Registrations from "./components/Registartions";
// import LevelOne from "./components/LevelOne";
// import LevelTwo from "./components/LevelTwo";
// import { useState,useEffect } from "react";
// import Sidebar from "./components/Sidebar";
// import Login from "./components/Login";
// import Register from "./components/Register";

// function App() {

//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   useEffect(() => {
//     // Check if the user is already logged in
//     const token = localStorage.getItem("token");
//     if (token) {
//       setIsAuthenticated(true);
//     }
//   }, []);


//   const handleLogin = (token) => {
//     localStorage.setItem("token", token);
//     setIsAuthenticated(true);
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     setIsAuthenticated(false);
//   };


//   return (
//         <Router>
//       <div className="min-h-screen bg-[#0A192F] text-white flex max-h-[600px]">
//         {!isAuthenticated ? (
//           // If NOT logged in, show Login/Register pages centered
//           <div className="w-full flex justify-center items-center">
//             <Routes>
//               <Route path="/" element={<Login onLogin={handleLogin} />} />
//               <Route path="/register" element={<Register />} />
//               <Route path="*" element={<Navigate to="/" />} />
//             </Routes>
//           </div>
//         ) : (
//           // If logged in, show Sidebar + Admin Routes
//           <>
//             <Sidebar onLogout={handleLogout} />
//             <div className="flex-1 ps-4 flex flex-col items-center">
//               <Routes>
//                 <Route path="/admin" element={<Registrations />} />
//                 <Route path="/admin/levelOne" element={<LevelOne />} />
//                 <Route path="/admin/levelTwo" element={<LevelTwo />} />
//                 {/* <Route path="*" element={<Navigate to="/admin" />} /> */}
//               </Routes>
//             </div>
//           </>
//         )}
//       </div>
//     </Router>
//   );
// }

// export default App;
