import React, { useState } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiSearch, FiFilter, FiDownload } from 'react-icons/fi';

const Employees = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDept, setFilterDept] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', dept: 'IT', salary: '', position: '' });

  const [employees, setEmployees] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', dept: 'IT', position: 'Senior Developer', salary: '$95,000', status: 'Active', joinDate: '2022-01-15' },
    { id: 2, name: 'Sarah Smith', email: 'sarah@example.com', dept: 'HR', position: 'HR Manager', salary: '$75,000', status: 'Active', joinDate: '2021-03-20' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', dept: 'Finance', position: 'Financial Analyst', salary: '$80,000', status: 'Active', joinDate: '2022-06-10' },
    { id: 4, name: 'Emma Davis', email: 'emma@example.com', dept: 'Operations', position: 'Operations Lead', salary: '$70,000', status: 'Active', joinDate: '2021-11-05' },
    { id: 5, name: 'Alex Wilson', email: 'alex@example.com', dept: 'Sales', position: 'Sales Executive', salary: '$65,000', status: 'Active', joinDate: '2023-02-01' },
    { id: 6, name: 'Rachel Green', email: 'rachel@example.com', dept: 'Marketing', position: 'Marketing Manager', salary: '$72,000', status: 'Active', joinDate: '2022-04-18' },
  ]);

  const departments = ['All', 'IT', 'HR', 'Finance', 'Operations', 'Sales', 'Marketing'];

  const filteredEmployees = employees.filter(emp => {
    const matchesSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         emp.position.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = filterDept === 'All' || emp.dept === filterDept;
    return matchesSearch && matchesDept;
  });

  const handleAddEmployee = () => {
    if (formData.name && formData.email && formData.salary && formData.position) {
      const newEmployee = {
        id: employees.length + 1,
        ...formData,
        status: 'Active',
        joinDate: new Date().toISOString().split('T')[0],
        salary: `$${formData.salary}`,
      };
      setEmployees([...employees, newEmployee]);
      setFormData({ name: '', email: '', dept: 'IT', salary: '', position: '' });
      setShowModal(false);
    }
  };

  const handleDeleteEmployee = (id) => {
    setEmployees(employees.filter(emp => emp.id !== id));
  };

  return (
    <div className="p-8 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">Employees</h1>
          <p className="text-gray-600 mt-1">Manage and view employee information</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition"
        >
          <FiPlus /> Add Employee
        </button>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl p-6 shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <FiSearch className="absolute left-3 top-3.5 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by name, email, or position..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="relative flex items-center gap-2">
            <FiFilter size={20} className="text-gray-400" />
            <select
              value={filterDept}
              onChange={(e) => setFilterDept(e.target.value)}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>
          <button className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium transition">
            <FiDownload /> Export
          </button>
        </div>
        <p className="text-sm text-gray-600 mt-4">
          Showing <strong>{filteredEmployees.length}</strong> of <strong>{employees.length}</strong> employees
        </p>
      </div>

      {/* Employees Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100 border-b-2 border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-gray-700 font-semibold">Name</th>
                <th className="px-6 py-4 text-left text-gray-700 font-semibold">Email</th>
                <th className="px-6 py-4 text-left text-gray-700 font-semibold">Department</th>
                <th className="px-6 py-4 text-left text-gray-700 font-semibold">Position</th>
                <th className="px-6 py-4 text-left text-gray-700 font-semibold">Salary</th>
                <th className="px-6 py-4 text-left text-gray-700 font-semibold">Join Date</th>
                <th className="px-6 py-4 text-center text-gray-700 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map((employee) => (
                <tr key={employee.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                  <td className="px-6 py-4 font-medium text-gray-900">{employee.name}</td>
                  <td className="px-6 py-4 text-gray-600">{employee.email}</td>
                  <td className="px-6 py-4">
                    <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                      {employee.dept}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{employee.position}</td>
                  <td className="px-6 py-4 font-semibold text-gray-900">{employee.salary}</td>
                  <td className="px-6 py-4 text-gray-600">{employee.joinDate}</td>
                  <td className="px-6 py-4 flex justify-center gap-3">
                    <button className="p-2 hover:bg-blue-100 text-blue-600 rounded-lg transition">
                      <FiEdit2 size={18} />
                    </button>
                    <button
                      onClick={() => handleDeleteEmployee(employee.id)}
                      className="p-2 hover:bg-red-100 text-red-600 rounded-lg transition"
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Employee Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Add New Employee</h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Position"
                value={formData.position}
                onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <select
                value={formData.dept}
                onChange={(e) => setFormData({ ...formData, dept: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {departments.slice(1).map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
              <input
                type="number"
                placeholder="Salary"
                value={formData.salary}
                onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="flex gap-4 pt-4">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddEmployee}
                  className="flex-1 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition"
                >
                  Add Employee
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Employees;
