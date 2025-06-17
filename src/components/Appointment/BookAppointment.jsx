import React, { useEffect, useState } from 'react';
import ActionPage from '../pages/ActionPage';
import { useAuth } from '../context/AuthContext';
import { ToastContainer, toast, Bounce } from 'react-toastify';

const BookAppointment = () => {
  const [doctors, setDoctors] = useState([]);
  const { token } = useAuth();

  const [selectedDate, setSelectedDate] = useState('');
  const [dateError, setDateError] = useState('');

  const [selectedTime, setSelectedTime] = useState('');
  const [timeError, setTimeError] = useState('');

// 

;
// const { doctorID, patientID, date, time, note } = req.body;
  const handleSubmit = async(e) => {
    e.preventDefault();

    // Get form values from state
    const doctorId = document.getElementById('doctor').value;
    const patientId = localStorage.getItem('userId');
    const date = selectedDate;
    const time = selectedTime;
    const note = document.querySelector('textarea').value;

    // Validate required fields
    if (!doctorId || !patientId || !date || !time) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      const response = await fetch('https://hostipal-management-backend.onrender.com/api/appointments/book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
           patientID: patientId,
          doctorID: doctorId,
         
          date: date,
          time: time,
          note: note
        })
      });

      const data = await response.json();
      console.log('Appointment Response:', data);

      if (!response.ok) {
        throw new Error(data.message || 'Failed to book appointment');
      }

      toast.success('Appointment booked successfully');
      setSelectedDate('');
      setSelectedTime('');
      document.querySelector('textarea').value = '';
      document.getElementById('doctor').value = '';

    } catch (error) {
      console.error('Error booking appointment:', error);
      toast.error(error.message || 'Error booking appointment. Please try again.');
    }
  }

  useEffect(() => {
    const fetchDoctors = async () => {
      console.log("token", token);
      try {
        if (!token) {
          console.error('No token found in AuthContext');
          return;
        }

        const response = await fetch(
          'https://hostipal-management-backend.onrender.com/api/appointments/doctors',
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          }
        );

        const data = await response.json();
        console.log('API Response:', data);

        if (response.ok) {
          setDoctors(data);
        } else {
          console.error('Failed to fetch doctors:', data.message || 'Unknown error');
        }
      } catch (error) {
        console.error('Error fetching doctors:', error.message);
      }
    };

    fetchDoctors();
  }, [token]);

  return (
    <>
<ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick={false}
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark"
transition={Bounce}
/>


    <div className="min-h-screen bg-[#f9fcff]">
      <ActionPage />

      <div className="max-w-xl mx-auto mt-12 p-8 bg-white rounded-xl shadow-md">
        <h1 className="text-2xl font-bold text-[#003366] mb-2">📅 Book an Appointment</h1>
        <p className="text-gray-600 mb-6">
          Fill in the details below to schedule your visit.
        </p>

        <form className="space-y-6">
          {/* Doctor Selection */}
          <div>
            <label className="block mb-1 text-gray-700 font-medium">Doctor</label>
            <select
              name="doctor"
              id="doctor"
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#0ecbf1]"
            >
              <option value="">Select a doctor</option>
              {doctors.map((doc) => (
                <option key={doc._id} value={doc._id}>
                  Dr. {doc.username} - {doc.specialization}
                </option>
              ))}
            </select>
          </div>

          {/* Date Picker */}
          <div>
            <label className="block mb-1 text-gray-700 font-medium">Date</label>
            <input
              type="date"
              id = 'date'
              className={`w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#0ecbf1] ${dateError ? 'border-red-500' : ''}`}
              min={new Date().toISOString().split('T')[0]}
              onChange={(e) => {
                const value = e.target.value;
                const selected = new Date(value);
                const today = new Date();

                // Set time to 00:00:00 for both to compare only date
                selected.setHours(0, 0, 0, 0);
                today.setHours(0, 0, 0, 0);

                if (selected < today) {
                  setDateError('Please select a future date');
                } else {
                  setDateError('');
                  setSelectedDate(value);
                }
              }}
              value={selectedDate}
            />
            {dateError && (
              <p className="text-red-500 text-sm mt-1">{dateError}</p>
            )}
          </div>

          {/* Time Slot */}
          <div>
  <label className="block mb-1 text-gray-700 font-medium">Time Slot</label>
  <select
    name="time"
    id="time"
    className={`w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#0ecbf1] ${timeError ? 'border-red-500' : ''}`}
    onChange={(e) => {
      const timeValue = e.target.value;

      if (!selectedDate) {
        setTimeError('Please select a date first');
        return;
      }

      const selectedDateObj = new Date(selectedDate);
      const [hours, minutes] = timeValue.split(':');
      selectedDateObj.setHours(parseInt(hours), parseInt(minutes), 0);

      const now = new Date();
      if (selectedDateObj < now) {
        setTimeError('Please select a time slot in the future');
      } else {
        setTimeError('');
        setSelectedTime(timeValue);
      }
    }}
    value={selectedTime}
    required
  >
    <option value="">Select a time</option>
    {[
      '09:00',
      '09:30',
      '10:00',
      '10:30',
      '11:00',
      '11:30',
      '13:00',
      '13:30',
      '14:00',
      '14:30',
      '15:00',
    ].map((slot) => (
      <option key={slot} value={slot}>
        {new Date(`1970-01-01T${slot}:00`).toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        })}
      </option>
    ))}
  </select>
  {timeError && (
    <p className="text-red-500 text-sm mt-1">{timeError}</p>
  )}
</div>

          {/* Notes */}
          <div>
            <label className="block mb-1 text-gray-700 font-medium">Notes (optional)</label>
            <textarea
            id = "notes"
              rows="4"
              placeholder="Any symptoms or details..."
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#0ecbf1]"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            onClick={handleSubmit}
            className="w-full bg-[#0ecbf1] text-white font-semibold py-2 px-4 rounded hover:bg-[#0bb5d4] transition cursor-pointer"
          >
            Book Appointment
          </button>
        </form>
      </div>
    </div>
    </>
    
  );
};

export default BookAppointment;
