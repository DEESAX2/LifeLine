export default function RequestModal({ onClose }) {
  // Prevent background clicks from closing modal if clicked inside
  const handleClickInside = (e) => e.stopPropagation();

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 flex items-center justify-center z-50" // no dark bg
    >
      <div
        onClick={handleClickInside}
        className="bg-white border border-gray-300 rounded-lg shadow-xl p-6 w-full max-w-md relative"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-600 hover:text-black text-2xl font-bold"
        >
          &times;
        </button>

        {/* Modal Content */}
        <h2 className="text-xl font-semibold mb-4">New Blood Request</h2>

        <form className="space-y-4">
          <input
            type="text"
            placeholder="Patient Name"
            className="w-full px-4 py-2 border rounded"
          />
          <input
            type="text"
            placeholder="Blood Type"
            className="w-full px-4 py-2 border rounded"
          />
          <textarea
            placeholder="Reason"
            className="w-full px-4 py-2 border rounded"
          ></textarea>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded text-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-red-700 text-white rounded"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
