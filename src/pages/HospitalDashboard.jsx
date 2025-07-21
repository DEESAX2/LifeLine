import { useEffect, useState } from 'react';
import DashboardNav from "../components/DashboardNav";
import Sidebar from "../components/SideBar";
import CreateBloodRequestModal from "../components/CreateBloodRequestModal";
import DonorAppointments from "../components/DonorAppointments";
import RecentDonorResponseCard from "../components/RecentDonorResponseCard";
import { useNavigate } from "react-router";
import { Users, CalendarCheck, Activity} from 'lucide-react'; 

export default function HospitalDashboard() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentView, setCurrentView] = useState("dashboard");
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const response = await fetch('/api/v1/hospital/dashboard/stats', {
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        });
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

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
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

              {/* Total Donors */}
              <div className="bg-blue-500 border border-none rounded-md p-6 flex justify-between items-center shadow">
                <div>
                  <h2 className="text-md font-semibold text-white">Total Donors</h2>
                  {loading ? (
                    <p className="text-sm text-white mt-2">Loading...</p>
                  ) : (
                    <p className="text-2xl font-bold text-white mt-1">
                      {stats?.totalDonors > 0 ? stats.totalDonors : "No data"}
                    </p>
                  )}
                </div>
                <Users className="text-white w-8 h-8" />
              </div>

              {/* Pending Appointments */}
              <div className="bg-green-500 text-white border rounded-md p-6 flex justify-between items-center shadow">
                <div>
                  <h2 className="text-md font-semibold">Pending Appointments</h2>
                  {loading ? (
                    <p className="text-sm text-white mt-2">Loading...</p>
                  ) : (
                    <p className="text-2xl font-bold mt-1">
                      {stats?.pendingAppointments > 0 ? stats.pendingAppointments : "No data"}
                    </p>
                  )}
                </div>
                <CalendarCheck className="w-8 h-8" />
              </div>

              {/* Blood Requests */}
              <div className="bg-[#008080] border border-none rounded-md p-6 flex justify-between items-center shadow">
                <div>
                  <h2 className="text-md font-semibold text-white">Blood Requests</h2>
                  {loading ? (
                    <p className="text-sm text-white mt-2">Loading...</p>
                  ) : (
                    <p className="text-2xl font-bold mt-1 text-white">
                      {stats?.totalRequests > 0 ? stats.totalRequests : "No data"}
                    </p>
                  )}
                </div>
                <Activity className="text-white w-8 h-8" />
              </div>

            </div>
          )}

          {currentView === "appointments" && <DonorAppointments />}

          <div className="mt-6">
            <RecentDonorResponseCard />
          </div>
        </main>
      </div>

      {isCreateModalOpen && (
        <CreateBloodRequestModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onRequestCreated={() => console.log("Request created!")}
        />
      )}
    </div>
  );
}
