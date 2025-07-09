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
import toast, { Toaster } from 'react-hot-toast';

const initialMessages = [
  { id: 1, name: 'Sandra Allotey', email: 'sandy@example.com', subject: 'Request for blood', content: 'Hi, I would like to donate blood. Please advise.', status: 'unread' },
  { id: 2, name: 'Esther Manor', email: 'manorkie@gmail.com', subject: 'Help', content: 'Is there a donation center near Accra?', status: 'read' },
  { id: 3, name: 'Earl Osafo', email: 'osafo@yahoo.com', subject: 'Emergency request', content: 'Need blood urgently at Ridge Hospital.', status: 'unread' },
  { id: 4, name: 'Elisa Harrison', email: 'elisa@yahoo.com', subject: 'Emergency request', content: 'Need blood urgently at Ridge Hospital.', status: 'unread' },
  { id: 5, name: 'Desmond Lincoln Kponyo', email: 'deslinc@gmail.com', subject: 'Help', content: 'Is there a donation center near Accra?', status: 'read' },
  { id: 6, name: 'Ms Rahmat', email: 'rahmat@gmail.com', subject: 'Help', content: 'Is there a donation center near Tema station?', status: 'read' }
];

const Messages = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [visibleCount, setVisibleCount] = useState(3);
  const [replies, setReplies] = useState({});
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const unreadCount = messages.filter(msg => msg.status === 'unread').length;

  const filteredMessages = messages.filter(msg => {
    const matchesSearch = msg.name.toLowerCase().includes(search.toLowerCase()) || msg.subject.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'all' ? true : msg.status === filter;
    return matchesSearch && matchesFilter;
  });

  const markAsRead = (id) => {
    setMessages(prev => prev.map(msg => msg.id === id ? { ...msg, status: 'read' } : msg));
    toast.success('Marked as read');
  };

  const deleteMessage = (id) => {
    setMessages(prev => prev.filter(msg => msg.id !== id));
    toast.success('Message deleted');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Toaster />

      {/* Navbar */}
      <nav className="bg-red-600 p-4 text-white flex justify-between items-center md:justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="md:hidden">
            <Menu className="w-6 h-6" />
          </button>
          <a href="/admin-dashboard" className="text-xl font-bold">Admin's Inbox</a>
        </div>
        <span className="hidden md:block">Messages</span>
      </nav>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className={`bg-red-300 w-64 p-4 text-white z-20 md:block ${sidebarOpen ? 'block absolute h-full' : 'hidden'} md:relative`}>
          <ul className="space-y-4">
            <li><a href="/admin-dashboard" className="flex items-center gap-2 text-black hover:underline"><LayoutDashboard className="w-5 h-5" /> Dashboard</a></li>
            <li><a href="/donor-history" className="flex items-center gap-2 text-black hover:underline"><Users className="w-5 h-5" /> Donors</a></li>
            <li><a href="/blood-inventory" className="flex items-center gap-2 text-black hover:underline"><Droplet className="w-5 h-5" /> Blood Inventory</a></li>
            <li><a href="/upcoming-drives" className="flex items-center gap-2 text-black hover:underline"><Calendar className="w-5 h-5" /> Events</a></li>
            <li>
              <a href="/messages" className="flex items-center justify-between text-red-700 font-semibold">
                <span className="flex items-center gap-2"><Mail className="w-5 h-5" /> Messages</span>
                {unreadCount > 0 && (
                  <span className="bg-yellow-300 text-yellow-900 text-sm font-bold px-2 py-0.5 rounded-full ml-2">{unreadCount}</span>
                )}
              </a>
            </li>
            <li><a href="/" className="flex items-center gap-2 text-black hover:underline"><LogOut className="w-5 h-5" /> Logout</a></li>
          </ul>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 bg-red-100">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Inbox</h2>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <input
              type="text"
              placeholder="Search by name or subject..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full md:w-1/2 px-4 py-2 rounded border border-gray-300"
            />
            <select
              value={filter}
              onChange={(e) => { setFilter(e.target.value); setVisibleCount(3); }}
              className="px-4 py-2 rounded border border-gray-300"
            >
              <option value="all">All</option>
              <option value="unread">Unread</option>
              <option value="read">Read</option>
            </select>
          </div>

          {/* Message List */}
          <div className="space-y-6">
            {filteredMessages.length === 0 ? (
              <p className="text-gray-600">No messages found.</p>
            ) : (
              filteredMessages.slice(0, visibleCount).map((msg) => (
                <div key={msg.id} className={`p-4 shadow-md rounded-lg ${msg.status === 'unread' ? 'bg-yellow-50' : 'bg-white'}`}>
                  <div className="flex justify-between items-center mb-2">
                    <div>
                      <h3 className={`text-lg font-semibold ${msg.status === 'unread' ? 'text-black' : 'text-gray-700'}`}>{msg.name}</h3>
                      <p className="text-sm text-gray-500">{msg.email}</p>
                    </div>
                    <span className={`text-sm px-2 py-1 rounded-full ${msg.status === 'unread' ? 'bg-yellow-200 text-yellow-800' : 'bg-green-200 text-green-800'}`}>{msg.status}</span>
                  </div>

                  <p className="text-md text-gray-800"><strong>Subject:</strong> {msg.subject}</p>
                  <p className="text-sm text-gray-700 mt-2">{msg.content}</p>

                  <div className="mt-4 space-x-3">
                    {msg.status === 'unread' && (
                      <button onClick={() => markAsRead(msg.id)} className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700">Mark as Read</button>
                    )}
                    <button onClick={() => deleteMessage(msg.id)} className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700">Delete</button>
                  </div>

                  {/* Reply Box */}
                  <div className="mt-4">
                    <textarea
                      rows="3"
                      placeholder="Type your reply..."
                      className="w-full border border-gray-300 rounded p-2 mt-2"
                      value={replies[msg.id] || ''}
                      onChange={(e) => setReplies((prev) => ({ ...prev, [msg.id]: e.target.value }))}
                    />
                    <button
                      onClick={() => {
                        toast.success(`Reply sent to ${msg.email}`);
                        setReplies((prev) => ({ ...prev, [msg.id]: '' }));
                      }}
                      className="mt-2 bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
                    >
                      Send Reply
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Load More */}
          {visibleCount < filteredMessages.length && (
            <div className="mt-6 text-center">
              <button onClick={() => setVisibleCount(prev => prev + 3)} className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700">Load More</button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Messages;
