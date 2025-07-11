import React, { useState } from 'react';
import {
  LayoutDashboard, Users, Droplet, Calendar, Mail, LogOut,
  Pencil, Trash, Menu, Plus
} from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

const initialEvents = [
  { id: 1, title: 'National Blood Drive', location: 'Accra Mall', date: '2025-08-10' },
  { id: 2, title: 'Tema Community Drive', location: 'Tema Community 1', date: '2025-08-15' },
  { id: 3, title: 'Kumasi Red Cross Campaign', location: 'KNUST Campus', date: '2025-09-01' }
];

const AdminEvents = () => {
  const { t } = useTranslation();
  // Load from localStorage or fall back
  const [events, setEvents] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('drives'));
      return Array.isArray(saved) && saved.length ? saved : initialEvents;
    } catch {
      return initialEvents;
    }
  });
  
  const [newEvent, setNewEvent] = useState({ title: '', location: '', date: '', map: '' });
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ title: '', location: '', date: '' });
  const [search, setSearch] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Sync to localStorage whenever events change
  React.useEffect(() => {
    localStorage.setItem('drives', JSON.stringify(events));
  }, [events]);

  const handleAddEvent = () => {
    if (!newEvent.title || !newEvent.location || !newEvent.date) {
      toast.error(t('pleaseFillAllFields'));
      return;
    }
    const id = events.length + 1;
    setEvents(prev => {
      toast.success(t('eventAdded'));
      return [{ id, ...newEvent }, ...prev];
    });
    setNewEvent({ title: '', location: '', date: '', map: '' });
  };

  const startEdit = (event) => {
    setEditingId(event.id);
    setEditData({ title: event.title, location: event.location, date: event.date });
  };

  const saveEdit = (id) => {
    setEvents(prev => {
      toast.success(t('eventUpdated'));
      return prev.map(ev => ev.id === id ? { ...ev, ...editData } : ev);
    });
    setEditingId(null);
  };

  const deleteEvent = (id) => {
    setEvents(prev => {
      toast.success(t('eventDeleted'));
      return prev.filter(ev => ev.id !== id);
    });
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
      <nav className="bg-red-500 p-4 text-white flex justify-between items-center">
        <div className="flex items-center gap-4">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="md:hidden">
            <Menu className="w-6 h-6" />
          </button>
          <a href="/admin-dashboard" className="text-xl font-bold">{t('adminEvents')}</a>
        </div>
        <span className="hidden md:block">{t('manageEvents')}</span>
      </nav>

      <div className="flex flex-1 flex-col md:flex-row">
        {/* Sidebar */}
        <aside className={`bg-white w-full md:w-64 p-4 text-white z-20 ${sidebarOpen ? 'block' : 'hidden'} md:block md:relative`}>
          <ul className="space-y-15">
            <li><a href="/admin-dashboard" className="flex items-center gap-2 text-black hover:underline"><LayoutDashboard className="w-5 h-5" />{t('dashboard')}</a></li>
            <li><a href="/donor-history" className="flex items-center gap-2 text-black hover:underline"><Users className="w-5 h-5" />{t('donors')}</a></li>
            <li><a href="/blood-inventory" className="flex items-center gap-2 text-black hover:underline"><Droplet className="w-5 h-5" />{t('bloodInventory')}</a></li>
            <li><a href="/admin-events" className="flex items-center gap-2 text-red-500 font-bold"><Calendar className="w-5 h-5" />{t('events')}</a></li>
            <li><a href="/messages" className="flex items-center gap-2 text-black hover:underline"><Mail className="w-5 h-5" />{t('messages')}</a></li>
            <li><a href="/" className="flex items-center gap-2 text-black hover:underline"><LogOut className="w-5 h-5" />{t('logout')}</a></li>
          </ul>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 bg-red-100">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('upcomingEvents')}</h2>

          {/* Create New Event */}
          <div className="bg-white p-4 mb-6 rounded shadow-md">
            <h3 className="text-lg font-semibold mb-2 flex items-center gap-2"><Plus className="w-5 h-5" />{t('createNewEvent')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <input
                type="text"
                placeholder={t('eventTitle')}
                value={newEvent.title}
                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                className="px-3 py-2 border rounded"
              />
              <input
                type="text"
                placeholder={t('location')}
                value={newEvent.location}
                onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                className="px-3 py-2 border rounded"
              />
              <input
                type="url"
                placeholder={t('mapLink') || 'Map link (optional)'}
                value={newEvent.map}
                onChange={(e) => setNewEvent({ ...newEvent, map: e.target.value })}
                className="px-3 py-2 border rounded"
              />
              <input
                type="date"
                value={newEvent.date}
                onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                className="px-3 py-2 border rounded"
              />
            </div>
            <button onClick={handleAddEvent} className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 w-full md:w-auto">{t('addEvent')}</button>
          </div>

          {/* Search and Sort */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
            <input
              type="text"
              placeholder={t('searchEventsPlaceholder')}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full md:w-1/2 px-4 py-2 rounded border border-gray-300"
            />
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="w-full md:w-auto px-4 py-2 rounded border border-gray-300"
            >
              <option value="">{t('sortBy')}</option>
              <option value="date-asc">{t('dateOldest')}</option>
              <option value="date-desc">{t('dateNewest')}</option>
              <option value="location-asc">{t('locationAZ')}</option>
              <option value="location-desc">{t('locationZA')}</option>
            </select>
          </div>

          {/* Events List */}
          <div className="space-y-4">
            {filteredEvents.length === 0 ? (
              <p className="text-gray-600">{t('noEvents')}</p>
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
                      <div className="flex flex-col sm:flex-row gap-2">
                        <button onClick={() => saveEdit(event.id)} className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700">{t('save')}</button>
                        <button onClick={() => setEditingId(null)} className="bg-gray-500 text-white px-4 py-1 rounded hover:bg-gray-600">{t('cancel')}</button>
                      </div>
                    </>
                  ) : (
                    <>
                      <h3 className="text-lg font-semibold">{event.title}</h3>
                      <p className="text-sm text-gray-600"> {event.location}</p>
                      <p className="text-sm text-gray-600"> {event.date}</p>
                      <div className="mt-2 flex flex-col sm:flex-row gap-2">
                        <button onClick={() => startEdit(event)} className="flex items-center gap-1 px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"><Pencil className="w-4 h-4" />{t('edit')}</button>
                        <button onClick={() => deleteEvent(event.id)} className="flex items-center gap-1 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"><Trash className="w-4 h-4" />{t('delete')}</button>
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
