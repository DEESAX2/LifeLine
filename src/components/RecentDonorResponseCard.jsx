import React, { useEffect, useState } from 'react';
import { Users, Mail, Phone, Clock, MapPin, Heart } from 'lucide-react';

const getBloodTypeColor = (bloodType) => {
  const colors = {
    'O+': 'bg-red-100 text-red-800 border-red-200',
    'O-': 'bg-red-100 text-red-800 border-red-200',
    'A+': 'bg-blue-100 text-blue-800 border-blue-200',
    'A-': 'bg-blue-100 text-blue-800 border-blue-200',
    'B+': 'bg-green-100 text-green-800 border-green-200',
    'B-': 'bg-green-100 text-green-800 border-green-200',
    'AB+': 'bg-purple-100 text-purple-800 border-purple-200',
    'AB-': 'bg-purple-100 text-purple-800 border-purple-200',
  };
  return colors[bloodType] || 'bg-gray-100 text-gray-800 border-gray-200';
};

const getStatusColor = (status) => {
  const colors = {
    'new': 'bg-yellow-100 text-yellow-800',
    'contacted': 'bg-blue-100 text-blue-800',
    'scheduled': 'bg-green-100 text-green-800'
  };
  return colors[status] || 'bg-gray-100 text-gray-800';
};

const getUrgencyColor = (urgency) => {
  const colors = {
    'critical': 'bg-red-500',
    'high': 'bg-orange-500',
    'medium': 'bg-yellow-500',
    'low': 'bg-green-500'
  };
  return colors[urgency] || 'bg-gray-500';
};

const RecentDonorResponseCard = () => {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDonors = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch("https://lifeline-api-w5wc.onrender.com/api/v1/hospital/appointments");
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Handle different response formats
        const donorsData = Array.isArray(data) ? data : 
                          (data.data || data.donors || data.results || []);
        
        setDonors(donorsData);
      } catch (err) {
        console.error("Failed to fetch donor responses:", err);
        setError(err.message);
        setDonors([]); // Fallback to empty array
      } finally {
        setLoading(false);
      }
    };

    fetchDonors();
  }, []);

  if (loading) return <p>Loading donor responses...</p>;

  return (
    <div className="bg-white rounded-lg shadow p-6 h-full">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-red-100 rounded-lg">
          <Users className="w-5 h-5 text-red-600" />
        </div>
        <h2 className="text-lg font-semibold">Recent Donor Responses</h2>
        <span className="ml-auto bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-full">
          {donors.length} Active
        </span>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-yellow-100 text-yellow-800 rounded">
          Warning: {error}. Showing fallback data.
        </div>
      )}

      <div className="space-y-4 max-h-[400px] overflow-y-auto">
        {donors.map((donor) => (
          <div key={donor.id} className="border border-gray-200 rounded-lg p-4 hover:shadow transition bg-white">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${getUrgencyColor(donor.urgency || 'low')}`} />
                <h4 className="font-semibold">{donor.fullName}</h4>
                <span className={`px-2 py-0.5 text-xs rounded-full border ${getBloodTypeColor(donor.bloodType)}`}>
                  {donor.bloodType}
                </span>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(donor.status || 'new')}`}>
                {donor.status?.charAt(0).toUpperCase() + donor.status?.slice(1) || 'New'}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Mail className="w-3 h-3 text-gray-400" />
                <span>{donor.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3 h-3 text-gray-400" />
                <span>{donor.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3 h-3 text-gray-400" />
                <span>{donor.location || 'N/A'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3 h-3 text-gray-400" />
                <span>{donor.responseTime || 'Just now'}</span>
              </div>
            </div>

            <div className="flex justify-between items-center mt-3">
              <span className="text-sm text-gray-500">Age: {donor.age}</span>
              <button className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white text-xs px-3 py-1 rounded">
                <Heart className="w-3 h-3" />
                Contact
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentDonorResponseCard;