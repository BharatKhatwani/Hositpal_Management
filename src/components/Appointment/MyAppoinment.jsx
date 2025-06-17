import React, { useEffect, useState } from 'react';
import ActionPage from '../pages/ActionPage';
import { FaCalendarAlt, FaClock, FaUserMd, FaNotesMedical, FaBan } from 'react-icons/fa';
import { toast, ToastContainer, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MyAppointment = () => {
  const [appointments, setAppointments] = useState([]);

  const handleCancel = async (id) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(
        `https://hostipal-management-backend.onrender.com/api/appointments/cancel/${id}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to cancel appointment');
      }

      toast.success('Appointment Cancelled');
      setAppointments((prev) => prev.filter((appt) => appt._id !== id)); // Update list
    } catch (error) {
      console.error("Error cancelling appointment:", error);
      toast.error("Error in cancelling appointment");
    }
  };

  useEffect(() => {
    const fetchAppointments = async () => {
      const token = localStorage.getItem('token');
      const patientId = localStorage.getItem('userId');

      try {
        const response = await fetch(
          `https://hostipal-management-backend.onrender.com/api/appointments/patient/${patientId}`,
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
        console.error('Failed to fetch appointments:', error);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        theme="dark"
        transition={Bounce}
      />

      <div className="min-h-screen bg-[#f9fcff] flex flex-col w-full overflow-y-scroll scrollbar-hide">
        <ActionPage />

        <div className="flex-grow">
          <div className="mt-8 bg-white p-8 mx-4 sm:mx-16">
            <h1 className="text-3xl font-bold text-[#003366]">Your Appointments</h1>
            <p className="mt-2 text-gray-600">
              Here is a list of your upcoming and past appointments.
            </p>

            <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {appointments.length > 0 ? (
                appointments.map((appt, index) => (
                  <li
                    key={index}
                    className="bg-white rounded-xl shadow-md p-6 border border-gray-200 hover:shadow-lg transition"
                  >
                    <h2 className="text-xl font-semibold text-[#003366] mb-1">
                      Appointment with Dr. {appt.doctorID?.username || 'N/A'}
                    </h2>
                    <p className="text-sm mb-3">
                      <span className="font-medium text-gray-600">Status:</span>{' '}
                      <span className="text-green-600 font-semibold">Booked</span>
                    </p>

                    <div className="text-gray-700 space-y-2 text-sm">
                      <p className="flex items-center gap-2">
                        <FaCalendarAlt className="text-[#0ecbf1]" />
                        <span>
                          Date:{' '}
                          {new Date(appt.date).toLocaleDateString(undefined, {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </span>
                      </p>
                      <p className="flex items-center gap-2">
                        <FaClock className="text-[#0ecbf1]" />
                        <span>Time: {appt.time}</span>
                      </p>
                      <p className="flex items-center gap-2">
                        <FaUserMd className="text-[#0ecbf1]" />
                        <span>Doctor: Dr. {appt.doctorID?.username || 'N/A'}</span>
                      </p>
                      <p className="flex items-start gap-2">
                        <FaNotesMedical className="text-[#0ecbf1] mt-1" />
                        <span>
                          <strong>Notes:</strong> {appt.note || 'No notes provided'}
                        </span>
                      </p>
                    </div>

                    <button
                      className="mt-5 w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded flex items-center justify-center gap-2 transition cursor-pointer"
                      onClick={() => handleCancel(appt._id)}
                    >
                      <FaBan /> Cancel Appointment
                    </button>
                  </li>
                ))
              ) : <li className="col-span-full">
  <div className="bg-[#e6f7ff] border border-[#0ecbf1] text-[black] px-6 py-4 rounded-lg flex items-start gap-3 max-w-3xl">
    <svg className="text-2xl mt-1" xmlns="http://www.w3.org/2000/svg" height="1.5em" viewBox="0 0 512 512" fill="#0ecbf1">
      <path d="M152 64c13.3 0 24-10.7 24-24V24a24 24 0 1 0-48 0v16c0 13.3 10.7 24 24 24zm208-24a24 24 0 1 0-48 0v16a24 24 0 1 0 48 0V40zM64 128v48H448V128c0-17.7-14.3-32-32-32H96c-17.7 0-32 14.3-32 32zM448 208H64V400c0 26.5 21.5 48 48 48H400c26.5 0 48-21.5 48-48V208zM192 304c0 13.3-10.7 24-24 24s-24-10.7-24-24 10.7-24 24-24 24 10.7 24 24zm80 0c0 13.3-10.7 24-24 24s-24-10.7-24-24 10.7-24 24-24 24 10.7 24 24zm80 0c0 13.3-10.7 24-24 24s-24-10.7-24-24 10.7-24 24-24 24 10.7 24 24z"/>
    </svg>
    <div>
      <h3 className="text-lg font-semibold">No Appointments Found</h3>
      <p className="text-sm">
        You currently have no upcoming appointments. You can book a new one from the Book Appoinment.
      </p>
    </div>
  </div>
</li>
}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyAppointment;
