import React, { useEffect, useState } from "react";
import axios from "axios";

const DonorResponses = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem("ACCESS_TOKEN");

        const response = await axios.get(
          "https://lifeline-api-w5wc.onrender.com/api/v1/hospital/appointments",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setAppointments(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch donor responses.");
        setLoading(false);
        console.error(err);
      }
    };

    fetchAppointments();
  }, []);

  if (loading) return <p>Loading appointments...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Donor Appointments</h2>
      {appointments.length === 0 ? (
        <p>No appointments found.</p>
      ) : (
        <div className="space-y-4">
          {appointments.map((appointment) => (
            <div
              key={appointment.id}
              className="border border-gray-300 p-4 rounded-md shadow-sm"
            >
              <p>
                <strong>Donor Name:</strong> {appointment.donor.fullName}
              </p>
              <p>
                <strong>Age:</strong> {appointment.donor.age}
              </p>
              <p>
                <strong>Blood Type:</strong> {appointment.donor.bloodType}
              </p>
              <p>
                <strong>Phone:</strong> {appointment.donor.phone}
              </p>
              <p>
                <strong>Email:</strong> {appointment.donor.email}
              </p>
              <p>
                <strong>Appointment Date:</strong> {appointment.date}
              </p>
              <p>
                <strong>Has Donated:</strong>{" "}
                {appointment.hasDonated ? "Yes" : "No"}
              </p>
              {appointment.message && (
                <p>
                  <strong>Message:</strong> {appointment.message}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DonorResponses;
