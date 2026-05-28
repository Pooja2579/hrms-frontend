import React, { useState } from 'react';
import { FiStar, FiTrendingUp, FiSearch, FiMessageCircle } from 'react-icons/fi';

const Performance = () => {
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);

  const [performanceData] = useState([
    {
      id: 1,
      name: 'John Doe',
      dept: 'IT',
      position: 'Senior Developer',
      overall: 4.5,
      productivity: 4.7,
      quality: 4.3,
      teamwork: 4.4,
      communication: 4.2,
      lastReview: '2024-04-15',
      reviewer: 'Manager Name',
      status: 'Excellent',
    },
    {
      id: 2,
      name: 'Sarah Smith',
      dept: 'HR',
      position: 'HR Manager',
      overall: 4.2,
      productivity: 4.1,
      quality: 4.3,
      teamwork: 4.5,
      communication: 4.3,
      lastReview: '2024-04-12',
      reviewer: 'Director Name',
      status: 'Good',
    },
    {
      id: 3,
      name: 'Mike Johnson',
      dept: 'Finance',
      position: 'Financial Analyst',
      overall: 3.8,
      productivity: 3.9,
      quality: 4.0,
      teamwork: 3.5,
      communication: 3.7,
      lastReview: '2024-04-18',
      reviewer: 'Manager Name',
      status: 'Average',
    },
    {
      id: 4,
      name: 'Emma Davis',
      dept: 'Operations',
      position: 'Operations Lead',
      overall: 4.6,
      productivity: 4.8,
      quality: 4.6,
      teamwork: 4.7,
      communication: 4.4,
      lastReview: '2024-04-10',
      reviewer: 'Director Name',
      status: 'Excellent',
    },
    {
      id: 5,
      name: 'Alex Wilson',
      dept: 'Sales',
      position: 'Sales Executive',
      overall: 4.0,
      productivity: 4.2,
      quality: 3.9,
      teamwork: 4.0,
      communication: 4.1,
      lastReview: '2024-04-14',
      reviewer: 'Manager Name',
      status: 'Good',
    },
    {
      id: 6,
      name: 'Rachel Green',
      dept: 'Marketing',
      position: 'Marketing Manager',
      overall: 4.4,
      productivity: 4.5,
      quality: 4.4,
      teamwork: 4.3,
      communication: 4.6,
      lastReview: '2024-04-16',
      reviewer: 'Director Name',
      status: 'Excellent',
    },
  ]);

  const filteredData = performanceData.filter(emp =>
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.dept.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch(status) {
      case 'Excellent': return 'bg-green-100 text-green-700';
      case 'Good': return 'bg-blue-100 text-blue-700';
      case 'Average': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getRatingColor = (rating) => {
    if (rating >= 4.5) return 'text-green-600';
    if (rating >= 4) return 'text-blue-600';
    if (rating >= 3.5) return 'text-yellow-600';
    return 'text-red-600';
  };

  const StarRating = ({ rating }) => (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => (
        <FiStar
          key={i}
          size={16}
          className={i < Math.floor(rating) ? 'fill-current text-yellow-400' : 'text-gray-300'}
        />
      ))}
      <span className={`ml-2 font-semibold ${getRatingColor(rating)}`}>{rating.toFixed(1)}</span>
    </div>
  );

  return (
    <div className="p-8 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">Performance Management</h1>
          <p className="text-gray-600 mt-1">Track and evaluate employee performance</p>
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

      {/* Performance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredData.map((emp) => (
          <div key={emp.id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-6">
            <div className="mb-4">
              <h3 className="text-xl font-bold text-gray-900">{emp.name}</h3>
              <p className="text-sm text-gray-600">{emp.position}</p>
              <p className="text-xs text-gray-500 mt-1">{emp.dept}</p>
            </div>

            <div className="mb-4 pb-4 border-b-2 border-gray-200">
              <div className="flex items-center justify-between">
                <span className="text-gray-600 font-medium">Overall Rating</span>
                <span className={`text-2xl font-bold ${getRatingColor(emp.overall)}`}>
                  {emp.overall.toFixed(1)}/5
                </span>
              </div>
              <StarRating rating={emp.overall} />
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Productivity</span>
                <StarRating rating={emp.productivity} />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Quality</span>
                <StarRating rating={emp.quality} />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Teamwork</span>
                <StarRating rating={emp.teamwork} />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Communication</span>
                <StarRating rating={emp.communication} />
              </div>
            </div>

            <div className="pb-4 border-b-2 border-gray-200 mb-4">
              <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(emp.status)}`}>
                {emp.status}
              </span>
            </div>

            <div className="text-xs text-gray-500 mb-4">
              <p>Last Review: {emp.lastReview}</p>
              <p>Reviewed by: {emp.reviewer}</p>
            </div>

            <button
              onClick={() => {
                setSelectedEmployee(emp);
                setShowFeedbackModal(true);
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg font-medium transition"
            >
              <FiMessageCircle size={18} /> Give Feedback
            </button>
          </div>
        ))}
      </div>

      {/* Performance Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100 border-b-2 border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-gray-700 font-semibold">Employee Name</th>
                <th className="px-6 py-4 text-left text-gray-700 font-semibold">Department</th>
                <th className="px-6 py-4 text-center text-gray-700 font-semibold">Overall</th>
                <th className="px-6 py-4 text-center text-gray-700 font-semibold">Productivity</th>
                <th className="px-6 py-4 text-center text-gray-700 font-semibold">Quality</th>
                <th className="px-6 py-4 text-center text-gray-700 font-semibold">Teamwork</th>
                <th className="px-6 py-4 text-center text-gray-700 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((emp) => (
                <tr key={emp.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                  <td className="px-6 py-4 font-medium text-gray-900">{emp.name}</td>
                  <td className="px-6 py-4 text-gray-600">{emp.dept}</td>
                  <td className="px-6 py-4 text-center">
                    <span className={`font-bold ${getRatingColor(emp.overall)}`}>{emp.overall.toFixed(1)}</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`font-semibold ${getRatingColor(emp.productivity)}`}>{emp.productivity.toFixed(1)}</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`font-semibold ${getRatingColor(emp.quality)}`}>{emp.quality.toFixed(1)}</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`font-semibold ${getRatingColor(emp.teamwork)}`}>{emp.teamwork.toFixed(1)}</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(emp.status)}`}>
                      {emp.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Feedback Modal */}
      {showFeedbackModal && selectedEmployee && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Give Feedback</h2>
            <p className="text-gray-600 mb-6">For: <strong>{selectedEmployee.name}</strong></p>
            <div className="space-y-4">
              <textarea
                placeholder="Enter your feedback..."
                rows="5"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Rating (1-5)</label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Select rating</option>
                  <option>5 - Excellent</option>
                  <option>4 - Good</option>
                  <option>3 - Average</option>
                  <option>2 - Fair</option>
                  <option>1 - Poor</option>
                </select>
              </div>
              <div className="flex gap-4 pt-4">
                <button
                  onClick={() => setShowFeedbackModal(false)}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium transition"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowFeedbackModal(false)}
                  className="flex-1 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Performance;
