import { useState } from "react";

export default function DonorCard({ donor, appointment, onMarkCompleted }) {
  const [isCompleted, setIsCompleted] = useState(false);

  const handleMarkCompleted = async () => {
    if (onMarkCompleted) {
      await onMarkCompleted();
      setIsCompleted(true);
    }
  };

  const formattedDate = appointment?.date
    ? new Date(appointment.date).toLocaleDateString("en-GB")
    : "N/A";

  return (
    <div className="bg-white p-4 rounded-lg shadow-md border">
      <h3 className="text-lg font-bold mb-2">{donor?.fullName}</h3>
      <p className="text-sm"><strong>Age:</strong> {donor?.age}</p>
      <p className="text-sm"><strong>Email:</strong> {donor?.email}</p>
      <p className="text-sm"><strong>Phone:</strong> {donor?.phone}</p>
      <p className="text-sm"><strong>Blood Type:</strong> {donor?.bloodType}</p>
      <p className="text-sm"><strong>Appointment:</strong> {formattedDate}</p>

      <p className="text-sm mt-2">
        <strong>Status:</strong>{" "}
        <span className={isCompleted ? "text-green-600 font-semibold" : "text-yellow-600 font-semibold"}>
          {isCompleted ? "Completed" : "Pending"}
        </span>
      </p>

      <div className="mt-4 flex gap-2">
        {/* Email Button */}
        {donor?.email && (
          <a
            href={`mailto:${donor.email}`}
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-1 rounded cursor-pointer"
          >
            Email
          </a>
        )}

        {/* Mark Completed Button */}
        <button
          onClick={handleMarkCompleted}
          className="bg-green-700 hover:bg-green-800 text-white text-sm px-4 py-1 rounded cursor-pointer disabled:opacity-50"
          disabled={isCompleted}
        >
          {isCompleted ? "Marked as Completed" : "Mark as Completed"}
        </button>
      </div>
    </div>
  );
}
