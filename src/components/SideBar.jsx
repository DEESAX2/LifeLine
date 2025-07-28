import { LayoutDashboard, Users, History, Droplet, FileText } from 'lucide-react';

export default function Sidebar({ currentView, setCurrentView, navigate, sidebarOpen }) {
  const sidebarItems = [
    { title: "Dashboard", icon: LayoutDashboard, view: "dashboard",  },
    { title: "Donor Responses", icon: Users, view: "donor-responses"},
    { title: "Donor History", icon: History, onClick: () => navigate('/donor-history') },
    { title: "Blood Requests", icon: FileText, view: "blood-requests" },
  ];

  return (
    <aside className={`bg-white w-64 p-4 shadow-lg lg:block z-20 ${sidebarOpen ? 'block absolute h-full' : 'hidden'} lg:relative`}>
      <ul className="space-y-4 mt-8">
        {sidebarItems.map((item) => (
          <li key={item.title}>
            <button
              onClick={
                item.disabled
                  ? null
                  : item.onClick || (() => setCurrentView(item.view))
              }
              disabled={item.disabled}
              className={`flex items-center gap-3 w-full p-3 rounded-lg transition-colors ${
                item.disabled
                  ? 'text-gray-400 bg-gray-50 cursor-not-allowed'
                  : currentView === item.view
                    ? 'text-red-500 bg-red-50 font-bold'
                    : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.title}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}
