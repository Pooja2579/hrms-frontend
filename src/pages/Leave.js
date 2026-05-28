import React, { useState } from 'react';
import { FiPlus, FiCheckCircle, FiClock, FiXCircle, FiSearch } from 'react-icons/fi';

const Leave = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ startDate: '', endDate: '', reason: '', type: 'Sick Leave' });

  const [leaveRequests, setLeaveRequests] = useState([
    { id: 1, name: 'John Doe', type: 'Sick Leave', startDate: '2024-05-28', endDate: '2024-05-28', days: 1, reason: 'Medical appointment', status: 'Approved', requestedOn: '2024-05-25' },
    { id: 2, name: 'Sarah Smith', type: 'Vacation', startDate: '2024-06-01', endDate: '2024-06-10', days: 10, reason: 'Summer vacation', status: 'Pending', requestedOn: '2024-05-20' },
    { id: 3, name: 'Mike Johnson', type: 'Personal Leave', startDate: '2024-05-30', endDate: '2024-05-31', days: 2, reason: 'Personal work', status: 'Approved', requestedOn: '2024-05-22' },
    { id: 4, name: 'Emma Davis', type: 'Casual Leave', startDate: '2024-06-15', endDate: '2024-06-15', days: 1, reason: 'Family work', status: 'Pending', requestedOn: '2024-05-26' },
    { id: 5, name: 'Alex Wilson', type: 'Sick Leave', startDate: '2024-05-20', endDate: '2024-05-21', days: 2, reason: 'Fever', status: 'Rejected', requestedOn: '2024-05-19' },
  ]);

  const leaveTypes = ['Sick Leave', 'Vacation', 'Personal Leave', 'Casual Leave', 'Maternity Leave'];

  const leaveBalance = {
    'Sick Leave': 10,
    'Vacation': 20,
    'Personal Leave': 5,
    'Casual Leave': 8,
    'Maternity Leave': 90,
  };

  const filteredRequests = leaveRequests.filter(request =>
    request.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    request.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
    approved: leaveRequests.filter(r => r.status === 'Approved').length,
    pending: leaveRequests.filter(r => r.status === 'Pending').length,
    rejected: leaveRequests.filter(r => r.status === 'Rejected').length,
  };

  const handleRequestLeave = () => {
    if (formData.startDate && formData.endDate && formData.reason) {
      const start = new Date(formData.startDate);
      const end = new Date(formData.endDate);
      const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;

      const newRequest = {
        id: leaveRequests.length + 1,
        name: 'Current User',
        type: formData.type,
        startDate: formData.startDate,
        endDate: formData.endDate,
        days,
        reason: formData.reason,
        status: 'Pending',
        requestedOn: new Date().toISOString().split('T')[0],
      };

      setLeaveRequests([...leaveRequests, newRequest]);
      setFormData({ startDate: '', endDate: '', reason: '', type: 'Sick Leave' });
      setShowModal(false);
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Approved': return 'bg-green-100 text-green-700 border-green-300';
      case 'Pending': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'Rejected': return 'bg-red-100 text-red-700 border-red-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'Approved': return <FiCheckCircle />;
      case 'Pending': return <FiClock />;
      case 'Rejected': return <FiXCircle />;
      default: return null;
    }
  };

  return (
    <div className="p-8 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">Leave Management</h1>
          <p className="text-gray-600 mt-1">Request and manage employee leave</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition"
        >
          <FiPlus /> Request Leave
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-xl p-6 shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Approved</p>
              <p className="text-3xl font-bold text-green-600 mt-2">{stats.approved}</p>
            </div>
            <FiCheckCircle className="text-green-600" size={40} />
          </div>
        </div>

        <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 border border-yellow-200 rounded-xl p-6 shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Pending</p>
              <p className="text-3xl font-bold text-yellow-600 mt-2">{stats.pending}</p>
            </div>
            <FiClock className="text-yellow-600" size={40} />
          </div>
        </div>

        <div className="bg-gradient-to-br from-red-50 to-red-100 border border-red-200 rounded-xl p-6 shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Rejected</p>
              <p className="text-3xl font-bold text-red-600 mt-2">{stats.rejected}</p>
            </div>
            <FiXCircle className="text-red-600" size={40} />
          </div>
        </div>
      </div>

      {/* Leave Balance */}
      <div className="bg-white rounded-xl p-6 shadow-md">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Your Leave Balance</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {Object.entries(leaveBalance).map(([type, balance]) => (
            <div key={type} className="border border-gray-200 rounded-lg p-4 text-center hover:shadow-md transition">
              <p className="text-sm text-gray-600 font-medium">{type}</p>
              <p className="text-2xl font-bold text-blue-600 mt-2">{balance}</p>
              <p className="text-xs text-gray-500 mt-1">days available</p>
            </div>
          ))}
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl p-6 shadow-md">
        <div className="relative">
          <FiSearch className="absolute left-3 top-3.5 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search by employee name or leave type..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Leave Requests Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100 border-b-2 border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-gray-700 font-semibold">Employee</th>
                <th className="px-6 py-4 text-left text-gray-700 font-semibold">Leave Type</th>
                <th className="px-6 py-4 text-center text-gray-700 font-semibold">From - To</th>
                <th className="px-6 py-4 text-center text-gray-700 font-semibold">Days</th>
                <th className="px-6 py-4 text-left text-gray-700 font-semibold">Reason</th>
                <th className="px-6 py-4 text-center text-gray-700 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests.map((request) => (
                <tr key={request.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                  <td className="px-6 py-4 font-medium text-gray-900">{request.name}</td>
                  <td className="px-6 py-4 text-gray-600">{request.type}</td>
                  <td className="px-6 py-4 text-center text-gray-600 text-sm">
                    {request.startDate} to {request.endDate}
                  </td>
                  <td className="px-6 py-4 text-center font-semibold text-gray-900">{request.days}</td>
                  <td className="px-6 py-4 text-gray-600 text-sm">{request.reason}</td>
                  <td className="px-6 py-4 text-center">
                    <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(request.status)}`}>
                      {getStatusIcon(request.status)}
                      {request.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Request Leave Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Request Leave</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Leave Type</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {leaveTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                <input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                <input
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Reason</label>
                <textarea
                  value={formData.reason}
                  onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                  placeholder="Enter reason for leave..."
                  rows="3"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>
              <div className="flex gap-4 pt-4">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleRequestLeave}
                  className="flex-1 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition"
                >
                  Request
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Leave;
 