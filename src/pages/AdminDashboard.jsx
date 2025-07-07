import { FaUsers, FaCalendarAlt, FaTint, FaClipboardList, FaChartPie, FaSignOutAlt } from "react-icons/fa";
import { useEffect } from "react";
import { Pie, Bar } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

export default function AdminDashboard() {
  // Simple client-side admin guard
  useEffect(() => {
    // During local development, automatically grant admin access
    if (import.meta.env.DEV) {
      localStorage.setItem("isAdmin", "true");
    }
    const isAdmin = localStorage.getItem("isAdmin") === "true";
    if (!isAdmin) {
      window.location.href = "/login"; // redirect non-admins
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    window.location.href = "/login";
  };
  const stats = [
    { icon: <FaTint />, label: "Units Available", value: 250, color: "#dc2626" },
    { icon: <FaClipboardList />, label: "Open Requests", value: 120, color: "#2563eb" },
    { icon: <FaUsers />, label: "Active Donors", value: 1200, color: "#1BA54E" },
    { icon: <FaCalendarAlt />, label: "Upcoming Drives", value: 3, color: "#f59e0b" },
  ];

  const bloodInventory = [
    { type: "O+", units: 80 },
    { type: "O-", units: 25 },
    { type: "A+", units: 60 },
    { type: "A-", units: 20 },
    { type: "B+", units: 40 },
    { type: "B-", units: 15 },
    { type: "AB+", units: 30 },
    { type: "AB-", units: 10 },
  ];

  const barData = {
    labels: bloodInventory.map((b) => b.type),
    datasets: [
      {
        label: "Units",
        data: bloodInventory.map((b) => b.units),
        backgroundColor: bloodInventory.map((b) => (b.units < 25 ? "#dc2626" : "#2563eb")),
      },
    ],
  };

  const barOptions = {
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: { beginAtZero: true },
    },
  };

  const activities = [
    "Donor, Michael The Finisher. registered (O+)",
    "Hospital,CocoaClinic requested 3 units of O-", 
    "Mobile drive scheduled for 08/07/2025", 
    "Blood inventory updated: +5 units A+",
  ];

  const pieData = {
    labels: stats.map((s) => s.label),
    datasets: [
      {
        data: stats.map((s) => s.value),
        backgroundColor: [
          "#dc2626",
          "#2563eb",
          "#1BA54E",
          "#f59e0b",
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-red-500 text-white p-5 flex flex-col justify-between">
        <h2 className="text-2xl font-bold mb-8">Admin</h2>
        <ul className="space-y-4">
          <li><a href="/admin-dashboard" className="block hover:bg-red-700 p-2 rounded">Dashboard</a></li>
          <li><a href="/blood-requests" className="block hover:bg-red-700 p-2 rounded">Blood Requests</a></li>
          <li><a href="/donor-history" className="block hover:bg-red-700 p-2 rounded">Donor History</a></li>
          <li><a href="/user-dashboard" className="block hover:bg-red-700 p-2 rounded">User Dashboard</a></li>
        </ul>
        <button onClick={handleLogout} className="mt-10 flex items-center gap-2 hover:bg-red-700 p-2 rounded">
          <FaSignOutAlt /> Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold text-red-600 mb-6">Dashboard Overview</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((item, index) => (
            <div key={index} className="bg-white p-4 rounded shadow-md flex items-center space-x-4">
              <div className="text-2xl" style={{ color: item.color }}>{item.icon}</div>
              <div>
                <p className="text-gray-700 text-sm">{item.label}</p>
                <p className="text-xl font-bold">{item.value}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded shadow max-w-sm">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2"><FaChartPie /> Inventory Distribution</h2>
            <Pie data={pieData} width={200} height={200} />
          </div>

          <div className="bg-white p-6 rounded shadow max-w-sm">
            <h2 className="text-xl font-semibold mb-4">Blood-Type Inventory</h2>
            <Bar data={barData} options={barOptions} />
          </div>

          <div className="bg-white p-6 rounded shadow max-w-sm overflow-x-auto">
            <h2 className="text-xl font-semibold mb-4">Recent Blood Donation Events</h2>
            <table className="w-full text-left border">
              <thead>
                <tr className="bg-red-100">
                  <th className="p-2">Date</th>
                  <th className="p-2">Location</th>
                  <th className="p-2">Donors</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="p-2">05/05/2025</td>
                  <td className="p-2">GCTU</td>
                  <td className="p-2">55</td>
                </tr>
                <tr className="border-t">
                  <td className="p-2">28/06/2025</td>
                  <td className="p-2">Buro.</td>
                  <td className="p-2">50</td>
                </tr>
                <tr className="border-t">
                  <td className="p-2">28/06/2025</td>
                  <td className="p-2">BTL.</td>
                  <td className="p-2">10</td>
                </tr>
                <tr className="border-t">
                  <td className="p-2">28/06/2025</td>
                  <td className="p-2">Kaneshie</td>
                  <td className="p-2">40</td>
                </tr>
                <tr className="border-t">
                  <td className="p-2">28/06/2025</td>
                  <td className="p-2">Kumasi</td>
                  <td className="p-2">70</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-white p-6 rounded shadow max-h-64 overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
            <ul className="space-y-2 list-disc list-inside text-gray-700">
              {activities.map((a, i) => (
                <li key={i}>{a}</li>
              ))}
            </ul>
          </div>

        </div>
      </main>
    </div>
  );
}