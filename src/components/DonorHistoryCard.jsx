export default function DonorHistoryCard({ donor }) {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200 hover:shadow-md transition-shadow duration-200">
      {/* Header with blood type badge */}
      <div className="bg-red-50 px-4 py-3 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-900 truncate">
          {donor.fullName || "Anonymous Donor"}
        </h2>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          donor.bloodType ? "bg-red-100 text-red-800" : "bg-gray-100 text-gray-800"
        }`}>
          {donor.bloodType || "Unknown"}
        </span>
      </div>

      {/* Donor details */}
      <div className="p-4 space-y-3">
        <div className="flex items-start">
          <svg className="h-5 w-5 text-gray-400 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <div>
            <p className="text-sm font-medium text-gray-500">Age</p>
            <p className="text-sm text-gray-900">{donor.age || "Not specified"}</p>
          </div>
        </div>

        <div className="flex items-start">
          <svg className="h-5 w-5 text-gray-400 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          <div>
            <p className="text-sm font-medium text-gray-500">Phone</p>
            <p className="text-sm text-gray-900">{donor.phone || "Not provided"}</p>
          </div>
        </div>

        <div className="flex items-start">
          <svg className="h-5 w-5 text-gray-400 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <div>
            <p className="text-sm font-medium text-gray-500">Email</p>
            <p className="text-sm text-gray-900 truncate">{donor.email || "Not provided"}</p>
          </div>
        </div>
      </div>

      {/* Footer with status */}
      <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 flex justify-between items-center">
        <div className="flex items-center">
          <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-sm font-medium text-gray-700">Completed</span>
        </div>
        <span className="text-xs text-gray-500">
          {donor.lastDonationDate ? new Date(donor.lastDonationDate).toLocaleDateString() : ""}
        </span>
      </div>
    </div>
  );
}