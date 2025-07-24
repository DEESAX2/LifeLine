import React from 'react';
import useSWR from 'swr';
import BrqNavbar from '../components/BrqNavbar';
import BloodRequestCard from '../components/BloodRequestCard';
import { apiFetcher } from '../api/client.js';

const API_URL = '/donor/blood/request'; 

const BloodRequests = () => {
  const { data, error, isLoading } = useSWR(API_URL, apiFetcher);

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-gray-600">Loading blood requests...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-red-500">Failed to load blood requests. Please try again later.</p>
      </div>
    );
  }

  const requests = data?.requests || [];

  return (
    <>
      <BrqNavbar />
      <section className="py-12 bg-gray-100 text-center pt-28">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-2">Current Blood Requests</h2>
          <p className="text-gray-600 mb-10">
            Help save lives by responding to urgent blood requests from hospitals across Ghana.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {requests.length > 0 ? (
              requests.map((req) => (
                <BloodRequestCard key={req.id} request={req} />
              ))
            ) : (
              <p className="col-span-full text-gray-500">No blood requests at the moment.</p>
            )}
          </div>
        </div>
      </section>

      <footer className="bg-gray-200 text-center py-6 mt-12">
        <p className="text-gray-600">© 2025 LifeLine. All rights reserved.</p>
      </footer>
    </>
  );
};

export default BloodRequests;
