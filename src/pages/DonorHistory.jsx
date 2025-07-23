import React, { useEffect, useState } from "react";
import DashboardNav from "../components/DashboardNav";

export default function DonorHistory() {
  const [donorHistory, setDonorHistory] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [searchAge, setSearchAge] = useState("");

  useEffect(() => {
    const history = JSON.parse(localStorage.getItem("donorHistory")) || [];
    setDonorHistory(history);
  }, []);

  const filteredHistory = donorHistory.filter((appointment) => {
    const donor = appointment.donor || {};
    const nameMatch = donor.fullName
      ?.toLowerCase()
      .includes(searchName.toLowerCase());
    const ageMatch = searchAge
      ? donor.age === parseInt(searchAge)
      : true;
    return nameMatch && ageMatch;
  });

  return (
    <>
    <DashboardNav />
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Donor History</h2>

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

      {filteredHistory.length === 0 ? (
        <p>No donor history available.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHistory.map((appointment, index) => {
            const donor = appointment.donor || {};
            return (
              <div
                key={index}
                className="bg-white p-4 rounded-lg shadow-md border"
              >
                <h3 className="text-lg font-bold mb-2">{donor.fullName}</h3>
                <p className="text-sm"><strong>Age:</strong> {donor.age}</p>
                <p className="text-sm"><strong>Email:</strong> {donor.email}</p>
                <p className="text-sm"><strong>Phone:</strong> {donor.phone}</p>
                <p className="text-sm"><strong>Blood Type:</strong> {donor.bloodType}</p>
                <p className="text-sm">
                  <strong>Appointment:</strong>{" "}
                  {new Date(appointment.createdAt).toLocaleDateString()}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
    </>
  );
}
