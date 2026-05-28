import React, { useState } from 'react';
import { FiDollarSign, FiDownload, FiCalendar, FiSearch } from 'react-icons/fi';

const Payroll = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().split('T')[0].substring(0, 7));
  const [searchTerm, setSearchTerm] = useState('');

  const [payrollData] = useState([
    {
      id: 1,
      name: 'John Doe',
      dept: 'IT',
      baseSalary: 95000,
      allowances: 15000,
      deductions: 5000,
      netSalary: 105000,
      status: 'Paid',
      paidDate: '2024-05-25',
    },
    {
      id: 2,
      name: 'Sarah Smith',
      dept: 'HR',
      baseSalary: 75000,
      allowances: 10000,
      deductions: 3500,
      netSalary: 81500,
      status: 'Paid',
      paidDate: '2024-05-25',
    },
    {
      id: 3,
      name: 'Mike Johnson',
      dept: 'Finance',
      baseSalary: 80000,
      allowances: 12000,
      deductions: 4200,
      netSalary: 87800,
      status: 'Pending',
      paidDate: '--',
    },
    {
      id: 4,
      name: 'Emma Davis',
      dept: 'Operations',
      baseSalary: 70000,
      allowances: 8000,
      deductions: 3500,
      netSalary: 74500,
      status: 'Paid',
      paidDate: '2024-05-25',
    },
    {
      id: 5,
      name: 'Alex Wilson',
      dept: 'Sales',
      baseSalary: 65000,
      allowances: 20000,
      deductions: 3500,
      netSalary: 81500,
      status: 'Paid',
      paidDate: '2024-05-25',
    },
    {
      id: 6,
      name: 'Rachel Green',
      dept: 'Marketing',
      baseSalary: 72000,
      allowances: 12000,
      deductions: 4000,
      netSalary: 80000,
      status: 'Pending',
      paidDate: '--',
    },
  ]);

  const filteredData = payrollData.filter(record =>
    record.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.dept.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
    totalSalary: payrollData.reduce((sum, r) => sum + r.netSalary, 0),
    totalAllowances: payrollData.reduce((sum, r) => sum + r.allowances, 0),
    totalDeductions: payrollData.reduce((sum, r) => sum + r.deductions, 0),
    paid: payrollData.filter(r => r.status === 'Paid').length,
    pending: payrollData.filter(r => r.status === 'Pending').length,
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(value);
  };

  return (
    <div className="p-8 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">Payroll Management</h1>
          <p className="text-gray-600 mt-1">Manage employee salaries and payments</p>
        </div>
        <div className="flex gap-3">
          <div className="flex items-center gap-2 bg-white px-4 py-3 rounded-lg border border-gray-300">
            <FiCalendar className="text-gray-400" />
            <input
              type="month"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="border-0 outline-none"
            />
          </div>
          <button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition">
            <FiDownload /> Export Report
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-xl p-6 shadow-md">
          <p className="text-gray-600 text-sm font-medium">Total Salary</p>
          <p className="text-2xl font-bold text-purple-600 mt-2">{formatCurrency(stats.totalSalary)}</p>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-xl p-6 shadow-md">
          <p className="text-gray-600 text-sm font-medium">Total Allowances</p>
          <p className="text-2xl font-bold text-green-600 mt-2">{formatCurrency(stats.totalAllowances)}</p>
        </div>

        <div className="bg-gradient-to-br from-red-50 to-red-100 border border-red-200 rounded-xl p-6 shadow-md">
          <p className="text-gray-600 text-sm font-medium">Total Deductions</p>
          <p className="text-2xl font-bold text-red-600 mt-2">{formatCurrency(stats.totalDeductions)}</p>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-6 shadow-md">
          <p className="text-gray-600 text-sm font-medium">Paid</p>
          <p className="text-2xl font-bold text-blue-600 mt-2">{stats.paid}</p>
        </div>

        <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 border border-yellow-200 rounded-xl p-6 shadow-md">
          <p className="text-gray-600 text-sm font-medium">Pending</p>
          <p className="text-2xl font-bold text-yellow-600 mt-2">{stats.pending}</p>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl p-6 shadow-md">
        <div className="relative">
          <FiSearch className="absolute left-3 top-3.5 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search by employee name or department..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Payroll Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100 border-b-2 border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-gray-700 font-semibold">Employee Name</th>
                <th className="px-6 py-4 text-left text-gray-700 font-semibold">Department</th>
                <th className="px-6 py-4 text-center text-gray-700 font-semibold">Base Salary</th>
                <th className="px-6 py-4 text-center text-gray-700 font-semibold">Allowances</th>
                <th className="px-6 py-4 text-center text-gray-700 font-semibold">Deductions</th>
                <th className="px-6 py-4 text-center text-gray-700 font-semibold">Net Salary</th>
                <th className="px-6 py-4 text-center text-gray-700 font-semibold">Status</th>
                <th className="px-6 py-4 text-center text-gray-700 font-semibold">Paid Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((record) => (
                <tr key={record.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                  <td className="px-6 py-4 font-medium text-gray-900">{record.name}</td>
                  <td className="px-6 py-4 text-gray-600">{record.dept}</td>
                  <td className="px-6 py-4 text-center text-gray-600">{formatCurrency(record.baseSalary)}</td>
                  <td className="px-6 py-4 text-center text-green-600 font-medium">{formatCurrency(record.allowances)}</td>
                  <td className="px-6 py-4 text-center text-red-600 font-medium">{formatCurrency(record.deductions)}</td>
                  <td className="px-6 py-4 text-center font-bold text-gray-900">{formatCurrency(record.netSalary)}</td>
                  <td className="px-6 py-4 text-center">
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                      record.status === 'Paid'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {record.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center text-gray-600">{record.paidDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payroll Summary Card */}
      <div className="bg-white rounded-xl p-6 shadow-md">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Payroll Summary</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="border-l-4 border-blue-600 pl-4 py-2">
            <p className="text-gray-600 text-sm">Total Employees</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">{payrollData.length}</p>
          </div>
          <div className="border-l-4 border-green-600 pl-4 py-2">
            <p className="text-gray-600 text-sm">Average Salary</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">{formatCurrency(stats.totalSalary / payrollData.length)}</p>
          </div>
          <div className="border-l-4 border-purple-600 pl-4 py-2">
            <p className="text-gray-600 text-sm">Month</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">{selectedMonth}</p>
          </div>
          <div className="border-l-4 border-orange-600 pl-4 py-2">
            <p className="text-gray-600 text-sm">Processing Status</p>
            <p className="text-xl font-bold text-orange-600 mt-1">{stats.pending > 0 ? 'In Progress' : 'Completed'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payroll;
