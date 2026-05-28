import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiHome, FiUsers, FiCalendar, FiLogOut, FiDollarSign, FiTrendingUp, FiSettings, FiMenu, FiX, FiUser } from 'react-icons/fi';

const Sidebar = ({ onLogout }) => {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();

  const toggleSidebar = () => setIsOpen(!isOpen);

  const menuItems = [
    { path: '/dashboard', icon: FiHome, label: 'Dashboard' },
    { path: '/employees', icon: FiUsers, label: 'Employees' },
    { path: '/attendance', icon: FiCalendar, label: 'Attendance' },
    { path: '/leave', icon: FiUser, label: 'Leave' },
    { path: '/payroll', icon: FiDollarSign, label: 'Payroll' },
    { path: '/performance', icon: FiTrendingUp, label: 'Performance' },
    { path: '/settings', icon: FiSettings, label: 'Settings' },
  ];

  return (
    <div className={`${isOpen ? 'w-64' : 'w-20'} bg-gradient-to-b from-blue-900 to-blue-800 text-white h-screen transition-all duration-300 flex flex-col fixed left-0 top-0 shadow-lg`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-blue-700">
        {isOpen && <h1 className="text-2xl font-bold">HRMS</h1>}
        <button
          onClick={toggleSidebar}
          className="p-2 hover:bg-blue-700 rounded-lg transition-colors"
        >
          {isOpen ? <FiX size={20} /> : <FiMenu size={20} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4">
        <ul className="space-y-2">
          {menuItems.map(({ path, icon: Icon, label }) => (
            <li key={path}>
              <Link
                to={path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  location.pathname === path
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-blue-100 hover:bg-blue-700'
                }`}
              >
                <Icon size={20} />
                {isOpen && <span>{label}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-blue-700">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-red-600 hover:bg-red-700 transition-colors text-white font-medium"
        >
          <FiLogOut size={20} />
          {isOpen && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
