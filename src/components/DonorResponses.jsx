import { useEffect, useState } from "react";
import axios from "axios";
import DonorCard from "../components/DonorCard";
import toast from "react-hot-toast";

export default function DonorResponses() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchName, setSearchName] = useState("");
  const [searchAge, setSearchAge] = useState("");

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

  const handleMarkCompleted = async (appointmentId) => {
    try {
      const response = await axios.patch(
        `https://lifeline-api-w5wc.onrender.com/api/v1/hospital/appointments/${appointmentId}/donated`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Donor marked as completed!");

      // Remove marked donor from current list
      setAppointments((prev) =>
        prev.filter((item) => item.id !== appointmentId)
      );
    } catch (error) {
      console.error("Failed to mark as completed:", error);
      toast.error("Failed to update donation status");
    }
  };

  const filteredAppointments = appointments.filter((item) => {
    const fullName = item.donor?.fullName?.toLowerCase() || "";
    const nameMatch = fullName.includes(searchName.toLowerCase());
    const ageMatch = searchAge
      ? item.donor?.age === parseInt(searchAge)
      : true;
    const notDonated = !item.hasDonated;
    return nameMatch && ageMatch && notDonated;
  });

  const uncontactedCount = filteredAppointments.length;

  return (
    <div className="p-6 bg-red-200">
      <div className="flex justify-between items-center mb-6">
        <div className="bg-[#008080] text-white px-4 py-2 rounded-md shadow">
          Uncontacted: <span className="font-bold">{uncontactedCount}</span>
        </div>
      </div>

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
          {filteredAppointments.map((appointment) => (
            <DonorCard
              key={appointment.id}
              donor={appointment.donor}
              appointment={appointment}
              onMarkCompleted={() => handleMarkCompleted(appointment.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
