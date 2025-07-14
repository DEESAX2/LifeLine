import { SearchIcon } from "lucide-react";
import DonorCard from "./DonorCard";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function DashboardContent() {

    const [doneDonors, setDoneDonors] = useState([]);
    const navigate = useNavigate();

    const [activeDonors, setActiveDonors] = useState([
        {
            name: "John Doe", email: "johndoe@example.com", age: 34, contact: "+233 555 123 456",
            blood: "O-", status: "pending", accepted: false,
        },

        {
            name: "Mary Jane", email: "maryj@example.com", age: 29, contact: "+233 555 789 456",
            blood: "A+", status: "pending", accepted: false,
        },
    ]);

    const handleAccept = (email) => {
        setActiveDonors((prev) =>
            prev.map((donor) =>
                donor.email === email ? { ...donor, accepted: true, status: "accepted" } : donor
            )
        );
    };


    const handleMarkAsDone = (donor) => {
        setActiveDonors((prev) => prev.filter((d) => d.email !== donor.email));
        setDoneDonors((prev) => [...prev, donor]);
    };

    const goToHistory = () => {
        navigate("/donor-history", { state: { donors: doneDonors } });
    };

    {
        activeDonors.map((donor, index) => (
            <DonorCard
                key={index}
                donor={donor}
                onAccept={() => handleAccept(donor.email)}
                onMarkAsDone={handleMarkAsDone}
            />
        ))
    }





    return (

        <>

            <div className="mr-3">
                <div className="flex flex-row gap-8">
                    <div className="border border-gray-200 w-48 sm:w-48 md:w-56 lg:w-64 h-20 flex flex-col items-center justify-center rounded-md">
                        <h1 className="font-bold text-2xl text-red-600">12</h1>
                        <h1 className="text-sm text-center">Total Requests</h1>
                    </div>
                    <div className="border border-gray-200 w-48 sm:w-48 md:w-56 lg:w-64 h-20 flex flex-col items-center justify-center rounded-md">
                        <h1 className="font-bold text-2xl text-blue-700">2</h1>
                        <h1 className="text-sm text-center">Active Responses</h1>
                    </div>
                    <div className="border border-gray-200 w-48 sm:w-48 md:w-56 lg:w-64 h-20 flex flex-col items-center justify-center rounded-md">
                        <h1 className="font-bold text-2xl text-orange-600">1</h1>
                        <h1 className="text-sm text-center">Pending</h1>
                    </div>
                    <div className="border border-gray-200 w-48 sm:w-48 md:w-56 lg:w-64 h-20 flex flex-col items-center justify-center rounded-md">
                        <h1 className="font-bold text-2xl text-green-600">1</h1>
                        <h1 className="text-sm text-center">Completed</h1>
                    </div>
                </div>

                <div className="border border-gray-200 w-full h-auto mt-7">
                    <div className="ml-5 mr-5 mt-5 mb-5">
                        <h1 className="text-2xl font-semibold">Donor Responses</h1>
                        <div className=" border border-gray-200 w-full h-10 rounded-md flex items-center ">
                            <SearchIcon className="text-gray-500 w-4 h-4 ml-3 mr=3" />
                            <input type="text" placeholder="Search donors by name, blood type, or email" className="w-full" />
                        </div>
                        <div className="p-6">
                            {activeDonors.map((donor, index) => (
                                <DonorCard
                                    key={index}
                                    donor={donor}
                                    onAccept={() => handleAccept(donor.email)}
                                    onMarkAsDone={handleMarkAsDone}
                                />
                            ))}

                        </div>

                    </div>
                </div>

            </div>
        </>

    );
}