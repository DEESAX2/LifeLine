// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import DonorCard from "../components/DonorCard"; 
// import { toast } from "react-toastify";

// export default function DonorAppointments() {
//   const [responses, setResponses] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const token = localStorage.getItem("ACCESS_TOKEN");

//   useEffect(() => {
//     const fetchAppointments = async () => {
//       try {
//         const response = await axios.get(
//           "https://lifeline-api-w5wc.onrender.com/api/v1/hospital/appointments",
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         setResponses(response.data.appointments || []);
//       } catch (error) {
//         console.error("Failed to fetch appointments", error);
//         toast.error("Failed to fetch donor appointments");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAppointments();
//   }, [token]);

//   const markAsDonated = async (appointmentId) => {
//     try {
//       await axios.patch(
//         `https://lifeline-api-w5wc.onrender.com/api/v1/hospital/appointments/${appointmentId}/status`,
//         { status: "donated" },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       toast.success("Marked as donated successfully");

//       setResponses((prev) =>
//         prev.map((a) =>
//           a._id === appointmentId ? { ...a, status: "donated" } : a
//         )
//       );
//     } catch (error) {
//       console.error("Failed to update status", error);
//       toast.error("Failed to mark as donated");
//     }
//   };

//   return (
//     <div className="mt-6">
//       <h2 className="text-2xl font-bold mb-4 text-gray-800">
//         Donor Appointments
//       </h2>
//       {loading ? (
//         <p className="text-gray-600">Loading appointments...</p>
//       ) : responses.length === 0 ? (
//         <p className="text-gray-500 text-center">No donor appointments found.</p>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {responses.map((appointment) => (
//             <DonorCard
//               key={appointment._id}
//               donor={appointment}
//               onMarkAsDonated={() => markAsDonated(appointment._id)}
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }
