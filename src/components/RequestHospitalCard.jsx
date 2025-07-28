import { Droplet, Trash2, Calendar, AlertTriangle } from "lucide-react";

export default function RequestHospitalCard({
  bloodType,
  urgency,
  quantity,
  message,
  date,
  onDelete,
}) {
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const urgencyStyles = {
    high: 'bg-red-100 text-red-800',
    medium: 'bg-yellow-100 text-yellow-800',
    low: 'bg-green-100 text-green-800'
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-xs overflow-hidden flex flex-col h-full">
      {/* Compact Header */}
      <div className={`px-3 py-2 flex items-center gap-2 ${urgencyStyles[urgency]}`}>
        <AlertTriangle className="w-3 h-3" />
        <span className="text-xs font-medium capitalize">{urgency}</span>
      </div>

      {/* Compact Content */}
      <div className="p-3 flex-grow space-y-2">
        <div className="flex items-center gap-2">
          <div className="p-1 bg-red-50 rounded-md">
            <Droplet className="w-4 h-4 text-red-600" />
          </div>
          <div>
            <p className="text-[10px] text-gray-500">Blood Type</p>
            <p className="text-sm font-bold text-gray-900">{bloodType}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div>
            <p className="text-[10px] text-gray-500">Quantity</p>
            <p className="font-medium text-gray-900">
              {quantity.includes('unit') ? quantity : `${quantity} units`}
            </p>
          </div>
          <div>
            <p className="text-[10px] text-gray-500">Date</p>
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3 text-gray-400" />
              <p className="font-medium text-gray-900">{formattedDate.split(',')[0]}</p>
            </div>
          </div>
        </div>

        {message && (
          <div className="pt-1">
            <p className="text-[10px] text-gray-500">Notes</p>
            <p className="text-xs text-gray-700 line-clamp-2">
              {message}
            </p>
          </div>
        )}
      </div>

      {/* Compact Delete Button */}
      <div className="p-2 pt-0">
        <button
          onClick={onDelete}
          className="w-full py-1.5 bg-red-600 hover:bg-red-700 text-white rounded text-xs flex items-center justify-center gap-1 transition-colors"
        >
          <Trash2 className="w-3 h-3" />
          <span>Delete</span>
        </button>
      </div>
    </div>
  );
}