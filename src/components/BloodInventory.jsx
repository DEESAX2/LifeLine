import React, { useState } from 'react';
import {
  Menu, PlusCircle, Trash2, AlertTriangle,
  LayoutDashboard, Users, Droplet, Calendar, Mail, LogOut
} from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

const initialInventory = [
  { id: 1, bloodType: 'A+', quantity: 10, expiry: '2025-08-01' },
  { id: 2, bloodType: 'O-', quantity: 5, expiry: '2024-07-10' },
  { id: 3, bloodType: 'B+', quantity: 7, expiry: '2025-06-30' },
];

const BloodInventory = () => {
  const [inventory, setInventory] = useState(initialInventory);
  const [bloodType, setBloodType] = useState('');
  const [quantity, setQuantity] = useState('');
  const [expiry, setExpiry] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const addInventory = () => {
    if (!bloodType || !quantity || !expiry) {
      toast.error('All fields are required');
      return;
    }
    const newItem = {
      id: Date.now(),
      bloodType,
      quantity: parseInt(quantity),
      expiry,
    };
    setInventory([...inventory, newItem]);
    toast.success('Blood unit added');
    setBloodType('');
    setQuantity('');
    setExpiry('');
  };

  const deleteItem = (id) => {
    setInventory(inventory.filter((item) => item.id !== id));
    toast.success('Item deleted');
  };

  const isExpired = (expiryDate) => new Date(expiryDate) < new Date();

  return (
    <div className="min-h-screen flex flex-col">
      <Toaster />
      <nav className="bg-red-500 p-4 text-white flex justify-between items-center">
        <div className="flex items-center gap-4">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="md:hidden">
            <Menu className="w-6 h-6" />
          </button>
          <a href="/admin-dashboard" className="text-xl font-bold">Blood Inventory</a>
        </div>
      </nav>

      <div className="flex flex-1 flex-col md:flex-row">
        <aside className={`bg-white w-full md:w-64 p-4 text-white z-20 ${sidebarOpen ? 'block' : 'hidden'} md:block`}>
          <ul className="space-y-15">
            <li><a href="/admin-dashboard" className="flex items-center gap-2 text-black"><LayoutDashboard className="w-5 h-5" /> Dashboard</a></li>
            <li><a href="/donor-history" className="flex items-center gap-2 text-black"><Users className="w-5 h-5" /> Donors</a></li>
            <li><a href="/blood-inventory" className="flex items-center gap-2 text-red-500 font-bold"><Droplet className="w-5 h-5" /> Blood Inventory</a></li>
            <li><a href="/admin-events" className="flex items-center gap-2 text-black"><Calendar className="w-5 h-5" /> Events</a></li>
            <li><a href="/messages" className="flex items-center gap-2 text-black"><Mail className="w-5 h-5" /> Messages</a></li>
            <li><a href="/" className="flex items-center gap-2 text-black"><LogOut className="w-5 h-5" /> Logout</a></li>
          </ul>
        </aside>

        <main className="flex-1 p-6 bg-red-100">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Manage Blood Inventory</h2>

          <div className="bg-white p-4 rounded shadow-md mb-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
              <input type="text" placeholder="Blood Type" value={bloodType} onChange={(e) => setBloodType(e.target.value)} className="p-2 border rounded w-full" />
              <input type="number" placeholder="Quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} className="p-2 border rounded w-full" />
              <input type="date" value={expiry} onChange={(e) => setExpiry(e.target.value)} className="p-2 border rounded w-full" />
            </div>
            <button onClick={addInventory} className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
              <PlusCircle className="w-5 h-5" /> Add Unit
            </button>
          </div>

          <div className="bg-white p-4 rounded shadow-md overflow-auto">
            <h3 className="text-lg font-semibold mb-4 text-gray-700">Current Stock</h3>
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-red-200">
                    <th className="p-2 text-left">Blood Type</th>
                    <th className="p-2 text-left">Quantity</th>
                    <th className="p-2 text-left">Expiry Date</th>
                    <th className="p-2 text-left">Status</th>
                    <th className="p-2 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {inventory.map((item) => (
                    <tr key={item.id} className="border-t">
                      <td className="p-2">{item.bloodType}</td>
                      <td className="p-2">{item.quantity}</td>
                      <td className="p-2">{item.expiry}</td>
                      <td className="p-2">
                        {isExpired(item.expiry) ? (
                          <span className="flex items-center gap-1 text-red-600 font-medium">
                            <AlertTriangle className="w-4 h-4" /> Expired
                          </span>
                        ) : (
                          <span className="text-green-700 font-medium">Valid</span>
                        )}
                      </td>
                      <td className="p-2">
                        <button
                          onClick={() => deleteItem(item.id)}
                          className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 flex items-center gap-1"
                        >
                          <Trash2 className="w-4 h-4" /> Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default BloodInventory;
