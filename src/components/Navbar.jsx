import React, { useState } from 'react';
import { HiMenu, HiX } from 'react-icons/hi';
import logoImg from '../assets/Images/lifelinelogo.jpg';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Blood Requests', href: '/blood-requests' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md px-1 py-0 flex items-center justify-between z-50">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <a href="/admin-dashboard">
          <img src={logoImg} alt="LifeLine Logo" className="h-20 w-20 md:h-24 md:w-24 object-contain drop-shadow transition-transform duration-300 transform hover:scale-110" />
        </a>
      </div>

      {/* Desktop Navigation */}
      <ul className="hidden md:flex gap-8 text-gray-700 font-medium">
        {navLinks.map((link) => (
          <li key={link.name}>
            <a
              href={link.href}
              className="hover:text-red-600 transition-colors duration-300"
            >
              {link.name}
            </a>
          </li>
        ))}
      </ul>

      {/* Buttons - Desktop */}
      <div className="hidden md:flex gap-4">
        <a href="/login">
          <button className="text-red-600 border border-red-600 px-4 py-2 rounded-md hover:bg-red-50 transition">
            Hospital Login
          </button>
        </a>
        <a href="/donate">
          <button className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition">
            Donate Now
          </button>
        </a>
      </div>

      {/* Hamburger Icon */}
      <div className="md:hidden text-3xl text-red-600" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <HiX /> : <HiMenu />}
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md z-50 flex flex-col items-start px-2 py-  2 space-y-2 md:hidden">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-gray-700 hover:text-red-600 w-full"
              onClick={() => setMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <a href="/login" onClick={() => setMenuOpen(false)}>
            <button className="w-full text-red-600 border border-red-600 px-4 py-2 rounded-md hover:bg-red-50 transition">
              Hospital Login
            </button>
          </a>
          <a href="/donate" onClick={() => setMenuOpen(false)}>
            <button className="w-full bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition">
              Donate Now
            </button>
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
