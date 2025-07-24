import { useEffect, useState } from 'react';
import { Hospital, Menu, Plus, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router';
import axios from 'axios';

export default function DashboardNav({
  setIsCreateModalOpen,
  handleLogout,
  sidebarOpen,
  setSidebarOpen
}) {
  const navigate = useNavigate();
  const [hospitalName, setHospitalName] = useState('Hospital');

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
        if (name) {
          setHospitalName(name);
        }
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
          onClick={() => setIsCreateModalOpen(true)}
          className="bg-white text-red-600 hover:bg-gray-100 text-sm lg:text-base px-4 py-2 rounded cursor-pointer"
        >
          <Plus className="w-4 h-4 mr-1 lg:mr-2 inline" />
          <span className="hidden sm:inline">New Request</span>
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
