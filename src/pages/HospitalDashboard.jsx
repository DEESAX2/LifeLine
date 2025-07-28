import { useEffect, useState } from 'react';
import axios from 'axios';
import DashboardNav from "../components/DashboardNav";
import Sidebar from "../components/SideBar";
import CreateBloodRequestModal from "../components/CreateBloodRequestModal";
import { useNavigate } from "react-router";
import { Activity, CalendarCheck,  Users,  PlusCircle, Printer, Download,Zap} from 'lucide-react';
import DonorResponses from '../components/DonorResponses';
import RequestHospital from '../components/RequestHospital';

export default function HospitalDashboard() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentView, setCurrentView] = useState("dashboard");
  const [stats, setStats] = useState({ 
    totalBloodRequests: 0,
    totalDonors: 0,
    pendingAppointments: 0
  });
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [disabledOverlay, setDisabledOverlay] = useState(false);

  const navigate = useNavigate();
  const handleLogout = () => navigate('/');

  const handleExportData = () => {
    console.log("Debug - First appointment:", appointments[0]);
    
    // CSV headers
    const headers = [
      'Donor ID',
      'Donor Name',
      'Blood Type',
      'Email',
      'Phone',
      'Appointment Date',
      'Appointment Status',
      'Hospital Notes'
    ];

    // Prepare data rows with proper null checks
    const dataRows = appointments.map(appointment => {
      // Safely access all fields with fallbacks
      const donor = appointment.donor || {};
      const donorId = donor.id || 'N/A';
      const donorName = donor.fullName || 'Anonymous';
      const bloodType = donor.bloodType || 'Unknown';
      const email = donor.email || 'Not provided';
      const phone = donor.phone || 'Not provided';
      const apptDate = appointment.date ? new Date(appointment.date).toLocaleDateString() : 'N/A';
      const status = appointment.completed ? 'Completed' : 'Pending';
      const notes = appointment.notes || 'None';

      return [
        donorId,
        `"${donorName}"`,
        bloodType,
        `"${email}"`,
        `"${phone}"`,
        apptDate,
        status,
        `"${notes}"`
      ];
    });

    // Create CSV content
    const csvContent = [
      headers.join(','),
      ...dataRows.map(row => row.join(','))
    ].join('\n');

    // Trigger download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `donor_contacts_export_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const checkTokenApproval = (token) => {
    try {
      if (!token) return false;
      const payload = JSON.parse(atob(token.split('.')[1]));
      const isTokenValid = payload.exp * 1000 > Date.now();
      return payload.isApproved && isTokenValid;
    } catch (error) {
      console.error("Token validation error:", error);
      return false;
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('ACCESS_TOKEN');
    const isApproved = checkTokenApproval(token);
    setDisabledOverlay(!isApproved);

    if (!isApproved) return;

    const fetchData = async () => {
      try {
        const [statsResponse, appointmentsResponse] = await Promise.all([
          axios.get('https://lifeline-api-w5wc.onrender.com/api/v1/hospital/dashboard/stats', {
            headers: { Authorization: `Bearer ${token}` }
          }),
          axios.get('https://lifeline-api-w5wc.onrender.com/api/v1/hospital/appointments', {
            headers: { Authorization: `Bearer ${token}` }
          })
        ]);

        console.log("API Response - Appointments:", appointmentsResponse.data);
        console.log("API Response - Stats:", statsResponse.data);

        setStats({
          totalBloodRequests: statsResponse.data.totalBloodRequests || 0,
          totalDonors: statsResponse.data.totalDonors || 0,
          pendingAppointments: appointmentsResponse.data.filter(a => !a.completed).length
        });
        setAppointments(appointmentsResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        if (error.response?.status === 401 || error.response?.status === 403) {
          setDisabledOverlay(true);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col relative">
      <DashboardNav
        setIsCreateModalOpen={setIsCreateModalOpen}
        handleLogout={handleLogout}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div className="flex flex-1 overflow-hidden relative">
        <Sidebar
          currentView={currentView}
          setCurrentView={setCurrentView}
          navigate={navigate}
          sidebarOpen={sidebarOpen}
        />

        <main className="flex-1 p-6 overflow-y-auto bg-red-100">
          <h1 className="text-2xl font-bold mb-4 capitalize">{currentView}</h1>

          {currentView === "dashboard" && (
            <div className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Blood Requests Card */}
                <div className="bg-white p-4 rounded-lg border border-red-200 shadow-sm">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Blood Requests</p>
                      <p className="text-2xl font-bold mt-1">
                        {stats.totalBloodRequests}
                      </p>
                    </div>
                    <Activity className="h-8 w-8 text-red-400" />
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Total requests created</p>
                </div>

                {/* Pending Appointments Card */}
                <div className="bg-white p-4 rounded-lg border border-amber-200 shadow-sm">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Pending Appointments</p>
                      <p className="text-2xl font-bold mt-1">
                        {stats.pendingAppointments}
                      </p>
                    </div>
                    <CalendarCheck className="h-8 w-8 text-amber-400" />
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Awaiting completion</p>
                </div>

                {/* Total Donors Card */}
                <div className="bg-white p-4 rounded-lg border border-blue-200 shadow-sm">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Total Donors</p>
                      <p className="text-2xl font-bold mt-1">
                        {stats.totalDonors}
                      </p>
                    </div>
                    <Users className="h-8 w-8 text-blue-400" />
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Unique donors</p>
                </div>
              </div>

              {/* Management Sections */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Recent Appointments */}
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <h3 className="font-bold mb-3 flex items-center">
                    <CalendarCheck className="h-5 w-5 mr-2 text-gray-500" />
                    Recent Appointments
                  </h3>
                  <div className="space-y-2">
                    {appointments.slice(0, 3).map(appointment => (
                      <div key={appointment.id} className="flex justify-between items-center p-2 hover:bg-gray-50 rounded">
                        <div>
                          <p className="font-medium">
                            {appointment.donor?.fullName || "Anonymous"}
                            {appointment.donor?.email && (
                              <span className="text-xs text-gray-500 block">{appointment.donor.email}</span>
                            )}
                          </p>
                          <p className="text-sm text-gray-500">
                            {appointment.donor?.bloodType || "Unknown type"} • {new Date(appointment.date).toLocaleDateString()}
                          </p>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          appointment.completed 
                            ? "bg-green-100 text-green-800" 
                            : "bg-amber-100 text-amber-800"
                        }`}>
                          {appointment.completed ? "Completed" : "Pending"}
                        </span>
                      </div>
                    ))}
                  </div>
                  <button 
                    onClick={() => setCurrentView("donor-responses")}
                    className="text-sm text-blue-600 hover:underline mt-2"
                  >
                    View all appointments →
                  </button>
                </div>

                {/* Quick Actions */}
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <h3 className="font-bold mb-3 flex items-center">
                    <Zap className="h-5 w-5 mr-2 text-gray-500" />
                    Quick Actions
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setIsCreateModalOpen(true)}
                      className="flex flex-col items-center justify-center p-3 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
                    >
                      <PlusCircle className="h-6 w-6 text-red-500 mb-1" />
                      <span className="text-sm">New Request</span>
                    </button>
                    <button
                      onClick={() => window.print()}
                      className="flex flex-col items-center justify-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <Printer className="h-6 w-6 text-gray-500 mb-1" />
                      <span className="text-sm">Print Report</span>
                    </button>
                    <button
                      onClick={handleExportData}
                      className="flex flex-col items-center justify-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <Download className="h-6 w-6 text-gray-500 mb-1" />
                      <span className="text-sm">Export Data</span>
                    </button>
                    <div className="p-3 opacity-0"></div> 
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentView === "donor-responses" && (
            <div className="mt-4">
              <DonorResponses />
            </div>
          )}

          {currentView === "blood-requests" && (
            <div className="mt-4">
            <RequestHospital />
            </div>
          )}

        </main>

        {disabledOverlay && (
          <div className="absolute top-0 left-0 w-full h-full bg-gray-200 bg-opacity-70 z-50 flex items-center justify-center">
            <p className="text-gray-600 text-xl font-semibold">
              Your hospital account is currently awaiting approval. Please check back later once your access has been granted.
            </p>
          </div>
        )}
      </div>

      {isCreateModalOpen && (
        <CreateBloodRequestModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onRequestCreated={() => {
            console.log("Request created!");
            // Consider adding a refresh here
          }}
        />
      )}
    </div>
  );
}