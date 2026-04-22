import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import AppLayout from "./layouts/AppLayout";
import Dashboard from "./pages/Dashboard";
import Attendance from "./pages/Attendance";
import Exam from "./pages/Exam";
import UserManagement from "./pages/UserManagement";
import AttendanceRecap from "./pages/AttendanceRecap";

export default function App() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = (userData: any) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={user ? <Navigate to="/app" /> : <LoginPage onLogin={handleLogin} />} />
        
        <Route path="/app" element={user ? <AppLayout user={user} onLogout={handleLogout} /> : <Navigate to="/login" />}>
          <Route index element={<Dashboard user={user} />} />
          <Route path="attendance" element={<Attendance user={user} />} />
          <Route path="attendance/recap" element={<AttendanceRecap user={user} />} />
          <Route path="exam" element={<Exam user={user} />} />
          <Route path="users" element={<UserManagement user={user} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
