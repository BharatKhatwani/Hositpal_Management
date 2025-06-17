import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-[#66c2ff] shadow-md py-3 px-6 flex justify-between items-center">
      <h1 className="text-xl font-bold text-[#003366] flex items-center gap-1">
        🩺 HealthLink
      </h1>
      <div className="space-x-4 flex gap-2">
        <Link
          to="/login"
          className="text-[#003366] hover:text-white flex items-center gap-1"
        >
          ↪️ Login
        </Link>
        <Link
          to="/signup"
          className="bg-[#ffb347] hover:bg-[#ffaa33] text-white px-3 py-1 rounded flex items-center gap-1  cusor-pointer"
        >
          👤 Register
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
