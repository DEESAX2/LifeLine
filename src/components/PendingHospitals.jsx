import React from 'react';

const PendingHospitals = ({ hospitals = [], onApprove, onDecline }) => (
  <div className="bg-white p-6 shadow-md rounded-lg mb-8">
    <h2 className="text-lg font-semibold mb-4 text-gray-700">Pending Hospitals</h2>
    <ul>
      {hospitals.length === 0 && <li className="text-gray-500">No pending requests.</li>}
      {hospitals.map(hospital => (
        <li key={hospital.id} className="flex justify-between items-center mb-2">
          <span>
            <strong>{hospital.name}</strong> &mdash; {hospital.email} ({hospital.location})
          </span>
          <div>
            <button
              className="bg-green-500 text-white px-3 py-1 rounded mr-2"
              onClick={() => onApprove(hospital.id)}
            >
              Approve
            </button>
            <button
              className="bg-red-500 text-white px-3 py-1 rounded"
              onClick={() => onDecline(hospital.id)}
            >
              Decline
            </button>
          </div>
        </li>
      ))}
    </ul>
  </div>
);

export default PendingHospitals;