import { Link } from "react-router";
import blood from "../assets/Images/blood.png";


export default function Login() {
  

  return (
    <>
    <div className="min-h-screen flex  items-start md:items-start  justify-center bg-gradient-to-b from-gray-300 to-red-50">
      <div className="bg-white  shadow-2xl  h-130 rounded-lg p-4  sm:p-4 w-full max-w-sm sm:max-w-md md:max-w-lg text-center mt-4  md:mt-10 ">
      
        <div className="flex justify-center mb-4 space-x-2">
          <span className="text-red-500 text-2xl"><img src={blood} alt="blood" className="w-7" /></span>
          <span className="text-buttonblue text-2xl">🏥</span>
        </div>
        <div>
        <h2 className="text-2xl font-bold mb-6">Blood Bank Staff Login</h2>
       </div>
    
        <form className="space-y-4 ">
          <p className=" flex justify-items-start font-bold mb-0" >Email</p>
          <input
            type="email"
            placeholder="Enter Your Email"
            className="w-full px-4 py-2    border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
          />

          <p className=" flex justify-items-start font-bold mb-0">Password</p>
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <button
            type="submit"
            className="w-full py-2  mt-5 bg-buttonred text-white rounded hover:bg-red-700 transition">Login</button>
        </form>

        <div className="mt-6 text-sm">
          <p className="text-buttonblue">Don't have an account?{" "}
            <Link to="/register" className="text-buttonblue  hover:underline">Register  </Link>
          </p>
          <p className="mt-8">
            <Link to="/" className="text-gray-600 hover:underline">
              Back to Home
            </Link>
          </p>
        </div>
      </div>
    </div>
    </>
  )
}