import { useState } from 'react';
import { Users, Mail, Phone, Clock, MapPin, Heart } from 'lucide-react';

const dummyDonorResponses = [
  {
    id: '1',
    fullName: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    phone: '+1 (555) 123-4567',
    bloodType: 'O+',
    age: 28,
    location: 'Downtown Medical District',
    responseTime: '2 hours ago',
    status: 'new',
    urgency: 'critical'
  },
  {
    id: '2',
    fullName: 'Michael Chen',
    email: 'michael.chen@email.com',
    phone: '+1 (555) 987-6543',
    bloodType: 'A-',
    age: 35,
    location: 'East Side Clinic',
    responseTime: '4 hours ago',
    status: 'contacted',
    urgency: 'high'
  },
  {
    id: '3',
    fullName: 'Emily Rodriguez',
    email: 'emily.rodriguez@email.com',
    phone: '+1 (555) 456-7890',
    bloodType: 'B+',
    age: 42,
    location: 'Central Hospital',
    responseTime: '6 hours ago',
    status: 'scheduled',
    urgency: 'medium'
  },
  {
    id: '4',
    fullName: 'David Kim',
    email: 'david.kim@email.com',
    phone: '+1 (555) 321-0987',
    bloodType: 'AB-',
    age: 31,
    location: 'Westside Medical Center',
    responseTime: '8 hours ago',
    status: 'new',
    urgency: 'low'
  }
];

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

export default function DonorResponses() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-h-[80vh] overflow-y-auto">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <Users className="text-red-600" />
        Recent Donor Responses
        <span className="ml-auto text-sm bg-gray-100 text-gray-700 px-2 py-1 rounded">
          {dummyDonorResponses.length} Active
        </span>
      </h2>
      <div className="space-y-4">
        {dummyDonorResponses.map((donor) => (
          <div key={donor.id} className="border p-4 rounded-lg hover:shadow transition bg-white">
            <div className="flex justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${getUrgencyColor(donor.urgency)}`} />
                <h4 className="font-semibold text-gray-900">{donor.fullName}</h4>
                <span className={`text-xs px-2 py-1 rounded border ${getBloodTypeColor(donor.bloodType)}`}>
                  {donor.bloodType}
                </span>
              </div>
              <span className={`text-xs px-2 py-1 rounded ${getStatusColor(donor.status)}`}>
                {donor.status.charAt(0).toUpperCase() + donor.status.slice(1)}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-700 mb-3">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gray-400" />
                {donor.email}
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gray-400" />
                {donor.phone}
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gray-400" />
                {donor.location}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-400" />
                {donor.responseTime}
              </div>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Age: {donor.age}</span>
              <button className="flex items-center gap-1 text-sm bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700">
                <Heart className="w-4 h-4" /> Contact
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
