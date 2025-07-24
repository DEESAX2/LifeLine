import React, { useEffect, useState } from "react";
import axios from "axios";

export default function DonorResponsesCard() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchName, setSearchName] = useState("");
  const [searchAge, setSearchAge] = useState("");
  const [contacted, setContacted] = useState(() => {
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
        setLoading(false);
      } catch (error) {
        console.error("Error fetching appointments:", error);
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [token]);

  const handleContacted = (id) => {
    const updated = { ...contacted, [id]: true };
    setContacted(updated);
    localStorage.setItem("contactedDonors", JSON.stringify(updated));
  };

  const filteredDonors = appointments.filter((item) => {
    const fullName = item.donor?.fullName?.toLowerCase() || "";
    const age = item.donor?.age;
    const nameMatch = fullName.includes(searchName.toLowerCase());
    const ageMatch = searchAge ? age === parseInt(searchAge) : true;
    return nameMatch && ageMatch;
  });

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Donor Responses</h2>

      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by name"
          className="border p-2 rounded w-1/2"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Search by age"
          className="border p-2 rounded w-1/2"
          value={searchAge}
          onChange={(e) => setSearchAge(e.target.value)}
        />
      </div>

      {loading ? (
        <p>Loading donors...</p>
      ) : filteredDonors.length === 0 ? (
        <p>No matching donors found.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredDonors.map((item) => {
            const donor = item.donor;
            const isContacted = contacted[donor._id];
            return (
              <div
                key={donor._id}
                className="border rounded p-4 shadow-md bg-white"
              >
                <h3 className="text-lg font-semibold">{donor.fullName}</h3>
                <p><strong>Age:</strong> {donor.age}</p>
                <p><strong>Email:</strong> {donor.email}</p>
                <p><strong>Phone:</strong> {donor.phone}</p>
                <p><strong>Blood Type:</strong> {donor.bloodType}</p>
                <p><strong>Appointment:</strong> {new Date(item.createdAt).toLocaleDateString()}</p>

                <div className="flex gap-4 mt-3">
                  <a
                    href={`tel:${donor.phone}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                    onClick={() => handleContacted(donor._id)}
                  >
                    Call
                  </a>
                  <a
                    href={`mailto:${donor.email}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    onClick={() => handleContacted(donor._id)}
                  >
                    Send Email
                  </a>
                </div>

                <p className="mt-2 text-sm text-gray-700">
                  Status:{" "}
                  <span className={isContacted ? "text-green-600" : "text-red-500"}>
                    {isContacted ? "Contacted" : "Not Contacted"}
                  </span>
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
