import React, { useState } from 'react';
import { FiCalendar, FiCheck, FiX, FiClock, FiSearch } from 'react-icons/fi';

const Attendance = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [searchTerm, setSearchTerm] = useState('');

  const [attendanceRecords] = useState([
    { id: 1, name: 'John Doe', checkIn: '09:00 AM', checkOut: '05:30 PM', status: 'Present', dept: 'IT' },
    { id: 2, name: 'Sarah Smith', checkIn: '08:45 AM', checkOut: '05:15 PM', status: 'Present', dept: 'HR' },
    { id: 3, name: 'Mike Johnson', checkIn: '--', checkOut: '--', status: 'Absent', dept: 'Finance' },
    { id: 4, name: 'Emma Davis', checkIn: '09:15 AM', checkOut: '--', status: 'Present', dept: 'Operations' },
    { id: 5, name: 'Alex Wilson', checkIn: '10:30 AM', checkOut: '06:00 PM', status: 'Late', dept: 'Sales' },
    { id: 6, name: 'Rachel Green', checkIn: '09:00 AM', checkOut: '01:00 PM', status: 'Half Day', dept: 'Marketing' },
  ]);

  const filteredRecords = attendanceRecords.filter(record =>
    record.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.dept.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
    present: attendanceRecords.filter(r => r.status === 'Present').length,
    absent: attendanceRecords.filter(r => r.status === 'Absent').length,
    late: attendanceRecords.filter(r => r.status === 'Late').length,
    halfDay: attendanceRecords.filter(r => r.status === 'Half Day').length,
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Present': return 'bg-green-100 text-green-700';
      case 'Absent': return 'bg-red-100 text-red-700';
      case 'Late': return 'bg-yellow-100 text-yellow-700';
      case 'Half Day': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'Present': return <FiCheck size={18} />;
      case 'Absent': return <FiX size={18} />;
      case 'Late': return <FiClock size={18} />;
      default: return null;
    }
  };

  return (
    <div className="p-8 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">Attendance</h1>
          <p className="text-gray-600 mt-1">Track and manage employee attendance</p>
        </div>
        <div className="flex items-center gap-2 bg-white px-4 py-3 rounded-lg border border-gray-300">
          <FiCalendar className="text-gray-400" />
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="border-0 outline-none"
          />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-xl p-6 shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Present</p>
              <p className="text-3xl font-bold text-green-600 mt-2">{stats.present}</p>
            </div>
            <FiCheck className="text-green-600" size={40} />
          </div>
        </div>

        <div className="bg-gradient-to-br from-red-50 to-red-100 border border-red-200 rounded-xl p-6 shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Absent</p>
              <p className="text-3xl font-bold text-red-600 mt-2">{stats.absent}</p>
            </div>
            <FiX className="text-red-600" size={40} />
          </div>
        </div>

        <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 border border-yellow-200 rounded-xl p-6 shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Late</p>
              <p className="text-3xl font-bold text-yellow-600 mt-2">{stats.late}</p>
            </div>
            <FiClock className="text-yellow-600" size={40} />
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-6 shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Half Day</p>
              <p className="text-3xl font-bold text-blue-600 mt-2">{stats.halfDay}</p>
            </div>
            <FiCalendar className="text-blue-600" size={40} />
          </div>
        </div>
      </div>

      {/* Search and Filter */}
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

      {/* Attendance Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100 border-b-2 border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-gray-700 font-semibold">Employee Name</th>
                <th className="px-6 py-4 text-left text-gray-700 font-semibold">Department</th>
                <th className="px-6 py-4 text-center text-gray-700 font-semibold">Check In</th>
                <th className="px-6 py-4 text-center text-gray-700 font-semibold">Check Out</th>
                <th className="px-6 py-4 text-center text-gray-700 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredRecords.map((record) => (
                <tr key={record.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                  <td className="px-6 py-4 font-medium text-gray-900">{record.name}</td>
                  <td className="px-6 py-4 text-gray-600">{record.dept}</td>
                  <td className="px-6 py-4 text-center text-gray-600">{record.checkIn}</td>
                  <td className="px-6 py-4 text-center text-gray-600">{record.checkOut}</td>
                  <td className="px-6 py-4 text-center">
                    <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(record.status)}`}>
                      {getStatusIcon(record.status)}
                      {record.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Monthly Chart Placeholder */}
      <div className="bg-white rounded-xl p-6 shadow-md">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Monthly Attendance Trend</h2>
        <div className="h-64 flex items-end justify-around gap-2 bg-gray-50 p-6 rounded-lg">
          {Array.from({ length: 12 }, (_, i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <div className="bg-blue-600 rounded-t-lg" style={{ height: `${Math.random() * 100 + 150}px`, width: '40px' }}></div>
              <p className="text-xs text-gray-600">{['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'][i]}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Attendance;
