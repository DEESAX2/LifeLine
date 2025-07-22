import { useEffect, useState } from 'react';
import DonorCard from './DonorCard'; // ✅ Make sure the path is correct based on your project

export default function DonorAppointments() {
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://lifeline-api-w5wc.onrender.com/api/v1/hospital/appointments", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log("Donor appointment API response:", data);

        const appointments = Array.isArray(data)
          ? data
          : Array.isArray(data.data)
          ? data.data
          : [];

        setResponses(appointments);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching donor responses:', err);
        setLoading(false);
      });
  }, []);

  const markAsDonated = async (appointmentId) => {
    try {
      const res = await fetch(`https://lifeline-api-w5wc.onrender.com/api/v1/hospital/appointments/${appointmentId}/donated`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
      });

      if (!res.ok) throw new Error('Failed to update donation status');
      const updated = await res.json();

      alert('Marked as donated successfully!');

      // ✅ Update UI after marking as donated
      setResponses(prev =>
        prev.map(item =>
          item._id === appointmentId ? { ...item, status: 'donated' } : item
        )
      );
    } catch (err) {
      console.error(err);
      alert('Error marking as donated.');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <svg className="animate-spin h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
        </svg>
        <p className="ml-2 text-gray-700">Loading donor responses...</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Donor Appointments</h2>

      {responses.length === 0 ? (
        <p className="text-gray-500 text-center">No donor responses yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {responses.map((donor, idx) => (
            <DonorCard
              key={donor._id || idx}
              donor={donor}
              onMarkAsDonated={() => markAsDonated(donor._id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
