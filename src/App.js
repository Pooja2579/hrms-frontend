import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Employees from './pages/Employees';
import Attendance from './pages/Attendance';
import Leave from './pages/Leave';
import Payroll from './pages/Payroll';
import Performance from './pages/Performance';
import Settings from './pages/Settings';
import Login from './pages/Login';
import PrivateRoute from './PrivateRoute';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('user') !== null;
  });

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div className="flex bg-gray-50 min-h-screen">
        {isAuthenticated && <Sidebar onLogout={handleLogout} />}
        <div className={`flex-1 ${isAuthenticated ? 'ml-64' : 'w-full'}`}>
          <Routes>
            <Route
              path="/login"
              element={
                isAuthenticated ? (
                  <Navigate to="/dashboard" />
                ) : (
                  <Login setIsAuthenticated={setIsAuthenticated} />
                )
              }
            />
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute isAuthenticated={isAuthenticated}>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/employees"
              element={
                <PrivateRoute isAuthenticated={isAuthenticated}>
                  <Employees />
                </PrivateRoute>
              }
            />
            <Route
              path="/attendance"
              element={
                <PrivateRoute isAuthenticated={isAuthenticated}>
                  <Attendance />
                </PrivateRoute>
              }
            />
            <Route
              path="/leave"
              element={
                <PrivateRoute isAuthenticated={isAuthenticated}>
                  <Leave />
                </PrivateRoute>
              }
            />
            <Route
              path="/payroll"
              element={
                <PrivateRoute isAuthenticated={isAuthenticated}>
                  <Payroll />
                </PrivateRoute>
              }
            />
            <Route
              path="/performance"
              element={
                <PrivateRoute isAuthenticated={isAuthenticated}>
                  <Performance />
                </PrivateRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <PrivateRoute isAuthenticated={isAuthenticated}>
                  <Settings />
                </PrivateRoute>
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
