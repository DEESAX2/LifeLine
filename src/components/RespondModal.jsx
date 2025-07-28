import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';

const backdrop = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modal = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 300, damping: 25 } },
  exit: { opacity: 0, y: -30, scale: 0.95, transition: { duration: 0.2 } },
};

const RespondModal = ({ isOpen, onClose, requestId, token, defaultBloodType }) => {
  const [form, setForm] = useState({
    fullName: '',
    age: '',
    bloodType: '',
    phone: '',
    email: '',
    date: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    if (isOpen && defaultBloodType) {
      setForm((prev) => ({ ...prev, bloodType: defaultBloodType }));
    }
  }, [isOpen, defaultBloodType]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(
        `https://lifeline-api-w5wc.onrender.com/api/v1/donor/blood/request/${requestId}/appointment`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(form),
        }
      );

      if (!res.ok) throw new Error('Failed to create appointment');

      toast.success('🎉 Appointment booked successfully. The hospital will reach out!');
      setForm({
        fullName: '',
        age: '',
        bloodType: defaultBloodType || '',
        phone: '',
        email: '',
        date: '',
        message: '',
      });

      setTimeout(() => {
        onClose();
      }, 3000);
    } catch (err) {
      toast.error(`❌ ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const isFormValid =
    form.fullName &&
    form.age &&
    form.bloodType &&
    form.phone &&
    form.email &&
    form.date;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 bg-lightblue bg-opacity-40 flex items-center justify-center px-4 sm:px-6"
          variants={backdrop}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <motion.div
            className="bg-white w-full max-w-md max-h-[90vh]  p-6"
            variants={modal}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <button
              onClick={onClose}
              aria-label="Close modal"
              className="absolute top-3 right-3 text-gray-500 hover:text-red-600 text-2xl"
            >
              ✕
            </button>

            <h2 className="text-xl font-semibold mb-2 text-red-600">Make an Appointment</h2>

            {defaultBloodType && (
              <p className="text-sm text-gray-700 mb-4">
                You're responding to a request for blood type: <strong>{defaultBloodType}</strong>.
                Please fill in your details to book an appointment.
              </p>
            )}

            <form onSubmit={handleSubmit} className="space-y-3 text-sm">
              <input
                name="fullName"
                placeholder="Full Name"
                value={form.fullName}
                onChange={handleChange}
                required
                className="w-full border p-2 "
              />
              <input
                type="number"
                name="age"
                placeholder="Age"
                value={form.age}
                onChange={handleChange}
                required
                min={16}
                className="w-full border p-2 rounded"
              />
              <select
                name="bloodType"
                value={form.bloodType}
                onChange={handleChange}
                required
                className="w-full border p-2 rounded"
              >
                <option value="">Select Blood Type</option>
                {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', 'I Dont Know'].map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              <input
                name="phone"
                placeholder="Phone Number"
                value={form.phone}
                onChange={handleChange}
                required
                className="w-full border p-2 rounded"
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full border p-2 rounded"
              />
              <input
                type="date"
                name="date"
                placeholder='date'
                value={form.date}
                onChange={handleChange}
                min={today}
                required
                className="w-full border p-2 rounded"
              />
              <textarea
                name="message"
                placeholder="Message (optional)"
                value={form.message}
                onChange={handleChange}
                rows={3}
                className="w-full border p-2 rounded"
              />
              <button
                type="submit"
                disabled={loading || !isFormValid}
                className={`w-full py-2 rounded text-white font-medium transition-all ${
                  loading || !isFormValid
                    ? 'bg-red-300 cursor-not-allowed'
                    : 'bg-red-600 hover:bg-red-700'
                }`}
              >
                {loading ? 'Submitting...' : 'Confirm Appointment'}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RespondModal;
