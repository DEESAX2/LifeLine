import { useState } from "react";
import { Link } from "react-router";
import blood from "../assets/Images/blood.png";
import { apiClient } from "../api/client";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

  const registerHospital = async (data) => {
    try {
      console.log("Sending data:", data);
      const response = await apiClient.post("/auth/register", data, {
        headers: {
          "Content-Type": "application/json",
        }
      });
      console.log(response);

      toast.success("Registration successful! Redirecting to login...", {
        position: "top-center",
        autoClose: 2000,
      });

      setTimeout(() => {
        navigate("/login");
      }, 2500);
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed.", {
        position: "top-center",
        autoClose: 3000,
      });
      console.log(error.response?.data || error.message);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    for (const key in form) {
      if (!form[key]) {
        toast.error("Please fill all fields.", {
          position: "top-center",
          autoClose: 3000,
        });
        return;
      }
    }

    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match.", {
        position: "top-center",
        autoClose: 3000,
      });
      return;
    }

    registerHospital(form);
  };

  return (
    <>
      <div className="min-h-screen flex items-start md:items-start justify-center bg-blue-200 px-2 sm:px-4 ">
        <div className="bg-white shadow-2xl rounded-lg sm:p-4 w-full max-w-sm sm:max-w-md md:max-w-lg text-center md:mt-5">
          <div className="flex justify-center mb-4 space-x-2">
            <span className="text-red-500 text-2xl">
              <img src={blood} alt="blood" className="w-7" />
            </span>
            <span className="text-buttonblue text-2xl">🏥</span>
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Hospital Registration</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4 text-left">
            <p className="font-bold mb-0">Hospital Name</p>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter Your Hospital Name"
              className="w-full px-3 py-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
            />

            <p className="font-bold mb-0">Email <span className="text-red-600">*</span></p>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter Your Email"
              className="w-full px-3 py-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
            />

            <p className="font-bold mb-0">Password <span className="text-red-600">*</span></p>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Set Your Password"
              className="w-full px-3 py-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
            />

            <p className="font-bold mb-0">Confirm Password <span className="text-red-600">*</span></p>
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Your Password"
              className="w-full px-3 py-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
            />

            <p className="font-bold mb-0">Location</p>
            <input
              type="text"
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="Your Location"
              className="w-full px-3 py-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
            />

            <p className="font-bold mb-0">Phone Number</p>
            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Enter Your Phone Number"
              className="w-full px-3 py-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
            />

            <button
              type="submit"
              className="w-full py-2 mt-4 bg-red-600 text-white rounded hover:bg-red-700 transition"
            >
              Register
            </button>
          </form>

          <div className="mt-5 text-sm">
            <p className="text-buttonblue">
              Already have an account?{" "}
              <Link to="/login" className="text-green-600 hover:underline">
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

      <ToastContainer />
    </>
  );
}
