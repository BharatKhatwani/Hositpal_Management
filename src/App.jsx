import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login'; // Example: Add more routes as needed
import { AuthProvider } from './components/context/AuthContext';
import ActionPage from './components/pages/ActionPage';
import Home from './components/Appointment/Home';
import BookAppointment from './components/Appointment/BookAppointment';

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
      <Routes>

        <Route path="/" element={<Signup />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} /> 
        {/* <Route path = '/home' element = {<ActionPage/>}></Route> */}
        <Route path = '/home' element = {<Home/>}></Route>
        <Route path='/book-appointment' element = {<BookAppointment/>}></Route>
      </Routes>
    </BrowserRouter>

     </AuthProvider>
    
  );
};

export default App;
