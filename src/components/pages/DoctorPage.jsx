import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CiHome } from 'react-icons/ci';
import { FaCalendarPlus } from 'react-icons/fa';
import { FaListCheck } from 'react-icons/fa6';

const DoctorPage = () => {
  const navigate = useNavigate();

  return (
    <nav className="bg-white border-b border-gray-200 shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between space-evenly items-center">
        <h1 className="text-2xl font-bold text-[#003366] flex items-center gap-2">
          <div  className="flex items-center gap-2 hover:text-blue-600 transition duration-200">
            🩺 HealthLink
          </div>
        </h1>

        <div className="flex gap-6 items-center text-gray-800 text-[16px] font-medium">
          
          
         
          <button
            onClick={() => {
              localStorage.clear();
              navigate('/login');
            }}
            className="px-4 py-2 rounded-md bg-red-100 text-red-600 font-semibold hover:bg-red-200 transition-all duration-200 cursor-pointer"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default DoctorPage;
