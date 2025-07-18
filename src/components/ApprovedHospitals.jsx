import React, { useEffect, useState } from 'react';
import { apiFetcher } from '../api/client';
import toast from 'react-hot-toast';

const ApprovedHospitals = ({ hospitals = [] }) => (
  <div className="bg-white p-6 shadow-md rounded-lg mb-8">
    <h2 className="text-lg font-semibold mb-4 text-gray-700">Approved Hospitals</h2>
    <ul>
      {hospitals.length === 0 && (
        <li className="text-gray-500">No approved hospitals.</li>
      )}
      {hospitals.map((hospital) => (
        <li key={hospital.id} className="mb-2">
          <strong>{hospital.name}</strong>
          {hospital.location ? ` — ${hospital.location}` : null}
        </li>
      ))}
    </ul>
  </div>
);

export default ApprovedHospitals;

export const ApprovedHospitalsPage = () => {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFetcher('/admin/approved-hospitals')
      .then((data) => {
        const normalised = Array.isArray(data) ? data : data?.hospitals ?? [];
        setHospitals(normalised);
      })
      .catch(() => toast.error('Failed to fetch approved hospitals'))
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
        <ApprovedHospitals hospitals={hospitals} />
      )}
    </div>
  );
};
