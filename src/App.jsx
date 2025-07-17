import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";  
import Donate from "./pages/Donate";
import DonorHistory from "./pages/DonorHistory";
import Register from "./pages/Register";
import Login from "./pages/Login";
import HospitalDashboard from "./pages/HospitalDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import BloodRequests from "./pages/BloodRequests";
import NotFound from "./pages/NotFound";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import UpcomingDrives from "./components/UpcomingDrives";
import BloodInventory from "./components/BloodInventory";
import { Toaster } from 'react-hot-toast';
import AdminEvents from "./components/AdminEvents";
import AdminLogin from "./pages/AdminLogin";
import OurTeam from "./pages/OurTeam";
import UserDashboard from "./pages/HospitalDashboard";
 

const progressRouter = createBrowserRouter([
  { path: "/", element: <Home /> },
   { path: "/about", element: <About /> },
    { path: "/admin-dashboard", element: <AdminDashboard /> },
     { path: "/blood-requests", element: <BloodRequests /> },
      { path: "/donate", element: <Donate /> },
       { path: "/donor-history", element: <DonorHistory /> },
   { path: "/login", element: <Login /> },
   { path: "/register", element: <Register /> },
    { path: "/hospital-dashboard", element: <HospitalDashboard /> },
    { path: "/admin-dashboard", element: <AdminDashboard /> },
     { path: "/contact", element: <Contact /> },
      { path: "*", element: <NotFound /> },
      { path: "/footer", element: <Footer /> },
      { path: "/navbar", element: <Navbar /> },
      { path: "/upcoming-drives", element: <UpcomingDrives /> },      
      { path: "/blood-inventory", element: <BloodInventory/> },      
      { path: "/admin-events", element: <AdminEvents/> },      
       { path: "/admin-login", element: <AdminLogin/> },  
       { path: "/team", element: <OurTeam/> },
       { path: "/user-dashboard", element: <UserDashboard /> } 


      
      
      
      
      
      
      



])

import React, { useState, useEffect } from 'react';
import Preloader from './components/Preloader';

 function App() {
    
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handle = setTimeout(() => setLoading(false), 1200); // artificial delay
    return () => clearTimeout(handle);
  }, []);

  return (
    <>
    <Toaster position="top-right"/>
    {loading && <Preloader />}
    <RouterProvider router={progressRouter} />
    </>
  )
}

export default App


