import React, { useState } from 'react';
import { FiUsers, FiCalendar, FiDollarSign, FiTrendingUp, FiClock, FiCheckCircle } from 'react-icons/fi';

const Dashboard = () => {
  const [user] = useState(() => JSON.parse(localStorage.getItem('user') || '{}'));

  const stats = [
    {
      title: 'Total Employees',
      value: '245',
      icon: FiUsers,
      color: 'blue',
      trend: '+12%',
      positive: true,
    },
    {
      title: 'Present Today',
      value: '210',
      icon: FiCheckCircle,
      color: 'green',
      trend: '+5%',
      positive: true,
    },
    {
      title: 'On Leave',
      value: '25',
      icon: FiCalendar,
      color: 'yellow',
      trend: '-3%',
      positive: false,
    },
    {
      title: 'Pending Approvals',
      value: '12',
      icon: FiClock,
      color: 'red',
      trend: '+8%',
      positive: false,
    },
  ];

  const recentActivities = [
    { id: 1, type: 'leave_request', message: 'John Doe requested 3 days leave', time: '2 hours ago' },
    { id: 2, type: 'attendance', message: 'Sarah Smith marked attendance for today', time: '30 mins ago' },
    { id: 3, type: 'salary', message: 'Monthly salary processed for 245 employees', time: '1 day ago' },
    { id: 4, type: 'performance', message: 'Q1 performance reviews completed', time: '2 days ago' },
    { id: 5, type: 'new_employee', message: 'Mike Johnson joined as Software Engineer', time: '3 days ago' },
  ];

  const departmentData = [
    { name: 'IT', employees: 45, average_salary: '$85,000' },
    { name: 'HR', employees: 12, average_salary: '$65,000' },
    { name: 'Finance', employees: 30, average_salary: '$75,000' },
    { name: 'Operations', employees: 58, average_salary: '$55,000' },
    { name: 'Sales', employees: 60, average_salary: '$70,000' },
    { name: 'Marketing', employees: 40, average_salary: '$68,000' },
  ];

  return (
    <div className="p-8 space-y-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome back, {user.role || 'User'}! 👋</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Today</p>
          <p className="text-2xl font-semibold text-gray-900">{new Date().toLocaleDateString()}</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          const colorClasses = {
            blue: 'bg-blue-50 border-blue-200 text-blue-600',
            green: 'bg-green-50 border-green-200 text-green-600',
            yellow: 'bg-yellow-50 border-yellow-200 text-yellow-600',
            red: 'bg-red-50 border-red-200 text-red-600',
          };

          return (
            <div
              key={idx}
              className={`${colorClasses[stat.color]} border rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-600 text-sm font-medium">{stat.title}</p>
                  <p className="text-3xl font-bold mt-2 text-gray-900">{stat.value}</p>
                </div>
                <Icon size={32} className="opacity-80" />
              </div>
              <p className={`text-sm mt-3 ${stat.positive ? 'text-green-600' : 'text-red-600'}`}>
                {stat.positive ? '📈' : '📉'} {stat.trend} from last month
              </p>
            </div>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activities */}
        <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-md">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Activities</h2>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-4 pb-4 border-b border-gray-200 last:border-0">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-lg">
                    {activity.type === 'leave_request' && '📋'}
                    {activity.type === 'attendance' && '✓'}
                    {activity.type === 'salary' && '💰'}
                    {activity.type === 'performance' && '⭐'}
                    {activity.type === 'new_employee' && '👤'}
                  </span>
                </div>
                <div className="flex-1">
                  <p className="text-gray-900 font-medium">{activity.message}</p>
                  <p className="text-gray-500 text-sm mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-white rounded-xl p-6 shadow-md">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Stats</h2>
          <div className="space-y-4">
            <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
              <p className="text-gray-600 text-sm">Attendance Rate</p>
              <p className="text-2xl font-bold text-blue-600 mt-1">85.7%</p>
              <div className="w-full bg-blue-200 rounded-full h-2 mt-3">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '85.7%' }}></div>
              </div>
            </div>
            <div className="p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
              <p className="text-gray-600 text-sm">Payroll Status</p>
              <p className="text-2xl font-bold text-green-600 mt-1">Completed</p>
              <p className="text-xs text-gray-600 mt-2">Last updated: 2 days ago</p>
            </div>
            <div className="p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg">
              <p className="text-gray-600 text-sm">Pending Tasks</p>
              <p className="text-2xl font-bold text-purple-600 mt-1">8</p>
              <p className="text-xs text-gray-600 mt-2">Require your attention</p>
            </div>
          </div>
        </div>
      </div>

      {/* Department Overview */}
      <div className="bg-white rounded-xl p-6 shadow-md">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Department Overview</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 text-gray-600 font-semibold">Department</th>
                <th className="text-center py-3 px-4 text-gray-600 font-semibold">Employees</th>
                <th className="text-center py-3 px-4 text-gray-600 font-semibold">Avg. Salary</th>
                <th className="text-center py-3 px-4 text-gray-600 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {departmentData.map((dept, idx) => (
                <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50 transition">
                  <td className="py-3 px-4 font-medium text-gray-900">{dept.name}</td>
                  <td className="py-3 px-4 text-center text-gray-600">{dept.employees}</td>
                  <td className="py-3 px-4 text-center text-gray-600">{dept.average_salary}</td>
                  <td className="py-3 px-4 text-center">
                    <span className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                      Active
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
