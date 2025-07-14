import lifelinelogo from "../assets/Images/lifelinelogo.jpg"
import { HospitalIcon } from "lucide-react";
import { HomeIcon } from "lucide-react";
import { Clock } from "lucide-react";
import { PlusIcon } from "lucide-react";
import { Menu } from "lucide-react";
import { LogOutIcon } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import RequestModal from "./RequestModal";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const [showModal, setShowModal] = useState(false);


  return (
    <nav className="w-full bg-white shadow-xl  top-0 left-0 z-50">
      <div className="h-16 px-4 md:px-10 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <img src={lifelinelogo} alt="logo" className="w-20 h-20" />
          <HospitalIcon className="w-6 h-6 text-blue-700" />
          <h1 className="font-bold text-lg">My Dashboard</h1>
        </div>

        <div className="hidden md:flex gap-4 items-center">
         <Link to={"/"}> <NavButton icon={<HomeIcon className="w-4 h-4" />} text="Back to Home" /></Link>
         <Link to={"/donor-history"}> <NavButton icon={<Clock className="w-4 h-4" />} text="Donor History" bg="bg-[#15803D] text-white" /></Link>
          <NavButton icon={<PlusIcon className="w-4 h-4" />} text="New Blood Request" bg="bg-red-700 text-white" 
          onClick={() =>setShowModal(true)} />
         <Link to={"/"}> <NavButton icon={<LogOutIcon className="w-4 h-4" />} text="Logout" /></Link> 
        </div>

        {/* Hamburger Menu */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            <Menu className="w-6 h-6 text-black" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md z-40 flex flex-col items-start px-4 py-4 space-y-3 md:hidden">
         <Link to={"/"}> <NavButton icon={<HomeIcon className="w-4 h-4" />} text="Back to Home" fullWidth /></Link>
          <Link to={"/donor-history"}> <NavButton icon={<Clock className="w-4 h-4" />} text="Donor History" bg="bg-[#15803D] text-white" fullWidth /></Link> 
          <NavButton icon={<PlusIcon className="w-4 h-4" />} text="New Blood Request" bg="bg-red-700 text-white" fullWidth onClick={() =>setShowModal(true)} />
          <Link to={"/"}><NavButton icon={<LogOutIcon className="w-4 h-4" />} text="Logout" fullWidth /> </Link>
        </div>
      )}

      {showModal && <RequestModal onClose={() => setShowModal(false)} />}
    </nav>
  );
}

function NavButton({ icon, text, bg = "", fullWidth = false, onClick }) {
  return (
    <button
    onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md cursor-pointer text-sm ${bg} ${
        fullWidth ? "w-full justify-start" : ""
      }`}
    >
      {icon}
      {text}
    </button>
  );
}