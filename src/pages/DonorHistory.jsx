import React, { useEffect, useState } from "react";
import axios from "axios";
import DonorHistoryCard from "../components/DonorHistoryCard";
import toast from "react-hot-toast";
import { Search, Filter, X } from "lucide-react"; 
import HistoryNav from "../components/HistoryNav";

export default function DonorHistory() {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [bloodTypeFilter, setBloodTypeFilter] = useState("All");

  const token = localStorage.getItem("ACCESS_TOKEN");

  useEffect(() => {
    const fetchDonors = async () => {
      try {
        const response = await axios.get(
          "https://lifeline-api-w5wc.onrender.com/api/v1/hospital/donors",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setDonors(response.data);
      } catch (error) {
        toast.error("Failed to fetch donor history");
        console.error("Error fetching donor history:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDonors();
  }, [token]);

  const bloodTypes = ["All", ...new Set(donors.map(donor => donor?.bloodType).filter(Boolean))];

  const filteredDonors = donors.filter(donor => {
    const fullName = donor?.fullName?.toLowerCase() || "";
    const bloodType = donor?.bloodType?.toLowerCase() || "";
    
    return (
      fullName.includes(searchTerm.toLowerCase()) &&
      (bloodTypeFilter === "All" || bloodType.includes(bloodTypeFilter.toLowerCase()))
    );
  });

  return (
    <>
    <HistoryNav />
    <div className="min-h-screen bg-red-200">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Donor History</h1>
          <p className="text-gray-600 mt-2">
            {loading ? "Loading..." : `Showing ${filteredDonors.length} of ${donors.length} donors`}
          </p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search donors..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                </button>
              )}
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Filter className="h-5 w-5 text-gray-400" />
              </div>
              <select
                value={bloodTypeFilter}
                onChange={(e) => setBloodTypeFilter(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 appearance-none"
              >
                {bloodTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>
          
          {(searchTerm || bloodTypeFilter !== "All") && (
            <button
              onClick={() => {
                setSearchTerm("");
                setBloodTypeFilter("All");
              }}
              className="mt-4 text-red-600 hover:text-red-800 text-sm font-medium flex items-center"
            >
              Clear all filters
            </button>
          )}
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
          </div>
        ) : filteredDonors.length === 0 ? (
          <div className="bg-white p-8 rounded-xl shadow-sm text-center">
            <Search className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              {searchTerm || bloodTypeFilter !== "All" 
                ? "No matching donors found" 
                : "No donor records available"}
            </h3>
            <p className="text-gray-600 mb-4">
              {searchTerm || bloodTypeFilter !== "All" 
                ? "Try adjusting your search or filter criteria"
                : "Check back later for donor records"}
            </p>
            {(searchTerm || bloodTypeFilter !== "All") && (
              <button
                onClick={() => {
                  setSearchTerm("");
                  setBloodTypeFilter("All");
                }}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Clear filters
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDonors.map((donor) => (
              <DonorHistoryCard 
                key={donor.id} 
                donor={donor} 
                className="transition-transform hover:scale-[1.02]"
              />
            ))}
          </div>
        )}
      </div>
    </div>
    </>
  );
}