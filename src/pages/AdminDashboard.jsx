import React, { useState } from 'react';
import {
  LayoutDashboard,
  Users,
  Droplet,
  Calendar,
  Mail,
  LogOut,
  Menu
} from 'lucide-react';
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from 'recharts';
import toast, { Toaster } from 'react-hot-toast';

const isAdmin = true;

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <h2 className="text-xl text-red-500">Access Denied. You are not authorized to view this page.</h2>
      </div>
    );
  }

  const cards = [
    { title: 'Pending Approvals', value: 250 },
    { title: 'Approved Hospitals', value: 15 },
    { title: 'Declined Hospital', value: 120 },
  ];

  const chartData = [
    { name: 'A+', value: 30 },
    { name: 'B+', value: 20 },
    { name: 'O+', value: 25 },
    { name: 'AB+', value: 10 },
    { name: 'Others', value: 15 }
  ];

  const COLORS = ['#EF4444', '#F97316', '#10B981', '#3B82F6', '#6366F1'];

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
          <ul className="space-y-4">
            <li><a href="/admin-dashboard" className="flex items-center gap-2 text-red-500 font-semibold mt-8"><LayoutDashboard className="w-5 h-5" /> Dashboard</a></li>
            <li><a href="/donor-history" className="flex items-center gap-2 text-black "><Users className="w-5 h-5" /> Donors</a></li>
            <li><a href="/blood-inventory" className="flex items-center gap-2 text-black"><Droplet className="w-5 h-5" /> Blood Inventory</a></li>
            <li><a href="/admin-events" className="flex items-center gap-2 text-black"><Calendar className="w-5 h-5" /> Events</a></li>
            <li><a href="/messages" className="flex items-center gap-2 text-black"><Mail className="w-5 h-5" /> Messages</a></li>
            <li><a href="/" className="flex items-center gap-2 text-black"><LogOut className="w-5 h-5" /> Logout</a></li>
          </ul>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-6 bg-red-100 overflow-y-auto">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {cards.map((card, idx) => (
              <div key={idx} className="bg-white p-6 shadow-md rounded-lg text-center">
                <h3 className="text-gray-600">{card.title}</h3>
                <p className="text-2xl font-bold text-red-600">{card.value}</p>
              </div>
            ))}
          </div>

          {/* Pie Chart */}
          <div className="bg-white p-6 shadow-md rounded-lg">
            <h2 className="text-lg font-semibold mb-4 text-gray-700">Blood Type Distribution</h2>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={100}
                    fill="#8884d8"
                    label
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
