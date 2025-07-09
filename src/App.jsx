import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";  
import Donate from "./pages/Donate";
import DonorHistory from "./pages/DonorHistory";
import Register from "./pages/Register";
import Login from "./pages/Login";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import BloodRequests from "./pages/BloodRequests";
import NotFound from "./pages/NotFound";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import UpcomingDrives from "./components/UpcomingDrives";
import Messages from "./components/Messages" 
import BloodInventory from "./components/BloodInventory";
import { Toaster } from 'react-hot-toast';
import AdminEvents from "./components/AdminEvents";


const progressRouter = createBrowserRouter([
  { path: "/", element: <Home /> },
   { path: "/about", element: <About /> },
    { path: "/admin-dashboard", element: <AdminDashboard /> },
     { path: "/blood-requests", element: <BloodRequests /> },
      { path: "/donate", element: <Donate /> },
       { path: "/donor-history", element: <DonorHistory /> },
   { path: "/login", element: <Login /> },
   { path: "/register", element: <Register /> },
    { path: "/user-dashboard", element: <UserDashboard /> },
    { path: "/admin-dashboard", element: <AdminDashboard /> },
     { path: "/contact", element: <Contact /> },
      { path: "*", element: <NotFound /> },
      { path: "/footer", element: <Footer /> },
      { path: "/navbar", element: <Navbar /> },
      { path: "/upcoming-drives", element: <UpcomingDrives /> },
      { path: "/messages", element: <Messages /> },      
      { path: "/blood-inventory", element: <BloodInventory/> },      
      { path: "/admin-events", element: <AdminEvents/> },      
      
      
      
      
      
      
      



])

 function App() {
    
  return (
    <>
    <Toaster position="top-right"/>
    <RouterProvider router={progressRouter} />
    </>
  )
}

export default App


