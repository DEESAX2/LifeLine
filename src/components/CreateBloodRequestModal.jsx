import React, { useState } from 'react';

export default function CreateBloodRequestModal({ isOpen, onClose, onRequestCreated }) {
  const [formData, setFormData] = useState({
    bloodType: '',
    quantity: '',
    urgency: '',
    message: ''
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.bloodType || !formData.quantity || !formData.urgency || !formData.message) {
      alert("Please fill in all required fields.");
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API request
      console.log('Sending request:', formData);
      await new Promise(resolve => setTimeout(resolve, 1000)); // fake API delay

      alert("Blood Request Created Successfully");

      setFormData({
        bloodType: '',
        quantity: '',
        urgency: '',
        message: ''
      });

      onClose();
      onRequestCreated?.();
    } catch (error) {
      console.error('Error:', error);
      alert("Failed to create request. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 bg-white/30 backdrop-blur-sm">
      <div className="bg-white rounded-lg p-6 w-full max-w-md relative shadow-lg">
        <h2 className="text-lg font-semibold mb-4 text-center">Create New Blood Request</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Blood Type *</label>
            <select
              value={formData.bloodType}
              onChange={(e) => handleInputChange('bloodType', e.target.value)}
              className="w-full border rounded-md px-3 py-2 text-sm"
              required
            >
              <option value="">Select blood type</option>
              {["O-", "O+", "A-", "A+", "B-", "B+", "AB-", "AB+"].map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Quantity *</label>
            <input
              type="text"
              placeholder="e.g., 5 units"
              value={formData.quantity}
              onChange={(e) => handleInputChange('quantity', e.target.value)}
              className="w-full border rounded-md px-3 py-2 text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Urgency Level *</label>
            <select
              value={formData.urgency}
              onChange={(e) => handleInputChange('urgency', e.target.value)}
              className="w-full border rounded-md px-3 py-2 text-sm"
              required
            >
              <option value="">Select urgency</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Message *</label>
            <textarea
              value={formData.message}
              onChange={(e) => handleInputChange('message', e.target.value)}
              placeholder="Describe the medical situation requiring blood..."
              className="w-full border rounded-md px-3 py-2 text-sm min-h-[80px]"
              required
            />
          </div>

          <div className="flex space-x-4 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border border-gray-300 rounded-md px-4 py-2 text-sm cursor-pointer hover:bg-gray-100"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-red-600 text-white rounded-md px-4 py-2 text-sm hover:bg-red-700 cursor-pointer"
              disabled={isLoading}
            >
              {isLoading ? 'Creating...' : 'Create Request'}
            </button>
          </div>
        </form>

        <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-black cursor-pointer text-xl">
          ✕
        </button>
      </div>
    </div>
  );
}
