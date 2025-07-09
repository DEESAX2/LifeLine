import React, { useState } from 'react';
import {
  LayoutDashboard, Users, Droplet, Calendar, Mail, LogOut,
  Pencil, Trash, Menu, Plus
} from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

const initialEvents = [
  { id: 1, title: 'National Blood Drive', location: 'Accra Mall', date: '2025-08-10' },
  { id: 2, title: 'Tema Community Drive', location: 'Tema Community 1', date: '2025-08-15' },
  { id: 3, title: 'Kumasi Red Cross Campaign', location: 'KNUST Campus', date: '2025-09-01' }
];

const AdminEvents = () => {
  const [events, setEvents] = useState(initialEvents);
  const [newEvent, setNewEvent] = useState({ title: '', location: '', date: '' });
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ title: '', location: '', date: '' });
  const [search, setSearch] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleAddEvent = () => {
    if (!newEvent.title || !newEvent.location || !newEvent.date) {
      toast.error('Please fill all fields');
      return;
    }
    const id = events.length + 1;
    setEvents([{ id, ...newEvent }, ...events]);
    setNewEvent({ title: '', location: '', date: '' });
    toast.success('Event added');
  };

  const startEdit = (event) => {
    setEditingId(event.id);
    setEditData({ title: event.title, location: event.location, date: event.date });
  };

  const saveEdit = (id) => {
    setEvents(events.map(ev => ev.id === id ? { ...ev, ...editData } : ev));
    setEditingId(null);
    toast.success('Event updated');
  };

  const deleteEvent = (id) => {
    setEvents(events.filter(ev => ev.id !== id));
    toast.success('Event deleted');
  };

  const sortEvents = (data) => {
    switch (sortOption) {
      case 'date-asc':
        return [...data].sort((a, b) => new Date(a.date) - new Date(b.date));
      case 'date-desc':
        return [...data].sort((a, b) => new Date(b.date) - new Date(a.date));
      case 'location-asc':
        return [...data].sort((a, b) => a.location.localeCompare(b.location));
      case 'location-desc':
        return [...data].sort((a, b) => b.location.localeCompare(a.location));
      default:
        return data;
    }
  };

  const filteredEvents = sortEvents(events.filter(ev =>
    ev.title.toLowerCase().includes(search.toLowerCase()) ||
    ev.location.toLowerCase().includes(search.toLowerCase()) ||
    ev.date.includes(search)
  ));

  return (
    <div className="min-h-screen flex flex-col">
      <Toaster />
      {/* Navbar */}
      <nav className="bg-red-600 p-4 text-white flex justify-between items-center">
        <div className="flex items-center gap-4">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="md:hidden">
            <Menu className="w-6 h-6" />
          </button>
          <a href="/admin-dashboard" className="text-xl font-bold">Admin Events</a>
        </div>
        <span className="hidden md:block">Manage Events</span>
      </nav>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className={`bg-red-300 w-64 p-4 text-white z-20 md:block ${sidebarOpen ? 'block absolute h-full' : 'hidden'} md:relative`}>
          <ul className="space-y-4">
            <li><a href="/admin-dashboard" className="flex items-center gap-2 text-black hover:underline"><LayoutDashboard className="w-5 h-5" /> Dashboard</a></li>
            <li><a href="/donor-history" className="flex items-center gap-2 text-black hover:underline"><Users className="w-5 h-5" /> Donors</a></li>
            <li><a href="/blood-inventory" className="flex items-center gap-2 text-black hover:underline"><Droplet className="w-5 h-5" /> Blood Inventory</a></li>
            <li><a href="/upcoming-drives" className="flex items-center gap-2 text-red-700 font-semibold"><Calendar className="w-5 h-5" /> Events</a></li>
            <li><a href="/messages" className="flex items-center gap-2 text-black hover:underline"><Mail className="w-5 h-5" /> Messages</a></li>
            <li><a href="/" className="flex items-center gap-2 text-black hover:underline"><LogOut className="w-5 h-5" /> Logout</a></li>
          </ul>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 bg-red-100">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Upcoming Events</h2>

          {/* Create New Event */}
          <div className="bg-white p-4 mb-6 rounded shadow-md">
            <h3 className="text-lg font-semibold mb-2 flex items-center gap-2"><Plus className="w-5 h-5" /> Create New Event</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <input
                type="text"
                placeholder="Event Title"
                value={newEvent.title}
                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                className="px-3 py-2 border rounded"
              />
              <input
                type="text"
                placeholder="Location"
                value={newEvent.location}
                onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                className="px-3 py-2 border rounded"
              />
              <input
                type="date"
                value={newEvent.date}
                onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                className="px-3 py-2 border rounded"
              />
            </div>
            <button onClick={handleAddEvent} className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">Add Event</button>
          </div>

          {/* Search and Sort */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
            <input
              type="text"
              placeholder="Search events..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full md:w-1/2 px-4 py-2 rounded border border-gray-300"
            />
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="px-4 py-2 rounded border border-gray-300"
            >
              <option value="">Sort By</option>
              <option value="date-asc">Date (Oldest First)</option>
              <option value="date-desc">Date (Newest First)</option>
              <option value="location-asc">Location (A-Z)</option>
              <option value="location-desc">Location (Z-A)</option>
            </select>
          </div>

          {/* Events List */}
          <div className="space-y-4">
            {filteredEvents.length === 0 ? (
              <p className="text-gray-600">No events found.</p>
            ) : (
              filteredEvents.map((event) => (
                <div key={event.id} className="bg-white p-4 rounded shadow-md">
                  {editingId === event.id ? (
                    <>
                      <input
                        type="text"
                        value={editData.title}
                        onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                        className="w-full mb-2 px-3 py-2 border rounded"
                      />
                      <input
                        type="text"
                        value={editData.location}
                        onChange={(e) => setEditData({ ...editData, location: e.target.value })}
                        className="w-full mb-2 px-3 py-2 border rounded"
                      />
                      <input
                        type="date"
                        value={editData.date}
                        onChange={(e) => setEditData({ ...editData, date: e.target.value })}
                        className="w-full mb-2 px-3 py-2 border rounded"
                      />
                      <div className="flex gap-2">
                        <button onClick={() => saveEdit(event.id)} className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700">Save</button>
                        <button onClick={() => setEditingId(null)} className="bg-gray-500 text-white px-4 py-1 rounded hover:bg-gray-600">Cancel</button>
                      </div>
                    </>
                  ) : (
                    <>
                      <h3 className="text-lg font-semibold">{event.title}</h3>
                      <p className="text-sm text-gray-600">📍 {event.location}</p>
                      <p className="text-sm text-gray-600">🗓️ {event.date}</p>
                      <div className="mt-2 flex gap-2">
                        <button onClick={() => startEdit(event)} className="flex items-center gap-1 px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"><Pencil className="w-4 h-4" /> Edit</button>
                        <button onClick={() => deleteEvent(event.id)} className="flex items-center gap-1 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"><Trash className="w-4 h-4" /> Delete</button>
                      </div>
                    </>
                  )}
                </div>
              ))
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminEvents;
