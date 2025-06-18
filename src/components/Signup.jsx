import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from './Navbar';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from './context/AuthContext';

const Signup = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    role: '',
    specialization: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    localStorage.setItem('lastVisitedPage', window.location.pathname);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.username.trim()) newErrors.username = 'Username is required';
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (!formData.role) newErrors.role = 'Please select a role';
    if (formData.role === 'doctor' && !formData.specialization.trim()) {
      newErrors.specialization = 'Specialization is required for doctors';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    try {
      const response = await fetch('https://hostipal-management-backend.onrender.com/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message || 'Registration failed');

      signup(result.token);
      localStorage.setItem('token', result.token);
      localStorage.setItem('userId', result.user.id);
      localStorage.setItem('userRole', result.user.role);
      localStorage.setItem('username', result.user.username);

      toast.success('🎉 Registered successfully!', {
        position: 'top-right',
        autoClose: 3000,
        theme: 'dark',
        transition: Bounce,
      });

      // setTimeout(() => navigate('/patient-dashboard'), 2500);
      if(formData.role == 'doctor'){
        setTimeout(() => navigate('/doctor-dashboard'), 2500);
      }
      else if(formData.role == 'patient'){
        setTimeout(() =>navigate('/patient-dashboard'),2500);
      }
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
      <div className="min-h-screen flex items-center justify-center bg-[#e5f3ff] px-4">
        <div className="w-full max-w-md bg-white shadow-xl rounded-lg p-8 border border-gray-100">
          <h2 className="text-3xl font-bold text-center text-[#3399ff] mb-4">
            👤 Create Account
          </h2>

          <form onSubmit={onSubmit} className="space-y-5">
            <div>
              <label className="block font-semibold mb-1">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md bg-[#eaf5ff]"
              />
              {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
            </div>

            <div>
              <label className="block font-semibold mb-1">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md bg-[#eaf5ff]"
              />
              {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            </div>

            <div>
              <label className="block font-semibold mb-1">I am a...</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md bg-[#eaf5ff]"
              >
                <option value="">Select your role</option>
                <option value="patient">Patient</option>
                <option value="doctor">Doctor</option>
              </select>
              {errors.role && <p className="text-red-500 text-sm">{errors.role}</p>}
            </div>

            {formData.role === 'doctor' && (
              <div>
                <label className="block font-semibold mb-1">Specialization</label>
                <select
                  name="specialization"
                  value={formData.specialization}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md bg-[#eaf5ff]"
                >
                  <option value="">Select specialization</option>
                  <option value="Cardiology">Cardiology</option>
                  <option value="Dermatology">Dermatology</option>
                  <option value="Gastroenterology">Gastroenterology</option>
                  <option value="Neurology">Neurology</option>
                  <option value="Orthopedics">Orthopedics</option>
                  <option value="Pediatrics">Pediatrics</option>
                  <option value="Psychiatry">Psychiatry</option>
                  <option value="Oncology">Oncology</option>
                  <option value="Radiology">Radiology</option>
                  <option value="Surgery">Surgery</option>
                </select>
                {errors.specialization && (
                  <p className="text-red-500 text-sm">{errors.specialization}</p>
                )}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#4daaff] text-white font-semibold py-2 rounded hover:bg-[#3399ff]"
            >
              {isLoading ? 'Registering...' : '➕ Register'}
            </button>
          </form>

          <p className="text-center mt-6 text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600 hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Signup;
