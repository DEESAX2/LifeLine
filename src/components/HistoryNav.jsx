import { useEffect, useState } from 'react';
import { Hospital, Menu, ArrowLeft, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function HistoryNav() {
  const navigate = useNavigate();
  const [hospitalName, setHospitalName] = useState('Hospital');
  const [isApproved, setIsApproved] = useState(false); 

  const handleLogout = () => {
    localStorage.removeItem("ACCESS_TOKEN");
    toast.success("Logged out successfully");
  };

  const logoutAndRedirect = () => {
    handleLogout();
    navigate('/');
  };

  useEffect(() => {
    const fetchHospitalProfile = async () => {
      try {
        const token = localStorage.getItem('ACCESS_TOKEN');
        const response = await axios.get(
          'https://lifeline-api-w5wc.onrender.com/api/v1/hospital/profile',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const name = response.data?.name;
        const approved = response.data?.isApproved;

        if (name) setHospitalName(name);
        if (typeof approved === 'boolean') setIsApproved(approved);

        console.log("Hospital profile response:", response.data);

      } catch (error) {
        console.error('Error fetching hospital profile:', error);
      }
    };

    fetchHospitalProfile();
  }, []);

  return (
    <nav className="bg-red-500 p-4 text-white flex justify-between items-center shadow-lg">
      <div className="flex items-center gap-4">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="lg:hidden hover:bg-red-600 p-2 rounded-lg transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>
        <div className="flex items-center space-x-2">
          <Hospital className="w-6 h-6 text-white" />
          <span className="text-xl lg:text-2xl font-bold">
            {hospitalName}
          </span>
        </div>
      </div>

      <div className="flex items-center space-x-2 lg:space-x-4">
        <button
          onClick={() => navigate('/hospital-dashboard')} 
          className="text-sm lg:text-base px-4 py-2 rounded cursor-pointer flex items-center bg-white text-red-600 hover:bg-gray-100"
        >
          <ArrowLeft className="w-4 h-4 mr-1 lg:mr-2 inline" />
          <span className="hidden sm:inline">Back to Dashboard</span>
          <span className="sm:hidden">New</span>
        </button>

        <button
          onClick={logoutAndRedirect}
          className="border border-white text-white hover:bg-red-700 text-sm lg:text-base px-4 py-2 rounded cursor-pointer"
        >
          <LogOut className="w-4 h-4 mr-1 lg:mr-2 inline" />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </nav>
  );
}
