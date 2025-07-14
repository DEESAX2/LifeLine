import { CheckCircleIcon } from "lucide-react";

export default function DonorCard({ donor, onAccept, onMarkAsDone }) {
    const isAccepted = donor.accepted;

    return (
        <div className="border rounded-md mt-6 p-4 w-full border-gray-200">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                <div>
                    <div className="flex flex-wrap gap-3 items-center text-xl font-semibold">
                        <h1>{donor.name}</h1>
                        <h1 className="bg-red-200 text-red-800 w-8 h-6 flex items-center justify-center rounded-full text-sm">
                            {donor.blood}
                        </h1>
                        <h1
                            className={`w-20 h-6 rounded-full text-xs flex items-center justify-center ${isAccepted
                                    ? "bg-blue-950 text-white"
                                    : "bg-blue-100 text-blue-600"
                                }`}
                        >
                            {donor.status}
                        </h1>
                    </div>

                    <div className="mt-2 text-sm text-gray-600 font-normal">
                        <p>Email: {donor.email}</p>
                        <p>Age: {donor.age}</p>
                        <p>Contact: {donor.contact}</p>
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                        {!isAccepted ? (
                            <button
                                onClick={onAccept}
                                className="bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700 flex items-center gap-1 cursor-pointer"
                            > <CheckCircleIcon className="flex flex-row w-5 h-5" />
                                Accept Request
                            </button>
                        ) : (
                            <button
                                onClick={() => onMarkAsDone(donor)}
                                className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 flex items-center gap-1"
                            ><CheckCircleIcon className="flex flex-row w-5 h-5" />
                                Mark as Done
                            </button>
                        )}
                    </div>
                </div>
            </div>
            );
}
