import React, { useState } from 'react';
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from 'recharts';

// Simulated admin login state
const isAdmin = true; // Change to false to simulate unauthorized access

const AdminDashboard = () => {
  // Redirect simulation
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
      {/* Navbar */}
      <nav className="bg-red-600 p-4 text-white flex justify-between items-center">
        <a href="#" className="text-2xl font-nomo ">Lifeline Admin</a>
        <span>Welcome, Admin</span>
      </nav>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="bg-red-300 w-64 min-h-screen p-4">
          <ul className="space-y-4">
            <li><a href="/admin-dashboard" className="text-red-600 font-semibold">Dashboard</a></li>
            <li><a href="/donor-history">Donors</a></li>
            <li><a href="/blood-inventory">Blood Inventory</a></li>
            <li><a href="/upcoming-drives">Events</a></li>
            <li><a href="/messages">Messages</a></li>
            <li><a href="/">Logout</a></li>
          </ul>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-6 bg-red-100">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
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
            <ResponsiveContainer width="100%" height={300}>
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
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
