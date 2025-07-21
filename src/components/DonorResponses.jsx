import { useEffect, useState } from 'react';
import axios from 'axios';
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
    'scheduled': 'bg-green-100 text-green-800',
  };
  return colors[status] || 'bg-gray-100 text-gray-800';
};

const getUrgencyColor = (urgency) => {
  const colors = {
    'critical': 'bg-red-500',
    'high': 'bg-orange-500',
    'medium': 'bg-yellow-500',
    'low': 'bg-green-500',
  };
  return colors[urgency] || 'bg-gray-500';
};

const BASE_URL = import.meta.env.VITE_BASE_URL;

export default function DonorResponses() {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDonors = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get(`${BASE_URL}/hospital/appointments`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setDonors(res.data.data);
      } catch (err) {
        console.error('Error fetching donor responses:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDonors();
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-h-[80vh] overflow-y-auto">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <Users className="text-red-600" />
        Recent Donor Responses
        <span className="ml-auto text-sm bg-gray-100 text-gray-700 px-2 py-1 rounded">
          {donors.length} Active
        </span>
      </h2>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="space-y-4">
          {donors.map((donor) => (
            <div key={donor._id} className="border p-4 rounded-lg hover:shadow transition bg-white">
              <div className="flex justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${getUrgencyColor(donor.urgency)}`} />
                  <h4 className="font-semibold text-gray-900">{donor.fullName}</h4>
                  <span className={`text-xs px-2 py-1 rounded border ${getBloodTypeColor(donor.bloodType)}`}>
                    {donor.bloodType}
                  </span>
                </div>
                <span className={`text-xs px-2 py-1 rounded ${getStatusColor(donor.status)}`}>
                  {donor.status}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-700">
                <div className="flex items-center gap-2"><Mail className="w-4 h-4" /> {donor.email}</div>
                <div className="flex items-center gap-2"><Phone className="w-4 h-4" /> {donor.phone}</div>
                <div className="flex items-center gap-2"><MapPin className="w-4 h-4" /> {donor.location}</div>
                <div className="flex items-center gap-2"><Clock className="w-4 h-4" /> {donor.preferredTime}</div>
              </div>

              {donor.message && (
                <p className="mt-3 text-sm text-gray-600">
                  <Heart className="inline w-4 h-4 text-red-500 mr-1" />
                  {donor.message}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
