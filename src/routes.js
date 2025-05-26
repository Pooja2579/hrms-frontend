import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Employees from './pages/Employees';
import Attendance from './pages/Attendance';
import Leave from './pages/Leave';
import Payroll from './pages/Payroll';
import Performance from './pages/Performance';
import Settings from './pages/Settings';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Dashboard />} />
    <Route path="/employees" element={<Employees />} />
    <Route path="/attendance" element={<Attendance />} />
    <Route path="/leave" element={<Leave />} />
    <Route path="/payroll" element={<Payroll />} />
    <Route path="/performance" element={<Performance />} />
    <Route path="/settings" element={<Settings />} />
  </Routes>
);

export default AppRoutes;
