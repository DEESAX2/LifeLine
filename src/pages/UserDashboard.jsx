import Dashboardnav from "../components/Dashboardnav.jsx"
import UserProfile from "../components/UserProfile.jsx"
import DashboardContent from "../components/DashboardContent.jsx"

export default function UserDashboard() {

  return (
    <>

      <Dashboardnav />
      <section className="mt-7">
        <div className="flex flex-col md:flex-row w-full h-screen p-4 gap-4">
          {/* User Profile */}
          <div className="md:w-1/3 w-full border border-gray-300 p-4 rounded mt-3.5 " >
            <UserProfile />
          </div>

          {/* Main dashboard content */}
          <div className="md:w-2/3 w-full border border-none p-4 ">
            <DashboardContent />
          </div>
        </div>



      </section>
    </>
  )
}