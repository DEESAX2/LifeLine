import React from 'react';
import { MapPin, Clock } from 'lucide-react';

const bloodRequests = [
  {
    hospital: 'Korle-Bu Teaching Hospital',
    location: 'Accra',
    time: '2 hours ago',
    urgency: 'Critical',
    urgencyColor: 'bg-red-800',
    bloodType: 'O-',
    units: 5,
    description: 'Emergency surgery patient needs immediate blood transfusion',
  },
  {
    hospital: 'Komfo Anokye Teaching Hospital',
    location: 'Kumasi',
    time: '4 hours ago',
    urgency: 'High',
    urgencyColor: 'bg-red-500',
    bloodType: 'A+',
    units: 3,
    description: 'Multiple trauma patients from road accident',
  },
  {
    hospital: '37 Military Hospital',
    location: 'Accra',
    time: '6 hours ago',
    urgency: 'medium',
    urgencyColor: 'bg-yellow-400',
    bloodType: 'A+',
    units: 6,
    description: 'Multiple trauma patients from road accident',
  },
  {
    hospital: 'Tamale Teaching Hospital',
    location: 'Tamale',
    time: '8 hours ago',
    urgency: 'High',
    urgencyColor: 'bg-red-500',
    bloodType: 'A+',
    units: 3,
    description: 'Multiple trauma patients from road accident',
  },
];

const BloodRequests = () => {
  return (
    <section className="py-12 bg-red-50 text-center">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-center mb-4 text-red-600 text-4xl">
          ❤️
        </div>
        <h2 className="text-3xl font-bold mb-2">Current Blood Requests</h2>
        <p className="text-gray-600 mb-10">
          Help save lives by responding to urgent blood requests from hospitals across Ghana
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {bloodRequests.map((req, index) => (
            <div
              key={index}
              className="bg-white border rounded-xl p-6 text-left shadow-sm hover:shadow-md transition relative"
            >
              <span
                className={`absolute top-4 right-4 text-white text-xs px-2 py-1 rounded-full ${req.urgencyColor}`}
              >
                {req.urgency}
              </span>

              <h3 className="text-xl font-semibold mb-2">{req.hospital}</h3>
              <div className="flex items-center text-gray-500 text-sm mb-1">
                <MapPin className="w-4 h-4 mr-1" />
                {req.location}
              </div>
              <div className="flex items-center text-gray-500 text-sm mb-4">
                <Clock className="w-4 h-4 mr-1" />
                {req.time}
              </div>

              <div className="flex items-center mb-4 space-x-6">
                <div className="bg-red-100 text-red-700 font-bold px-3 py-2 rounded-md">
                  {req.bloodType}
                  <div className="text-xs font-normal text-gray-600">Blood Type</div>
                </div>
                <div className="text-2xl font-bold text-gray-800">
                  {req.units}
                  <div className="text-xs font-normal text-gray-600">Units Needed</div>
                </div>
              </div>

              <p className="text-gray-700 mb-4">{req.description}</p>

              <button className="bg-red-600 text-white px-4 py-2 rounded-md w-full hover:bg-red-700 flex items-center justify-center space-x-2">
                <span>Respond to Request</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BloodRequests;
