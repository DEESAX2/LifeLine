import React, { useState } from 'react';
import { MapPin, Clock } from 'lucide-react';
import RespondModal from './RespondModal';
import { ToastContainer } from 'react-toastify';

const urgencyColorMap = {
  Critical: 'bg-red-800',
  High: 'bg-red-500',
  Medium: 'bg-yellow-500',
  Low: 'bg-green-500',
};

const BloodRequestCard = ({ request, token }) => {
  const [showModal, setShowModal] = useState(false);
  const { hospital, bloodType, urgency, quantity, message, createdAt, id } = request;

  return (
    <>
      <div className="bg-white border rounded-xl p-6 text-left shadow-sm hover:shadow-md transition relative">
        <ToastContainer position="top-right" autoClose={1000} />
        <span
          className={`absolute top-4 right-4 text-white text-xs px-2 py-1 rounded-full ${urgencyColorMap[urgency] || 'bg-gray-400'
            }`}
        >
          {urgency || 'Unknown'}
        </span>
        <h3 className="text-lg font-semibold text-red-600 mb-2">Blood Request</h3>

        <h3 className="text-xl font-semibold mb-2">{hospital?.name || 'Unknown Hospital'}</h3>
        <div className="flex items-center text-gray-500 text-sm mb-1">
          <MapPin className="w-4 h-4 mr-1" />
          {hospital?.location || 'Unknown Location'}
        </div>
        <div className="flex items-center text-gray-500 text-sm mb-4">
          <Clock className="w-4 h-4 mr-1" />
          {createdAt ? new Date(createdAt).toLocaleDateString() : 'Unknown date'}
        </div>

        <div className="flex items-center mb-4 space-x-6">
          <div className="bg-red-100 text-red-700 font-bold px-3 py-2 rounded-md">
            {bloodType || '-'}
            <div className="text-xs font-normal text-gray-600">Blood Type</div>
          </div>
          <div className="text-2xl font-bold text-gray-800">
            {quantity || '-'}
            <div className="text-xs font-normal text-gray-600">Units Needed</div>
          </div>
        </div>

        <p className="text-gray-700 mb-4">{message || 'No additional details provided.'}</p>

        <button
         aria-label="Respond to blood request"
          onClick={() => setShowModal(true)}
          className="bg-red-600 text-white px-4 py-2 rounded-md w-full hover:bg-red-700 flex items-center justify-center space-x-2"
        >
          <span>Respond to Request</span>
        </button>
      </div>

      <RespondModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        requestId={id}
        token={token}
        defaultBloodType={bloodType}
        onSuccess={() => setShowModal(false)}
        user={{
          fullName: "Ama Ghana",
          age: 55,
          bloodType: "I Dont Know",
          phone: "0241234567",
          email: "amaghana@gmail.com"
        }}
      />
    </>
  );
};

export default BloodRequestCard;
