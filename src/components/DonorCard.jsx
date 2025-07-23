import { CalendarCheck, Phone } from 'lucide-react';

export default function DonorCard({ donor, onMarkAsDonated }) {
  return (
    <div className="bg-[#008080] text-white rounded-xl shadow-md p-6 flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
      {/* Left section */}
      <div className="flex-1">
        <h3 className="text-lg font-semibold">{donor.fullName || "Unnamed Donor"}</h3>
        <p className="text-sm mt-1">{donor.email}</p>
        <p className="text-sm mt-1">Blood Type: {donor.bloodGroup || "N/A"}</p>
        <p className="text-sm mt-1">
          Appointment Date:{" "}
          {donor.appointment
            ? new Date(donor.appointment).toLocaleDateString()
            : "N/A"}
        </p>

        {donor.status !== "donated" ? (
          <button
            className="mt-3 bg-white text-[#008080] px-4 py-1 rounded-full text-sm font-semibold hover:bg-gray-100"
            onClick={onMarkAsDonated}
          >
            Mark as Donated
          </button>
        ) : (
          <span className="mt-3 inline-block text-green-300 font-semibold">
            Already Donated
          </span>
        )}
      </div>

      {/* Right section */}
      <div className="flex sm:flex-col items-center gap-4 sm:items-end">
        <CalendarCheck className="w-8 h-8" />
        <a href={`tel:${donor.phoneNumber}`}>
          <Phone className="w-6 h-6 text-white hover:text-gray-200" />
        </a>
      </div>
    </div>
  );
}
