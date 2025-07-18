import React, { useEffect, useState } from 'react';
import { apiFetcher } from '../api/client';
import toast from 'react-hot-toast';

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

export const PendingHospitalsPage = () => {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFetcher('/admin/pending/hospitals')
      .then((data) => {
        const normalised = Array.isArray(data) ? data : data?.hospitals ?? [];
        setHospitals(normalised);
      })
      .catch(() => toast.error('Failed to fetch pending hospitals'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen p-6 bg-red-100">
      <a href="/admin-dashboard" className="flex items-center text-red-500 mb-4 hover:underline">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-1">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
        </svg>
        Back to Dashboard
      </a>
      {loading ? (
        <p className="text-center">Loading…</p>
      ) : (
        <PendingHospitals hospitals={hospitals} onApprove={() => {}} onDecline={() => {}} />
      )}
    </div>
  );
};