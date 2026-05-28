import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiMail, FiLock, FiLogIn } from 'react-icons/fi';

const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState('admin@example.com');
  const [password, setPassword] = useState('admin');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const testCredentials = [
    { email: 'admin@example.com', password: 'admin', role: 'Admin' },
    { email: 'hr@example.com', password: 'hr123', role: 'HR' },
    { email: 'emp@example.com', password: 'emp123', role: 'Employee' },
  ];

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      const user = testCredentials.find(u => u.email === email && u.password === password);
      if (user) {
        localStorage.setItem('user', JSON.stringify({ email, role: user.role }));
        setIsAuthenticated(true);
        navigate('/dashboard');
      } else {
        setError('Invalid email or password');
      }
      setLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-10">
          {/* Logo/Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full mb-4">
              <FiLogIn className="text-white text-2xl" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800">HRMS</h1>
            <p className="text-gray-500 mt-2">Human Resource Management System</p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <div className="relative">
                <FiMail className="absolute left-3 top-3.5 text-gray-400" size={20} />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <div className="relative">
                <FiLock className="absolute left-3 top-3.5 text-gray-400" size={20} />
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  required
                />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white font-semibold py-3 rounded-lg transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? 'Logging in...' : <>
                <FiLogIn /> Login
              </>}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-4">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="text-gray-400 text-sm">Demo Credentials</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          {/* Demo Credentials */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-2 text-sm">
            {testCredentials.map((cred, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setEmail(cred.email);
                  setPassword(cred.password);
                  setError('');
                }}
                className="w-full text-left px-3 py-2 hover:bg-blue-100 rounded transition text-gray-700"
              >
                <div className="font-medium">{cred.role}</div>
                <div className="text-xs text-gray-500">{cred.email}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-blue-100 mt-6 text-sm">
          © 2024 HRMS. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Login;
