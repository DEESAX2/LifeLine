import { useEffect, useState } from 'react';
import axios from 'axios';
import DashboardNav from "../components/DashboardNav";
import Sidebar from "../components/SideBar";
import CreateBloodRequestModal from "../components/CreateBloodRequestModal";
import { useNavigate } from "react-router";
import { Users, CalendarCheck, Activity } from 'lucide-react';
import DonorCard from '../components/DonorCard';
import DonorResponses from '../components/DonorResponses';

export default function HospitalDashboard() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentView, setCurrentView] = useState("dashboard");
  const [stats, setStats] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [search, setSearch] = useState("");
  const [loadingStats, setLoadingStats] = useState(true);
  const [loadingAppointments, setLoadingAppointments] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => navigate('/');

  useEffect(() => {
    const token = localStorage.getItem('ACCESS_TOKEN');

    const fetchStats = async () => {
      try {
        const response = await axios.get(
          'https://lifeline-api-w5wc.onrender.com/api/v1/hospital/dashboard/stats',
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );
        setStats(response.data);
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      } finally {
        setLoadingStats(false);
      }
    };

    const fetchAppointments = async () => {
      try {
        const response = await axios.get(
          'https://lifeline-api-w5wc.onrender.com/api/v1/hospital/appointments',
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );
        setAppointments(response.data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      } finally {
        setLoadingAppointments(false);
      }
    };

    fetchStats();
    fetchAppointments();
  }, []);

  const filteredAppointments = appointments.filter(a =>
    a.donor?.fullName?.toLowerCase().includes(search.toLowerCase()) ||
    a.donor?.bloodType?.toLowerCase().includes(search.toLowerCase()) ||
    a.donor?.email?.toLowerCase().includes(search.toLowerCase())
  );

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
              {currentView === "dashboard" && (
                <div className="bg-blue-500 border border-none rounded-md p-6 flex justify-between items-center shadow">
                  <div>
                    <h2 className="text-md font-semibold text-white">Total Donors</h2>
                    {loadingAppointments ? (
                      <p className="text-sm text-white mt-2">Loading...</p>
                    ) : (
                      <p className="text-2xl font-bold text-white mt-1">
                        {
                          [...new Set(
                            appointments
                              .map(item => item?.donor?.email?.toLowerCase().trim())
                              .filter(Boolean)
                          )].length
                        }
                      </p>
                    )}
                  </div>
                  <Users className="text-white w-8 h-8" />
                </div>


              )}


              <div className="bg-green-500 text-white border rounded-md p-6 flex justify-between items-center shadow">
                <div>
                  <h2 className="text-md font-semibold">Pending Appointments</h2>
                  {loadingStats ? (
                    <p className="text-sm text-white mt-2">Loading...</p>
                  ) : (
                    <p className="text-2xl font-bold mt-1">
                      {stats?.pendingAppointments || "No data"}
                    </p>
                  )}
                </div>
                <CalendarCheck className="w-8 h-8" />
              </div>

              <div className="bg-[#008080] border border-none rounded-md p-6 flex justify-between items-center shadow">
                <div>
                  <h2 className="text-md font-semibold text-white">Blood Requests</h2>
                  {loadingStats ? (
                    <p className="text-sm text-white mt-2">Loading...</p>
                  ) : (
                    <p className="text-2xl font-bold mt-1 text-white">
                      {stats?.totalRequests || "No data"}
                    </p>
                  )}
                </div>
                <Activity className="text-white w-8 h-8" />
              </div>
            </div>
          )}

          {currentView === "donor-responses" && (
            <div className="mt-10">
              <h2 className="text-xl font-semibold mb-4">Donor Responses</h2>
              <DonorResponses />
            </div>
          )}

          {currentView === "appointments" && (
            <div className="mt-10">
              <h2 className="text-xl font-semibold mb-4">Donor Appointments</h2>
              <input
                type="text"
                placeholder="Search by name, blood group, or email"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="mb-4 p-2 w-full md:w-1/2 border border-gray-300 rounded"
              />

              {loadingAppointments ? (
                <p>Loading appointments...</p>
              ) : filteredAppointments.length === 0 ? (
                <p>No appointments found.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                    {filteredAppointments.map((appointment) => (
                      <DonorCard
                        key={appointment._id}
                        donor={appointment.donor}
                        appointment={appointment}
                      />
                    ))}
                  </div>


                </div>
              )}
            </div>
          )}
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
