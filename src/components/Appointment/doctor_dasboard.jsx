import React, { useEffect, useState } from 'react';
import Doctor from '../pages/DoctorPage';
import { CiHome } from 'react-icons/ci';
import { FaCalendarPlus } from 'react-icons/fa';
import { FaListCheck } from 'react-icons/fa6';
import { FaChartLine, FaCalendarCheck } from 'react-icons/fa';
import { FaUserDoctor } from "react-icons/fa6";

const DoctorDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(true);

  // Function to categorize appointment dates
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else if (date > today) {
      return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
    } else {
      return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
    }
  };

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem('token');
        const doctorId = localStorage.getItem('userId');
        const storedName = localStorage.getItem('username');
        setUserName(storedName);

        const response = await fetch(
          `https://hostipal-management-backend.onrender.com/api/appointments/doctor/${doctorId}`,
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();
        setAppointments(data);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  // Group appointments by date category
  const groupedAppointments = appointments.reduce((acc, appt) => {
    const dateCategory = formatDate(appt.date);
    if (!acc[dateCategory]) {
      acc[dateCategory] = [];
    }
    acc[dateCategory].push(appt);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <Doctor />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h1 className="text-2xl font-bold text-[#003366] mb-2">
            Welcome Back, Dr. {userName}
          </h1>
          <p className="text-gray-600">
            Here's what's happening with your appointments today
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Total Appointments</h3>
                <p className="text-sm text-gray-500">Today</p>
              </div>
              <FaCalendarCheck className="text-3xl text-[#003366]" />
            </div>
            <h2 className="text-3xl font-bold text-[#003366]">{appointments.length}</h2>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Active Patients</h3>
                <p className="text-sm text-gray-500">Currently Assigned</p>
              </div>
              <FaUserDoctor className="text-3xl text-[#003366]" />
            </div>
            <h2 className="text-3xl font-bold text-[#003366]">{new Set(appointments.map(a => a.patientID._id)).size}</h2>
          </div>
        </div>

        {/* Appointments by Date */}
        {Object.entries(groupedAppointments).map(([date, appts]) => (
          <div key={date} className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-bold mb-4 text-[#003366]">{date}</h2>
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#003366]"></div>
              </div>
            ) : (
              <div className="space-y-4">
                {appts.length === 0 ? (
                  <p className="text-center text-gray-500">No appointments scheduled for {date.toLowerCase()}</p>
                ) : (
                  appts.map((appt, index) => (
                    <div key={index} className="border-b pb-4 last:border-0">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold text-xl">{appt.patientID.username}</h3>
                          <p className="text-sm text-gray-500">{appt.note}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-500">{new Date(appt.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                          <span className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded-full">Confirmed</span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        ))}
      </main>
    </div>
  );
};

export default DoctorDashboard;
