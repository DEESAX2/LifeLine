import DonorHistoryCard from "../components/DonorHistoryCard"
import UserhistoryNav from "../components/UserhistoryNav"
import { SearchIcon } from "lucide-react"

export default function DonorHistory() {

  return (
    <>

      <UserhistoryNav />

      <section className="">
        <div className="m-8 flex flex-row gap-6 ">
          <div className=" border border-gray-300 w-1/3 h-28 rounded-md flex flex-col justify-center items-center">
            <h1 className="font-bold text-3xl text-green-600">5</h1>
            <h1 className="text-gray-600 text-center">Total Donations</h1>
          </div>
          <div className=" border border-gray-300 w-1/3 h-28 rounded-md flex flex-col justify-center items-center">
            <h1 className="font-bold text-3xl text-blue-600 w-auto h-auto">5</h1>
            <h1 className="text-gray-600 text-center">Unique Donors</h1>
          </div>
          <div className=" border border-gray-300 w-1/3 h-28 rounded-md flex flex-col justify-center items-center">
            <h1 className="font-bold text-3xl text-red-600">5</h1>
            <h1 className="text-gray-600 text-center">Blood Types</h1>
          </div>
        </div>
        <div className="m-8 border border-gray-300 rounded-md  ">
          <div className="w-full h-auto">
            <h1 className="p-4 font-semibold text-2xl">Complete Donor History</h1>
            <div className="border border-gray-300 ml-4 mr-4 rounded-md w-auto h-10 flex items-center">
              <SearchIcon className="text-gray-500 w-4 h-4 ml-3 mr=3" />
              <input type="text" placeholder="Search donors by name, blood type, or email" className="w-full" />
            </div>
          </div>
          <DonorHistoryCard />
        </div>
      </section>

    </>
  )
}