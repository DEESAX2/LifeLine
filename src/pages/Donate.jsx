import React, { useState } from 'react';
import axios from 'axios';
import DonorFormNbar from '../components/DonorFormNbar';

const DonationForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    bloodType: '',
    age: '',
    hospital: '',
    appointmentDate: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    const hospitalMap = {
      'Korle-Bu Teaching Hospital': '68728a6c3e2fc43fa613da18',
      'Komfo Anokye Teaching Hospital': '68728a6c3e2fc43fa613da19',
    };

    const hospitalId = hospitalMap[formData.hospital];

    if (!hospitalId) {
      setError('Selected hospital is invalid.');
      setLoading(false);
      return;
    }

    const formattedDate = new Date(formData.appointmentDate);
    const date = `${String(formattedDate.getMonth() + 1).padStart(2, '0')}-${String(formattedDate.getDate()).padStart(2, '0')}-${formattedDate.getFullYear()}`;

    const payload = {
      hospitalId,
      fullName: formData.fullName,
      age: Number(formData.age),
      bloodType: formData.bloodType,
      phone: formData.phone,
      email: formData.email,
      date,
    };

    try {
      await axios.post(
        'https://lifeline-api-w5wc.onrender.com/api/v1/donor/appointment',
        payload
      );
      setSuccess('Appointment successfully scheduled! Thank you for donating blood.');
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        bloodType: '',
        age: '',
        hospital: '',
        appointmentDate: '',
      });
    } catch (error) {
      console.error(error);
      setError(
        error.response?.data?.message || 'Failed to schedule appointment. Please try again later.'
      );
    } finally {
      setLoading(false);
    }
  };

  const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  const hospitals = ['Korle-Bu Teaching Hospital', 'Komfo Anokye Teaching Hospital'];

  return (
    <>
      <DonorFormNbar />
      <section className="max-w-5xl mx-auto px-6 py-12 min-h-screen bg-lightblue text-gray-800 pt-24">
        <h2 className="text-4xl font-bold text-center mb-3">Schedule Your Blood Donation</h2>
        <p className="text-center text-gray-600 mb-4 text-lg">
          Thank you for choosing to save lives. Please fill out the form below to schedule your donation appointment.
        </p>

        <form
          onSubmit={handleSubmit}
          className="bg-gray-100 border-black rounded p-10 shadow space-y-6 w-full"
        >
          <h3 className="text-lg font-semibold text-red-600 flex items-center gap-2 justify-center">
            Donation Appointment Form
          </h3>

          {error && <p className="text-red-600 text-center font-semibold">{error}</p>}
          {success && <p className="text-green-600 text-center font-semibold">{success}</p>}

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
            <input name="appointmentDate" value={formData.appointmentDate} onChange={handleChange} type="date" className="input" placeholder="Preferred Date" />
          </div>

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
            className={`w-full py-2 rounded-md text-lg font-semibold mt-4 ${
              loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700 text-white'
            }`}
            disabled={loading}
          >
            {loading ? 'Scheduling...' : 'Schedule Donation Appointment'}
          </button>
        </form>
      </section>
      <footer className="bg-gray-200 text-center py-6 mt-12">
        <p className="text-gray-600">© 2025 LifeLine. All rights reserved.</p>
      </footer>
    </>
  );
};

export default DonationForm;
