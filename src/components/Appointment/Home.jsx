import React, { useEffect, useState } from 'react';
import ActionPage from '../pages/ActionPage.jsx';
import { FaCalendarPlus } from 'react-icons/fa';
import { FaListCheck } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';

const BookAppointment = () => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

 useEffect(() => {
  const storedUsername = localStorage.getItem('username');
  if (storedUsername) {
    setUsername(storedUsername);
  }
}, []);

  return (
    <div className="min-h-screen bg-[#f9fcff]">
      <ActionPage />

      <div className="max-w-screen-lg mx-auto mt-12 px-6">
        <h1 className="text-4xl font-bold text-[#003366] mb-2">👋 Welcome, {username}</h1>
        <p className="text-lg text-gray-700 mb-10">
          What would you like to do today?
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Book Appointment Card */}
          <div className="bg-white shadow-md border border-gray-200 rounded-2xl p-6 hover:shadow-xl transition duration-300">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-[#003366]">Book Appointment</h2>
         <FaCalendarPlus 
  size={18} 
  className="text-[#0ecbf1] bg-[#e0f7ff] p-3 rounded-full w-14 h-14 shadow"
/>


            </div>
            <p className="text-gray-600 mb-6">
              Find a doctor and schedule your next visit with ease.
            </p>
            <button
              onClick={() => navigate('/book-appointment')}
              className="bg-[#0ecbf1] text-white px-5 py-2 rounded-xl font-medium hover:bg-[#08b3d8] transition duration-200"
            >
              Go to Book Appointment
            </button>
          </div>

          {/* My Appointments Card */}
          <div className="bg-white shadow-md border border-gray-200 rounded-2xl p-6 hover:shadow-xl transition duration-300">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-[#003366]">My Appointments</h2>
           <FaListCheck 
  size={20} 
  className="text-[#0ecbf1] bg-[#e0f7ff] p-3 rounded-full w-12 h-12 shadow"
/>


            </div>
            <p className="text-gray-600 mb-6">
              View, reschedule, or cancel your upcoming appointments.
            </p>
            <button
              onClick={() => navigate('/my-appointments')}
              className="bg-[#0ecbf1] text-white px-5 py-2 rounded-xl font-medium hover:bg-[#08b3d8] transition duration-200"
            >
              Go to My Appointments
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookAppointment;
