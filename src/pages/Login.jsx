import { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { login } from '../utils/auth';
import Logo from '../assets/logo.jpeg';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const result = login({ username, password });
      if (result.success) {
        const redirectTo = location.state?.from?.pathname || '/admin';
        navigate(redirectTo, { replace: true });
      } else {
        setError(result.message || 'Login gagal');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="w-full border-b bg-white">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center">
          <Link to="/" className="flex items-center space-x-2">
            <img src={Logo} alt="Home Vapor" className="h-10 w-10 object-contain" />
            <span className="font-semibold text-gray-900">Home Vapor</span>
          </Link>
        </div>
      </div>
      <div className="flex flex-1 items-center justify-center px-4">
        <div className="w-full max-w-md bg-white shadow rounded-lg p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Masuk Admin</h1>
          {error && (
            <div className="mb-4 p-3 rounded bg-red-50 text-red-700 text-sm">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="admin"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="admin123"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-60"
            >
              {loading ? 'Memproses...' : 'Masuk'}
            </button>
          </form>
          {/* <p className="text-xs text-gray-500 mt-4">Gunakan demo: admin / admin123</p> */}
        </div>
      </div>
    </div>
  );
};

export default Login;


