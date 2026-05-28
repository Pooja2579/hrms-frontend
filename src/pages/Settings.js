import React, { useState } from 'react';
import { FiSave, FiBell, FiLock, FiUser, FiDatabase, FiShield } from 'react-icons/fi';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [user] = useState(() => JSON.parse(localStorage.getItem('user') || '{}'));
  const [formData, setFormData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: user.email || 'admin@example.com',
    phone: '+1 (555) 123-4567',
    department: 'IT',
    position: 'Senior Manager',
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    attendanceReminder: true,
    leaveApproval: true,
    payrollAlert: true,
    performanceReview: true,
    systemUpdates: false,
  });

  const [security, setSecurity] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const tabs = [
    { id: 'profile', label: 'Profile', icon: FiUser },
    { id: 'notifications', label: 'Notifications', icon: FiBell },
    { id: 'security', label: 'Security', icon: FiLock },
    { id: 'data', label: 'Data', icon: FiDatabase },
  ];

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNotificationChange = (key) => {
    setNotifications({ ...notifications, [key]: !notifications[key] });
  };

  const handleSecurityChange = (e) => {
    const { name, value } = e.target;
    setSecurity({ ...security, [name]: value });
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-1">Manage your account and preferences</p>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-xl shadow-md mb-6">
        <div className="flex border-b border-gray-200">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 font-medium transition ${
                  activeTab === tab.id
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Icon size={20} />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Profile Tab */}
      {activeTab === 'profile' && (
        <div className="max-w-2xl">
          <div className="bg-white rounded-xl shadow-md p-8 space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Profile Information</h2>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleProfileChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleProfileChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleProfileChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleProfileChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleProfileChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Position</label>
                <input
                  type="text"
                  name="position"
                  value={formData.position}
                  onChange={handleProfileChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled
                />
              </div>
            </div>

            <div className="flex gap-4 pt-6">
              <button className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium transition">
                Cancel
              </button>
              <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition">
                <FiSave /> Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Notifications Tab */}
      {activeTab === 'notifications' && (
        <div className="max-w-2xl">
          <div className="bg-white rounded-xl shadow-md p-8 space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Notification Preferences</h2>

            {Object.entries(notifications).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
                <div>
                  <p className="font-medium text-gray-900">
                    {key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    {key === 'emailNotifications' && 'Receive email updates about your account'}
                    {key === 'attendanceReminder' && 'Get reminded to mark your attendance'}
                    {key === 'leaveApproval' && 'Notifications about leave approval status'}
                    {key === 'payrollAlert' && 'Alerts about payroll processing'}
                    {key === 'performanceReview' && 'Updates about performance reviews'}
                    {key === 'systemUpdates' && 'System maintenance and updates'}
                  </p>
                </div>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={() => handleNotificationChange(key)}
                    className="w-5 h-5"
                  />
                </label>
              </div>
            ))}

            <div className="flex gap-4 pt-6">
              <button className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium transition">
                Reset to Default
              </button>
              <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition">
                <FiSave /> Save Preferences
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Security Tab */}
      {activeTab === 'security' && (
        <div className="max-w-2xl">
          <div className="bg-white rounded-xl shadow-md p-8 space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Security Settings</h2>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-blue-800">
                <strong>Last password change:</strong> March 15, 2024
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
              <input
                type="password"
                name="currentPassword"
                value={security.currentPassword}
                onChange={handleSecurityChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
              <input
                type="password"
                name="newPassword"
                value={security.newPassword}
                onChange={handleSecurityChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={security.confirmPassword}
                onChange={handleSecurityChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex gap-3">
                <FiShield className="text-yellow-600 flex-shrink-0 mt-1" size={20} />
                <div>
                  <p className="text-sm font-medium text-yellow-900">Password Requirements:</p>
                  <ul className="text-xs text-yellow-800 mt-2 space-y-1 ml-4 list-disc">
                    <li>At least 8 characters long</li>
                    <li>Contains uppercase and lowercase letters</li>
                    <li>Contains numbers and special characters</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex gap-4 pt-6">
              <button className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium transition">
                Cancel
              </button>
              <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition">
                <FiSave /> Update Password
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Data Tab */}
      {activeTab === 'data' && (
        <div className="max-w-2xl">
          <div className="bg-white rounded-xl shadow-md p-8 space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Data & Privacy</h2>

            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-2">Download Your Data</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Get a copy of all your personal data stored in the system in a portable format.
                </p>
                <button className="px-6 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 font-medium transition">
                  Download Data
                </button>
              </div>

              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-2">Delete Your Account</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Permanently delete your account and all associated data. This action cannot be undone.
                </p>
                <button className="px-6 py-2 border border-red-600 text-red-600 rounded-lg hover:bg-red-50 font-medium transition">
                  Delete Account
                </button>
              </div>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <p className="text-xs text-gray-600">
                <strong>Last data backup:</strong> May 27, 2024 at 11:30 PM
              </p>
              <p className="text-xs text-gray-600 mt-2">
                <strong>Account created:</strong> January 15, 2022
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
