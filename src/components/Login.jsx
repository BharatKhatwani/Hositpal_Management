import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from './context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { token, login } = useAuth(); // ✅ Fix: destructure token & login

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // ✅ Fix: Correct useEffect syntax and dependency array
useEffect(() => {
  if (token) {
    const role = localStorage.getItem('userRole');
    if (role === 'doctor') {
      navigate('/doctor-dashboard', { replace: true });
    } else if (role === 'patient') {
      navigate('/patient-dashboard', { replace: true });
    }

  }
}, [token, navigate]);



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.username.trim()) newErrors.username = 'Username is required';
    if (!formData.password.trim()) newErrors.password = 'Password is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    try {
      const response = await fetch('https://hostipal-management-backend.onrender.com/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message || 'Login failed');

      // ✅ Use AuthContext login method to set token
      login( result.token);
      localStorage.setItem('userId', result.user.id);
      localStorage.setItem('userRole', result.user.role);
      localStorage.setItem('username', result.user.username);
      localStorage.setItem("specialization", result.user.specialization)

      toast.success('🎉 Login successful!', {
        position: 'top-right',
        autoClose: 3000,
        theme: 'dark',
        transition: Bounce,
      });

      if(result.user.role  == 'doctor'){
        navigate('/doctor-dashboard')
      }else if(result.user.role  == 'patient') {
        navigate('/patient-dashboard')
      }
else {
  navigate('/unauthorized'); // or a default page
}

      // setTimeout(() => navigate('/patient-dashboard'), 2500); // Wait for toast
    } catch (error) {
      toast.error(error.message || 'Something went wrong!', {
        position: 'top-right',
        autoClose: 3000,
        theme: 'colored',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <ToastContainer />

      <div className="min-h-screen flex items-center justify-center bg-[#f0f8ff] px-4">
        <div className="w-full max-w-md bg-white shadow-xl rounded-lg p-8 border border-gray-100">
          <h2 className="text-3xl font-bold text-center text-[#3399ff] mb-1">
            🔐 Login
          </h2>
          <p className="text-center text-[#7da7d9] mb-6 text-sm">
            Welcome back to HealthLink.
          </p>

          <form onSubmit={onSubmit} className="space-y-5">
            <div>
              <label className="block font-semibold mb-1">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your username"
                className="w-full px-4 py-2 border border-[#d9eaf7] rounded-md bg-[#eaf5ff] focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {errors.username && (
                <p className="text-red-500 text-sm">{errors.username}</p>
              )}
            </div>

            <div>
              <label className="block font-semibold mb-1">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full px-4 py-2 border border-[#d9eaf7] rounded-md bg-[#eaf5ff] focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#4daaff] hover:bg-[#3399ff] text-white font-semibold py-2 rounded transition cursor-pointer"
            >
              {isLoading ? 'Logging in...' : '🔓 Login'}
            </button>
          </form>

          <p className="text-center mt-6 text-sm text-gray-600">
            Don&apos;t have an account?{' '}
            <Link to="/signup" className="text-blue-600 hover:underline">
  Register here
</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
