import React, { useState } from 'react';
import { HiMenu, HiX, HiChevronDown } from 'react-icons/hi';
import { useTranslation } from 'react-i18next';
import logoImg from '../assets/Images/lifelinelogo.jpg';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const { t, i18n } = useTranslation();

  const navLinks = [
    { key: 'home', href: '/' },
    { key: 'bloodRequests', href: '/blood-requests' },
    { key: 'about', href: '/about' },
    { key: 'contact', href: '/contact' },
  ];

  const changeLanguage = (lng) => {
    localStorage.setItem('lng', lng);
    i18n.changeLanguage(lng);
    setMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md px-1 py-0 flex items-center justify-between z-50 border-b-4 border-red-600">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <a href="/admin-dashboard">
          <img
            src={logoImg}
            alt="LifeLine Logo"
            className="h-20 w-20 md:h-24 md:w-24 object-contain drop-shadow transition-transform duration-300 transform hover:scale-110"
          />
        </a>
      </div>

      {/* Desktop Navigation */}
      <ul className="hidden md:flex gap-20 text-gray-700 font-medium">
        {navLinks.filter(l => l.key !== 'about').map((link) => (
          <li key={link.key}>
            <a
              href={link.href}
              className="hover:text-red-600 transition-colors duration-300"
            >
              {t(link.key)}
            </a>
          </li>
        ))}
        {/* About dropdown */}
        <li className="relative">
          <button
            onClick={() => setAboutOpen(prev => !prev)}
            className="flex items-center gap-1 hover:text-red-600 transition-colors duration-300"
          >
            {t('about')} <HiChevronDown />
          </button>
          {aboutOpen && (
            <ul className="absolute left-0 mt-2 w-32 bg-white  rounded shadow-md z-50">
              <li>
                <a href="/about" className="block px-3 py-1 hover:bg-red-100">
                  {t('aboutus')}
                </a>
              </li>
              <li>
                <a href="/team" className="block px-3 py-1 hover:bg-red-100">
                  {t('Our Team')}
                </a>
              </li>
            </ul>
          )}
        </li>
      </ul>

      {/* Language Dropdown - Desktop */}
      <div className="hidden md:block relative ml-4">
        <button
          onClick={() => setLangOpen((prev) => !prev)}
          className=" px-3 py-1 rounded-md flex items-center gap-1 hover:text-red-500 font-semibold  text-gray-700"
        >
          {t('languages') || 'Languages'} <HiChevronDown />
        </button>
        {langOpen && (
          <ul className="absolute right-0 mt-2 w-28 bg-white rounded shadow-md z-50">
            {[
              { code: 'en', label: 'English' },
              { code: 'tw', label: 'Twi' },
              { code: 'fr', label: 'French' },
              { code: 'zh', label: 'Chinese' },
              { code: 'pt', label: 'Portuguese' },
            ].map((lng) => (
              <li key={lng.code}>
                <button
                  onClick={() => {
                    changeLanguage(lng.code);
                    setLangOpen(false);
                  }}
                  className="w-full text-left px-3 py-1 hover:bg-red-100"
                >
                  {lng.label}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Buttons - Desktop */}
      <div className="hidden md:flex gap-4 ml-4">
        <a href="/login">
          <button className="text-red-600 border border-red-600 px-3 py-1 rounded-md hover:bg-red-50 transition">
            {t('hospitalLogin')}
          </button>
        </a>
        <a href="/donate">
          <button className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 transition">
            {t('donateNow')}
          </button>
        </a>
      </div>

      {/* Hamburger Icon */}
      <div
        className="md:hidden text-3xl text-red-600"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <HiX /> : <HiMenu />}
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md z-50 flex flex-col items-start px-2 py-2 space-y-2 md:hidden">
          {navLinks.filter(l => l.key !== 'about').map((link) => (
            <a
              key={link.key}
              href={link.href}
              className="text-gray-700 hover:text-red-600 w-full"
              onClick={() => setMenuOpen(false)}
            >
              {t(link.key)}
            </a>
          ))}
          <a
            href="/about"
            className="text-gray-700 hover:text-red-600 w-full"
            onClick={() => setMenuOpen(false)}
          >
            {t('about')}
          </a>
          <a
            href="/team"
            className="text-gray-700 hover:text-red-600 w-full"
            onClick={() => setMenuOpen(false)}
          >
            {t('ourteam')}
          </a>

          {/* Language Dropdown - Mobile */}
          <div className="w-full">
            <button
              onClick={() => setLangOpen((prev) => !prev)}
              className="w-full border px-3 py-2 rounded-md flex justify-between items-center hover:bg-red-50"
            >
              {t('languages') || 'Languages'} <HiChevronDown />
            </button>
            {langOpen && (
              <ul className="mt-1 w-full border rounded bg-white shadow-sm">
                {[
                  { code: 'en', label: 'English' },
                  { code: 'fr', label: 'French' },
                  { code: 'zh', label: 'Chinese' },
                  { code: 'tw', label: 'Twi' },
                  { code: 'pt', label: 'Portuguese' },
                ].map((lng) => (
                  <li key={lng.code}>
                    <button
                      onClick={() => {
                        changeLanguage(lng.code);
                        setLangOpen(false);
                        setMenuOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 hover:bg-red-100"
                    >
                      {lng.label}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <a href="/login" onClick={() => setMenuOpen(false)}>
            <button className="w-full text-red-600 border border-red-600 px-3 py-1 rounded-md hover:bg-red-50 transition">
              {t('hospitalLogin')}
            </button>
          </a>
          <a href="/donate" onClick={() => setMenuOpen(false)}>
            <button className="w-full bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 transition">
              {t('donateNow')}
            </button>
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
