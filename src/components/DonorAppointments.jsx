import { useEffect, useState } from 'react';

export default function DonorAppointments() {
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/v1/hospital/appointments", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`, // replace if needed
      }
    })
      .then(res => res.json())
      .then(data => {
        setResponses(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching donor responses:', err);
        setLoading(false);
      });
  }, []);

  const markAsDonated = async (appointmentId) => {
    try {
      const res = await fetch(`/api/v1/hospital/appointments/${appointmentId}/donated`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem("token")}`, 
        }
      });

      if (!res.ok) throw new Error('Failed to update donation status');
      const updated = await res.json();

      alert('Marked as donated successfully!');

      // Optional: Refresh the list or update the status locally
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

  if (loading) return <p>Loading donor responses...</p>;

  return (
    <div className="bg-white shadow-md p-6 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Donor Appointments</h2>
      {responses.length === 0 ? (
        <p>No donor responses yet.</p>
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
