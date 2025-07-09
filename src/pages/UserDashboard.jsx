import Dashboardnav from "../components/Dashboardnav.jsx"

export default function UserDashboard() {

  return (
    <>

      <Dashboardnav />
      <section className="mt-7">
        <div className="flex flex-col md:flex-row w-full h-screen p-4 gap-4">
          {/* Left Section */}
          <div className="md:w-1/3 w-full border border-gray-300 p-4 rounded">
            <h2 className="text-lg font-semibold mb-2">Left Section</h2>
            <p> user profile</p>
          </div>

          {/* Right Section */}
          <div className="md:w-2/3 w-full border border-gray-300 p-4 rounded">
            <h2 className="text-lg font-semibold mb-2">Right Section</h2>
            <p> main dashboard content.</p>
          </div>
        </div>



      </section>
    </>
  )
}