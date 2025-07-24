import React, { useState } from 'react';
import { HiMenu, HiX, HiChevronDown } from 'react-icons/hi';
import { useTranslation } from 'react-i18next';
import logoImg from '../assets/Images/lifelinelogo.jpg';

const BrqNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const { t, i18n } = useTranslation();

  const navLinks = [
    { key: 'home', href: '/' },
    { key: 'about', href: '/about' },
    { key: 'contact', href: '/contact' },
  ];

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md px-4 py-2 flex items-center justify-between z-50">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <a href="/">
          <img
            src={logoImg}
            alt="LifeLine Logo"
            className="h-20 w-20 md:h-24 md:w-24 object-contain drop-shadow transition-transform duration-300 transform hover:scale-110"
          />
        </a>
      </div>

      {/* Desktop Navigation - Centered Links */}
      <div className="hidden md:flex flex-1 justify-center gap-20 text-gray-700 font-medium">
        {navLinks.map((link) => (
          <a
            key={link.key}
            href={link.href}
            className="hover:text-red-600 transition-colors duration-300"
          >
            {t(link.key)}
          </a>
        ))}
      </div>

      {/* Language & Donate Buttons - Desktop */}
      <div className="hidden md:flex items-center gap-4">
        <div className="relative">
          <button
            onClick={() => setLangOpen((prev) => !prev)}
            className="border px-3 py-1 rounded-md flex items-center gap-1 hover:bg-red-50"
          >
            {t('languages') || 'Languages'} <HiChevronDown />
          </button>
          {langOpen && (
            <ul className="absolute right-0 mt-2 w-28 bg-white border rounded shadow-md z-50">
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

        <a href="/donate">
          <button className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 transition">
            {t('donateNow')}
          </button>
        </a>
      </div>

      {/* Hamburger Icon - Mobile */}
      <div
        className="md:hidden text-3xl text-red-600"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <HiX /> : <HiMenu />}
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md z-50 flex flex-col items-start px-4 py-4 space-y-3 md:hidden">
          {navLinks.map((link) => (
            <a
              key={link.key}
              href={link.href}
              className="text-gray-700 hover:text-red-600 w-full"
              onClick={() => setMenuOpen(false)}
            >
              {t(link.key)}
            </a>
          ))}

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

export default BrqNavbar;
