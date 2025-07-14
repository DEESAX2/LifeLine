import doctorprof from "../assets/Images/doctorprof.jpg"
import { HospitalIcon, LocateIcon, Mail, Phone } from "lucide-react";
import { User } from "lucide-react";

export default function UserProfile() {
    return (

        <div>

            <div className="flex flex-row items-center gap-2" >
                <User />
                <h1 className=" text-2xl font-semibold">Profile</h1>
            </div>
            <div className="flex flex-col items-center mt-8">
                <div className="w-24 h-24 rounded-full overflow-hidden border border-gray-300">
                    <img
                        src={doctorprof}
                        alt="User profile"
                        className="w-full h-full object-cover"
                    />
                </div>

                <h1 className="mt-3 text-lg font-semibold text-center w-max">
                    Dr. Desdemona Kponyo
                </h1>
                <h2 className="text-sm text-gray-500">Blood Bank Technologist</h2>
            </div>

            <div className="mt-4 flex items-center gap-2 flex-row text-sm text-gray-500">
                <HospitalIcon className="w-4 h-4 text-blue-700" />
                <h1> Korle-Bu Teaching Hospital</h1>
            </div>
            <div className="mt-4 flex items-center gap-2 flex-row text-sm text-gray-500">
                <LocateIcon className="w-4 h-4 text-green-700" />
                <h1>Accra, Ghana</h1>
            </div>
            <div className="mt-4 flex items-center gap-2 flex-row text-sm text-gray-500">
                <Mail className="w-4 h-4 text-red-700" />
                <h1>desdemonakponyo@kbth.gov.gh</h1>
            </div>
            <div className="mt-4 flex items-center gap-2 flex-row text-sm text-gray-500">
                <Phone className="w-4 h-4 text-orange-700" />
                <h1>0244567890</h1>
            </div>

        </div>
    );
}