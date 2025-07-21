import { useState } from "react";
import { Link } from "react-router";
import blood from "../assets/Images/blood.png";
import { apiClient } from '../api/client';
import { useNavigate } from 'react-router';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setError("Please fill in both fields.");
      return;
    }
    try {
      const response = await apiClient.post("/auth/login", form, {
        headers: {
          "Content-Type": "application/json"
        }
      });
      
      localStorage.setItem("ACCESS_TOKEN", response.data.token);
      localStorage.setItem("USER_ROLE", response.data.role);
      navigate("/admin-dashboard");
    } catch (error) {
      setError(error.response?.data?.message || "Login failed.");
      console.log(error.response?.data || error.message);
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-start md:items-start justify-center bg-blue-200">
        <div className="bg-white shadow-2xl h-130 rounded-lg p-4 sm:p-4 w-full max-w-sm sm:max-w-md md:max-w-lg text-center mt-4 md:mt-10 ">
          <div className="flex justify-center mb-4 space-x-2">
            <span className="text-red-500 text-2xl"><img src={blood} alt="blood" className="w-7" /></span>
            <span className="text-buttonblue text-2xl">🏥</span>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-6">Admin Login</h2>
          </div>

          {error && (
            <div className="mb-4 text-red-600 bg-red-100 border border-red-300 rounded p-2 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 ">
            <p className="flex justify-items-start font-bold mb-0">Email</p>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter Your Email"
              className="w-full px-4 py-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
            />

            <p className="flex justify-items-start font-bold mb-0">Password</p>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full px-4 py-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <button
              type="submit"
              className="w-full py-2 mt-5 bg-red-600 text-white rounded hover:bg-red-700 transition"
            >Login</button>
          </form>

        
            <p className="mt-8">
              <Link to="/" className="text-gray-600 hover:underline">
                Back to Home
              </Link>
            </p>
          </div>
        </div>
    
    </>
  );
}