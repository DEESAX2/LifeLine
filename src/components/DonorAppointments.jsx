import { useEffect, useState } from 'react';

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
    <div className="bg-white shadow-md p-6 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Donor Appointments</h2>
      {responses.length === 0 ? (
        <p className="text-gray-500">No donor responses yet.</p>
      ) : (
        <ul className="space-y-4">
          {responses.map((donor, idx) => (
            <li key={idx} className="border p-4 rounded-md">
              <p><strong>Name:</strong> {donor.fullName}</p>
              <p><strong>Email:</strong> {donor.email}</p>
              <p><strong>Phone:</strong> {donor.phone}</p>
              <p><strong>Blood Type:</strong> {donor.bloodType}</p>
              <p><strong>Age:</strong> {donor.age}</p>
              <p><strong>Weight:</strong> {donor.weight} kg</p>
              <p><strong>Medical Conditions:</strong> {donor.medicalConditions}</p>
              <p><strong>Status:</strong> {donor.status}</p>

              <button
                onClick={() => markAsDonated(donor._id)}
                className="mt-3 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Mark as Donated
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
