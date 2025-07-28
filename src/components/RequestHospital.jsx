import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RequestHospitalCard from "../components/RequestHospitalCard";
import toast from 'react-hot-toast';
import { Loader2 } from 'lucide-react';

export default function RequestHospital() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    try {
      const res = await axios.get(
        'https://lifeline-api-w5wc.onrender.com/api/v1/hospital/blood-requests',
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`,
          },
        }
      );
      const cleanedRequests = res.data.map(({ hospital, ...rest }) => rest);
      setRequests(cleanedRequests);
    } catch (error) {
      toast.error('Failed to fetch blood requests.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://lifeline-api-w5wc.onrender.com/api/v1/hospital/delete/blood-requests/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`,
          },
        }
      );
      // Optimistic update + refresh data
      setRequests(prev => prev.filter(req => req.id !== id));
      toast.success("Request deleted successfully");
      fetchRequests(); // Refresh data immediately
    } catch (error) {
      console.error("Delete error:", error);
      toast.error(
        error.response?.data?.message || "Failed to delete request"
      );
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin text-red-600 w-8 h-8" />
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {requests.length > 0 ? (
          requests.map((req) => (
            <RequestHospitalCard
              key={req.id}
              bloodType={req.bloodType}
              urgency={req.urgency}
              quantity={req.quantity}
              message={req.message}
              date={req.date}
              onDelete={() => handleDelete(req.id)}
            />
          ))
        ) : (
          <p className="text-gray-500 col-span-full text-center py-8">
            No blood requests found
          </p>
        )}
      </div>
    </div>
  );
}