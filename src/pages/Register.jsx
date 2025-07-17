import { useState } from "react";
import { Link } from "react-router";
import blood from "../assets/Images/blood.png";
import { apiClient } from '../api/client';
import { useNavigate } from 'react-router';

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    location: "",
    phone: ""
  });

  
  const [error, setError] = useState("");

  const registerHospital = async (data) => {
    try {
      console.log("Sending data:", data);
      const response = await apiClient.post("/auth/register", data, {
        headers: {
          "Content-Type": "application/json",
        }
      });
      console.log(response);
      navigate("/login");
    } catch (error) {
      
      setError(error.response?.data?.message || "Registration failed.");
      console.log(error.response?.data || error.message);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(""); 
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    for (const key in form) {
      if (!form[key]) {
        setError("Please fill all fields.");
        return;
      }
    }
   
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    registerHospital(form);
  };

  return (
    <>
      <div className="min-h-screen flex items-start md:items-start justify-center bg-gradient-to-b  from-submitred px-2 sm:px-4 ">
        <div className="bg-white shadow-2xl rounded-lg sm:p-4 w-full max-w-sm sm:max-w-md md:max-w-lg text-center  md:mt-5 ">
          <div className="flex justify-center mb-4 space-x-2">
            <span className="text-red-500 text-2xl"><img src={blood} alt="blood" className="w-7" /></span>
            <span className="text-buttonblue text-2xl">🏥</span>
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Blood Bank Staff Registration</h2>
          </div>

          
          {error && (
            <div className="mb-4 text-red-600 bg-red-100 border border-red-300 rounded p-2 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4 text-left">
            <p className="font-bold mb-0">Hospital Name</p>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter Your Hospital Name"
              className="w-full px-3 py-2 sm:px-4 sm:py-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <p className="font-bold mb-0">Email</p>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter Your Email"
              className="w-full px-3 py-2 sm:px-4 sm:py-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <p className="font-bold mb-0">Password</p>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Set Your Password"
              className="w-full px-3 py-2 sm:px-4 sm:py-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <p className="font-bold mb-0">Confirm Password</p>
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Your Password"
              className="w-full px-3 py-2 sm:px-4 sm:py-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <p className="font-bold mb-0">Location</p>
            <input
              type="text"
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="Your Location"
              className="w-full px-3 py-2 sm:px-4 sm:py-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <p className="font-bold mb-0">Phone Number</p>
            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Enter Your Phone Number"
              className="w-full px-3 py-2 sm:px-4 sm:py-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <button
              type="submit"
              className="w-full py-2 mt-4 sm:mt-5 bg-buttonred text-white rounded hover:bg-red-700 transition"
            >Register</button>
          </form>

          <div className="mt-5 sm:mt-6 text-sm">
            <p className="text-buttonblue">
              Already have an account?{" "}
              <Link to="/login" className="text-buttonblue hover:underline">
                Login
              </Link>
            </p>
            <p className="mt-6">
              <Link to="/" className="text-gray-600 hover:underline">
                Back to Home
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}