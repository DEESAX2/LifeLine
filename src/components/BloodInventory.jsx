import React, { useState } from 'react';
import dayjs from 'dayjs';
import {
  LayoutDashboard,
  Users,
  Droplet,
  Mail,
  LogOut,
  CalendarHeart,
  PackageCheck
} from 'lucide-react';

const initialInventory = [
  { id: 1, type: 'A+', units: 25, expiry: '2025-08-01' },
  { id: 2, type: 'O+', units: 9, expiry: '2025-07-15' },
  { id: 3, type: 'B+', units: 6, expiry: '2025-07-20' }
];

const BloodInventory = () => {
  const [inventory, setInventory] = useState(initialInventory);
  const [newType, setNewType] = useState('');
  const [newUnits, setNewUnits] = useState('');
  const [newExpiry, setNewExpiry] = useState('');

  const addInventory = () => {
    if (!newType || !newUnits || !newExpiry) return;

    const existing = inventory.find(item => item.type === newType.toUpperCase() && item.expiry === newExpiry);
    if (existing) {
      const updated = inventory.map(item =>
        item.id === existing.id
          ? { ...item, units: item.units + parseInt(newUnits) }
          : item
      );
      setInventory(updated);
    } else {
      const newItem = {
        id: inventory.length + 1,
        type: newType.toUpperCase(),
        units: parseInt(newUnits),
        expiry: newExpiry
      };
      setInventory([...inventory, newItem]);
    }

    setNewType('');
    setNewUnits('');
    setNewExpiry('');
  };

  const reduceUnits = (id) => {
    const updated = inventory.map(item =>
      item.id === id
        ? { ...item, units: Math.max(0, item.units - 1) }
        : item
    );
    setInventory(updated);
  };

  const addDonation = (id) => {
    const updated = inventory.map(item =>
      item.id === id
        ? { ...item, units: item.units + 1 }
        : item
    );
    setInventory(updated);
  };

  const isExpired = (date) => {
    return dayjs(date).isBefore(dayjs(), 'day');
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="bg-red-600 p-4 text-white flex justify-between items-center">
        <a href="/admin" className="text-2xl font-bold">Administrator</a>
        <span>Blood Inventory</span>
      </nav>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="bg-red-300 w-64 min-h-screen p-4 text-white">
          <ul className="space-y-4">
            <li><a href="/admin-dashboard" className="flex items-center gap-2 text-black hover:underline"><LayoutDashboard className="w-5 h-5" /> Dashboard</a></li>
            <li><a href="/donor-history" className="flex items-center gap-2 text-black hover:underline"><Users className="w-5 h-5" /> Donors</a></li>
            <li><a href="/blood-inventory" className="flex items-center gap-2 font-semibold text-red-700"><Droplet className="w-5 h-5" /> Blood Inventory</a></li>
            <li><a href="/blood-requests" className="flex items-center gap-2 text-black hover:underline"><PackageCheck className="w-5 h-5" /> Blood Requests</a></li>
            <li><a href="/upcoming-drives" className="flex items-center gap-2 text-black hover:underline"><CalendarHeart className="w-5 h-5" /> Events</a></li>
            <li><a href="/messages" className="flex items-center gap-2 text-black hover:underline"><Mail className="w-5 h-5" /> Messages</a></li>
            <li><a href="/" className="flex items-center gap-2 text-black hover:underline"><LogOut className="w-5 h-5" /> Logout</a></li>
          </ul>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 bg-red-100">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Blood Inventory</h2>

          {/* Add Form */}
          <div className="bg-white p-4 rounded shadow mb-6">
            <h3 className="text-lg font-semibold mb-2 text-gray-700">Add Blood Stock</h3>
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="text"
                placeholder="Blood Type (e.g., A+)"
                value={newType}
                onChange={(e) => setNewType(e.target.value)}
                className="px-4 py-2 border rounded w-full md:w-1/4"
              />
              <input
                type="number"
                placeholder="Units"
                value={newUnits}
                onChange={(e) => setNewUnits(e.target.value)}
                className="px-4 py-2 border rounded w-full md:w-1/4"
              />
              <input
                type="date"
                value={newExpiry}
                onChange={(e) => setNewExpiry(e.target.value)}
                className="px-4 py-2 border rounded w-full md:w-1/4"
              />
              <button
                onClick={addInventory}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 w-full md:w-auto"
              >
                Add
              </button>
            </div>
          </div>

          {/* Inventory Table */}
          <div className="bg-white p-4 rounded shadow overflow-auto">
            <h3 className="text-lg font-semibold mb-4 text-gray-700">Current Inventory</h3>
            <table className="w-full text-left border">
              <thead>
                <tr className="bg-gray-200 text-sm">
                  <th className="p-2">Type</th>
                  <th className="p-2">Units</th>
                  <th className="p-2">Expiry Date</th>
                  <th className="p-2">Status</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {inventory.map(item => {
                  const lowStock = item.units < 10;
                  const expired = isExpired(item.expiry);
                  return (
                    <tr key={item.id} className={`${expired ? 'bg-gray-200' : lowStock ? 'bg-yellow-100' : ''} border-t`}>
                      <td className="p-2 font-semibold">{item.type}</td>
                      <td className="p-2">{item.units}</td>
                      <td className="p-2">{dayjs(item.expiry).format('MMM D, YYYY')}</td>
                      <td className="p-2">
                        {expired ? (
                          <span className="text-gray-500">Expired</span>
                        ) : lowStock ? (
                          <span className="text-yellow-600 font-semibold">Low</span>
                        ) : (
                          <span className="text-green-600">Normal</span>
                        )}
                      </td>
                      <td className="p-2 space-x-2">
                        <button
                          onClick={() => reduceUnits(item.id)}
                          className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                        >
                          Fulfill Request (-1)
                        </button>
                        <button
                          onClick={() => addDonation(item.id)}
                          className="bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700"
                        >
                          Add Donation (+1)
                        </button>
                      </td>
                    </tr>
                  );
                })}
                {inventory.length === 0 && (
                  <tr>
                    <td colSpan="5" className="p-2 text-center text-gray-500">No inventory data</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
};

export default BloodInventory;
