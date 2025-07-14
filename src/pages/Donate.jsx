import React, { useState } from 'react';

const DonationForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    bloodType: '',
    age: '',
    hospital: '',
    preferredDate: '',
    preferredTime: '',
    lastDonationDate: '',
    medicalConditions: '',
    additionalNotes: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // TODO: send formData to backend
  };

  const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  const hospitals = ['Korle-Bu Teaching Hospital', 'Komfo Anokye Teaching Hospital'];

  return (
    <section className="max-w-3xl mx-auto px-4 py-12">
      <h2 className="text-4xl font-bold text-center mb-3">Schedule Your Blood Donation</h2>
      <p className="text-center text-gray-600 mb-4 text-lg">
        Thank you for choosing to save lives. Please fill out the form below to schedule your donation appointment.
      </p>

      <form
        onSubmit={handleSubmit}
        className="bg-white border rounded-xl p-6 shadow space-y-4"
      >
        <h3 className="text-lg font-semibold text-red-600 flex items-center gap-2 justify-center">
          Donation Appointment Form
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input name="fullName" value={formData.fullName} onChange={handleChange} required placeholder="Full Name" className="input" />
          <input name="email" value={formData.email} onChange={handleChange} required placeholder="Email Address" type="email" className="input" />
          <input name="phone" value={formData.phone} onChange={handleChange} required placeholder="Phone Number" className="input" />
          <select name="bloodType" value={formData.bloodType} onChange={handleChange} required className="input">
            <option value="">Select blood type</option>
            {bloodTypes.map(bt => <option key={bt} value={bt}>{bt}</option>)}
          </select>
          <input name="age" value={formData.age} onChange={handleChange} placeholder="Age" type="number" required className="input" />
          <select name="hospital" value={formData.hospital} onChange={handleChange} required className="input">
            <option value="">Select a hospital</option>
            {hospitals.map(h => <option key={h} value={h}>{h}</option>)}
          </select>
          <input name="preferredDate" value={formData.preferredDate} onChange={handleChange} type="date" className="input" placeholder="Preferred Date" />
          <input name="preferredTime" value={formData.preferredTime} onChange={handleChange} type="time" className="input" placeholder="Preferred Time" />
        </div>

        <input name="lastDonationDate" value={formData.lastDonationDate} onChange={handleChange} type="date" className="input" placeholder="Last Donation Date" />

        <textarea
          name="medicalConditions"
          value={formData.medicalConditions}
          onChange={handleChange}
          rows="2"
          className="input"
          placeholder="Medical Conditions or Medications"
        />

        <textarea
          name="additionalNotes"
          value={formData.additionalNotes}
          onChange={handleChange}
          rows="2"
          className="input"
          placeholder="Additional Notes"
        />

        <div className="bg-blue-50 border border-blue-200 text-sm text-gray-700 p-4 rounded-md space-y-1">
          <p><strong>Before You Donate:</strong></p>
          <ul className="list-disc pl-5">
            <li>Eat a healthy meal 2 hours before donating</li>
            <li>Drink plenty of water and avoid alcohol</li>
            <li>Get a good night's sleep</li>
            <li>Bring a valid ID</li>
            <li>Wear comfortable clothing with sleeves that roll up easily</li>
          </ul>
        </div>

        <button
          type="submit"
          className="bg-red-600 text-white w-full py-2 rounded-md hover:bg-red-700 text-lg font-semibold mt-4"
        >
          Schedule Donation Appointment
        </button>
      </form>
    </section>
  );
};

export default DonationForm;
