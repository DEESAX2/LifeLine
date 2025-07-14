import lifelinelogo from "../assets/Images/lifelinelogo.jpg"
import { HospitalIcon } from "lucide-react";
import { Link } from "react-router";
import { ArrowLeftIcon } from "lucide-react";

export default function Navbar() {



    return (
        <nav className="w-full bg-white shadow-xl  top-0 left-0 z-50">
            <div className="h-16 px-4 md:px-10 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <img src={lifelinelogo} alt="logo" className="w-20 h-20" />
                    <HospitalIcon className="w-6 h-6 text-blue-700" />
                    <h1 className="font-bold text-lg">Donor History</h1>
                </div>

                <div className="md:flex gap-4 items-center">
                    <Link to="/user-dashboard"> <NavButton icon={ArrowLeftIcon} text="Back to Dashboard" /></Link>
                </div>

            </div>
        </nav>
    );
}

function NavButton({ icon: Icon, text, bg = "", fullWidth = false, onClick }) {
    return (
        <button
            onClick={onClick}
            className={`flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md cursor-pointer text-sm ${bg} ${fullWidth ? "w-full justify-start" : ""
                }`}
        >
            {Icon && <Icon className="w-4 h-4" />}
            {text}
        </button>
    );
}