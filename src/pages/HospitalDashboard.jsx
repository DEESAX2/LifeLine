import { useState } from 'react';
import DashboardNav from "../components/DashboardNav";
import Sidebar from "../components/SideBar";
import CreateBloodRequestModal from "../components/CreateBloodRequestModal";
import DonorAppointments from "../components/DonorAppointments";
import RecentDonorResponseCard from "../components/RecentDonorResponseCard";
import { useNavigate } from "react-router";
import DonorResponses from '../components/DonorResponses';

export default function HospitalDashboard() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentView, setCurrentView] = useState("dashboard");
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <DashboardNav
        setIsCreateModalOpen={setIsCreateModalOpen}
        handleLogout={handleLogout}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          currentView={currentView}
          setCurrentView={setCurrentView}
          sidebarOpen={sidebarOpen}
          navigate={navigate}
        />

        <main className="flex-1 p-6 overflow-y-auto bg-gray-50">
          <h1 className="text-2xl font-bold mb-4 capitalize">{currentView}</h1>
          
          {currentView === "dashboard" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <p className="text-gray-700">Welcome to the Hospital Dashboard!</p>
              </div>
              <RecentDonorResponseCard />
            </div>
          )}

          {currentView === "appointments" && <DonorAppointments />}
        </main>
      </div>

      {isCreateModalOpen && (
        <CreateBloodRequestModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onRequestCreated={() => console.log("Request created!")}
        />

        
      )}

      {/* <DonorResponses /> */}
    </div>
  );
}
