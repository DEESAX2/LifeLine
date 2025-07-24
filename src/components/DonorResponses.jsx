import React, { useEffect, useState } from "react";
import axios from "axios";

export default function DonorResponses() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchName, setSearchName] = useState("");
  const [searchAge, setSearchAge] = useState("");

  const [contactedDonors, setContactedDonors] = useState(() => {
    const stored = localStorage.getItem("contactedDonors");
    return stored ? JSON.parse(stored) : {};
  });

  const token = localStorage.getItem("ACCESS_TOKEN");

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(
          "https://lifeline-api-w5wc.onrender.com/api/v1/hospital/appointments",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setAppointments(response.data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [token]);

  const handleContactClick = (donorId, donorData) => {
    const updated = { ...contactedDonors, [donorId]: true };
    setContactedDonors(updated);
    localStorage.setItem("contactedDonors", JSON.stringify(updated));

    // Save to donor history
    const history = JSON.parse(localStorage.getItem("donorHistory")) || [];
    localStorage.setItem("donorHistory", JSON.stringify([...history, donorData]));

    // Remove from UI
    setAppointments((prev) =>
      prev.filter((item) => item.donor?.id !== donorId)
    );
  };

  const filteredAppointments = appointments.filter((item) => {
    const fullName = item.donor?.fullName?.toLowerCase() || "";
    const nameMatch = fullName.includes(searchName.toLowerCase());
    const ageMatch = searchAge
      ? item.donor?.age === parseInt(searchAge)
      : true;
    const isContacted = contactedDonors[item.donor?.id];
    return nameMatch && ageMatch && !isContacted;
  });

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Donor Responses</h2>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by name"
          className="border border-gray-300 rounded-md p-2 w-full sm:w-1/2"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Search by age"
          className="border border-gray-300 rounded-md p-2 w-full sm:w-1/2"
          value={searchAge}
          onChange={(e) => setSearchAge(e.target.value)}
        />
      </div>

      {loading ? (
        <p>Loading donor responses...</p>
      ) : filteredAppointments.length === 0 ? (
        <p>No matching donors found.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAppointments.map((appointment) => {
            const donor = appointment.donor;

            return (
              <div
                key={appointment.id}
                className="bg-white p-4 rounded-lg shadow-md border"
              >
                <h3 className="text-lg font-bold mb-2">{donor?.fullName}</h3>
                <p className="text-sm"><strong>Age:</strong> {donor?.age}</p>
                <p className="text-sm"><strong>Email:</strong> {donor?.email}</p>
                <p className="text-sm"><strong>Phone:</strong> {donor?.phone}</p>
                <p className="text-sm"><strong>Blood Type:</strong> {donor?.bloodType}</p>
                <p className="text-sm">
                  <strong>Appointment:</strong> {new Date(appointment.createdAt).toLocaleDateString()}
                </p>

                <div className="flex gap-3 mt-4">
                  <a
                    href={`mailto:${donor?.email}`}
                    className="bg-blue-600 text-white text-sm px-4 py-1 rounded hover:bg-blue-700"
                  >
                    Email
                  </a>
                  <a
                    href={`tel:${donor?.phone}`}
                    className="bg-green-600 text-white text-sm px-4 py-1 rounded hover:bg-green-700"
                  >
                    Call
                  </a>
                  <button
                    onClick={() => handleContactClick(donor?.id, appointment)}
                    className="bg-red-600 hover:bg-purple-700 text-white text-sm px-4 py-1 rounded"
                  >
                    Completed
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
