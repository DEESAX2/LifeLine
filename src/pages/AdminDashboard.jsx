import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  Droplet,
  Calendar,
  LogOut,
  Menu
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import toast, { Toaster } from 'react-hot-toast';
import { apiClient, apiFetcher } from '../api/client';
import PendingHospitals from '../components/PendingHospitals';
import ApprovedHospitals from '../components/ApprovedHospitals';
import DeclinedHospitals from '../components/DeclinedHospitals';

const isAdmin = true;

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [stats, setStats] = useState({ pending: 0, approved: 0, declined: 0 });
  const [pendingHospitals, setPendingHospitals] = useState([]);
  const [approvedHospitals, setApprovedHospitals] = useState([]);
  const [declinedHospitals, setDeclinedHospitals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch dashboard stats
    apiFetcher("/admin/dashboard/stats")
      .then(data => setStats(data))
      .catch(() => toast.error("Failed to fetch dashboard stats"))
      .finally(() => setLoading(false));

    // Fetch pending hospital requests
    apiFetcher("/admin/pending/hospitals")
      .then(data => {
        console.log("Fetched pending hospitals:", data); // Debug line
        /*
          The backend may return either an array directly or an object like
          { hospitals: [...] }.  Normalise the shape so the UI always
          receives an array and we avoid `hospitals.map is not a function`.
        */
        const normalised = Array.isArray(data) ? data : (data?.hospitals ?? []);
        setPendingHospitals(normalised);
      })
      .catch(() => {
        toast.error("Failed to fetch pending hospitals.");
      });
      // Fetch approved hospitals
    apiFetcher("/admin/approved-hospitals")
      .then(data => {
        const normalised = Array.isArray(data) ? data : (data?.hospitals ?? []);
        setApprovedHospitals(normalised);
      })
      .catch(() => toast.error("Failed to fetch approved hospitals."));

    // Fetch declined hospitals
    apiFetcher("/admin/declined-hospitals")
      .then(data => {
        const normalised = Array.isArray(data) ? data : (data?.declined_hospitals ?? data?.hospitals ?? []);
        setDeclinedHospitals(normalised);
      })
      .catch(() => toast.error("Failed to fetch declined hospitals."));
  }, []);

  const declineHospital = async (id) => {
    try {
      await apiClient.patch(`/admin/decline/${id}`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`
        }
      });
      toast.success("Hospital request declined!");
      // update stats locally
      setStats(prev => ({
        ...prev,
        pending: Math.max(prev.pending - 1, 0),
        declined: prev.declined + 1,
      }));
      setPendingHospitals(prev => prev.filter(h => h.id !== id));
    } catch {
      toast.error("Failed to decline hospital.");
    }
  };

  const approveHospital = async (id) => {
    try {
      await apiClient.patch(`/admin/approve/${id}`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`
        }
      });
      toast.success("Hospital request approved!");
      // update stats locally
      setStats(prev => ({
        ...prev,
        pending: Math.max(prev.pending - 1, 0),
        approved: prev.approved + 1,
      }));
      setPendingHospitals(prev => prev.filter(h => h.id !== id));
    } catch {
      toast.error("Failed to approve hospital.");
    }
  };


  // Chart data for approval status
  const statusData = [
    { name: 'Pending', value: stats.pending, color: '#FACC15' },
    { name: 'Approved', value: stats.approved, color: '#22C55E' }, 
    { name: 'Declined', value: stats.declined, color: '#EF4444' }, 
  ];

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <h2 className="text-xl text-red-500">Access Denied. You are not authorized to view this page.</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Toaster />

      {/* Navbar */}
      <nav className="bg-red-500 p-4 text-white flex justify-between items-center">
        <div className="flex items-center gap-4">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="md:hidden">
            <Menu className="w-6 h-6" />
          </button>
          <a href="/admin-dashboard" className="text-2xl font-nomo">Admin Dashboard</a>
        </div>
        <span className="hidden md:block">Welcome, Admin</span>
      </nav>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className={`bg-white w-64 p-4 text-white md:block z-20 ${sidebarOpen ? 'block absolute h-full' : 'hidden'} md:relative`}>
          <ul className="space-y-15">
            <li><a href="/admin-dashboard" className="flex items-center gap-2 text-red-500 font-bold mt-8"><LayoutDashboard className="w-5 h-5" /> Dashboard</a></li>
<li><a href="/admin/pending-hospitals" className="flex items-center gap-2 text-black hover:bg-blue-100"><Droplet className="w-5 h-5" /> Pending Hospitals</a></li>
<li><a href="/admin/approved-hospitals" className="flex items-center gap-2 text-black hover:bg-blue-100"><Droplet className="w-5 h-5" /> Approved Hospitals</a></li>
<li><a href="/admin/declined-hospitals" className="flex items-center gap-2 text-black hover:bg-blue-100"><Droplet className="w-5 h-5" /> Declined Hospitals</a></li>
            
            <li><a href="/admin-events" className="flex items-center gap-2 text-black hover:bg-blue-100"><Calendar className="w-5 h-5" /> Events</a></li>
            <li><a href="/" className="flex items-center gap-2 text-black hover:bg-blue-100"><LogOut className="w-5 h-5" /> Logout</a></li>
          </ul>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-6 bg-red-100 overflow-y-auto">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            <div className="bg-yellow-200 p-6 shadow-md rounded-lg text-center">
              <h3 className="text-gray-700 ">Pending Approvals</h3>
              <p className="text-2xl font-bold text-red-600">{loading ? "..." : stats.pending}</p>
            </div>
            <div className="bg-green-300 p-6 shadow-md rounded-lg text-center">
               <h3 className="text-gray-700">Approved Hospitals</h3>
              <p className="text-2xl font-bold text-red-600">{loading ? "..." : stats.approved}</p>
            </div>
            <div className="bg-red-400 p-6 shadow-md rounded-lg text-center">
               <h3 className="text-gray-700">Declined Hospitals</h3>
              <p className="text-2xl font-bold text-red-600">{loading ? "..." : stats.declined}</p>
            </div>
          </div>
          {/* Approval Status Bar Chart */}
          <div className="bg-white p-6 shadow-md rounded-lg mb-8">
            <h2 className="text-lg font-semibold mb-4 text-gray-700">Approval Status Overview</h2>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={statusData}>
                  <XAxis dataKey="name" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Bar dataKey="value">
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
