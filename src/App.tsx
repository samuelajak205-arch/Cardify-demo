import React, { useState, useEffect } from "react";
import { HashRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { RoleProvider, useRole } from "./context/RoleContext";
import { useTheme } from "./context/ThemeContext";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import LoadingSpinner from "./components/LoadingSpinner";

// Placeholder dashboards until specific Steps (5 to 9) populate them
import AdminDashboard from "./components/AdminDashboard";
import StudentDashboard from "./components/StudentDashboard";
import TeacherDashboard from "./components/TeacherDashboard";
import BurserDashboard from "./components/BurserDashboard";
import ParentDashboard from "./components/ParentDashboard";

// Inner application wrapper that handles the active state layout
function AppContent() {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const [isPageLoading, setIsPageLoading] = useState(false);

  useEffect(() => {
    setIsPageLoading(true);
    const timer = setTimeout(() => {
      setIsPageLoading(false);
    }, 450);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <>
      {isPageLoading && <LoadingSpinner />}
      <Routes>
        {/* 1. Root / Login Page */}
        <Route path="/" element={<Login />} />

        {/* 2. Admin Dashboards */}
        <Route path="/admin/*" element={
          <Layout darkMode={theme === "dark"} setDarkMode={toggleTheme}>
            <AdminDashboard />
          </Layout>
        } />

        {/* 3. Student Dashboards */}
        <Route path="/student/*" element={
          <Layout darkMode={theme === "dark"} setDarkMode={toggleTheme}>
            <StudentDashboard />
          </Layout>
        } />

        {/* 4. Teacher Dashboards */}
        <Route path="/teacher/*" element={
          <Layout darkMode={theme === "dark"} setDarkMode={toggleTheme}>
            <TeacherDashboard />
          </Layout>
        } />

        {/* 5. Burser (Finance) Dashboards */}
        <Route path="/finance/*" element={
          <Layout darkMode={theme === "dark"} setDarkMode={toggleTheme}>
            <BurserDashboard />
          </Layout>
        } />

        {/* 6. Parent Dashboards */}
        <Route path="/parent/*" element={
          <Layout darkMode={theme === "dark"} setDarkMode={toggleTheme}>
            <ParentDashboard />
          </Layout>
        } />

        {/* 7. Fallback redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <RoleProvider>
      <Router>
        <AppContent />
      </Router>
    </RoleProvider>
  );
}
