import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => (
  <div className="sidebar">
    <h2>HRMS</h2>
    <nav>
      <Link to="/">Dashboard</Link>
      <Link to="/employees">Employees</Link>
      <Link to="/attendance">Attendance</Link>
      <Link to="/leave">Leave</Link>
      <Link to="/payroll">Payroll</Link>
      <Link to="/performance">Performance</Link>
      <Link to="/settings">Settings</Link>
    </nav>
  </div>
);

export default Sidebar;
