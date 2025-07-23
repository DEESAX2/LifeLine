import React, { useEffect, useState } from "react";
import DashboardNav from "./DashboardNav";

export default function DonorHistory() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("donorHistory");
    if (stored) {
      setHistory(JSON.parse(stored));
    }
  }, []);

  const handleUndo = (donorId) => {
    // Remove from donorHistory
    const updatedHistory = history.filter(item => item.donor?.id !== donorId);
    setHistory(updatedHistory);
    localStorage.setItem("donorHistory", JSON.stringify(updatedHistory));

    // Remove from contactedDonors lookup
    const contacted = JSON.parse(localStorage.getItem("contactedDonors")) || {};
    delete contacted[donorId];
    localStorage.setItem("contactedDonors", JSON.stringify(contacted));
  };

  return (

    <>
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Donor History</h2>

      {history.length === 0 ? (
        <p>No completions yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {history.map((appointment) => {
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
                <p className="text-sm"><strong>Completed On:</strong> {new Date(appointment.createdAt).toLocaleDateString()}</p>

                <button
                  onClick={() => handleUndo(donor?.id)}
                  className="mt-3 bg-yellow-600 hover:bg-yellow-700 text-white text-sm px-4 py-1 rounded"
                >
                  Undo Completion
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
    </>
  );
}
