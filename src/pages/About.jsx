import { ArrowLeft } from "lucide-react";
import {Users} from "lucide-react";
import { AlarmCheck } from "lucide-react";


export default function About() {
  
  return (
    <>
   <section className="bg-gradient-to-bl from-white to-red-300 text-gray-800 py-12 px-6 md:px-16 lg:px-32">
     <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        
        <div className="flex items-center gap-2">
          <span className="text-red-600 text-2xl">❤️</span>
          <h1 className="text-xl font-bold text-gray-900">LifeLine</h1>
        </div>

        <a
          href="/"
          className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-800 hover:bg-gray-100 transition"
        >
          <ArrowLeft size={16} />
          <span>Back to Home</span>
        </a>
      </div>
      </header>

        <h1 className="text-4xl font-bold text-black mb-6">About LifeLine</h1>

        <p className="text-lg mb-8">
          LifeLine is Ghana's premier blood donation platform, connecting voluntary donors with hospitals in urgent need of blood.
          Every day, countless lives hang in the balance, waiting for a hero to step forward.
        </p>

    
        <div className="mb-16">
  <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-10">
    The Impact of <span className="text-red-600">Blood Donation</span>
  </h2>

  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
    
    <div className="bg-white hover:bg-red-50 border border-red-100 p-6 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl">
      <Users size={14} />
      <h3 className="text-lg font-semibold text-red-600 mb-2">Save Multiple Lives</h3>
      <p className="text-gray-700 text-sm">
        One donation can save up to 3 lives through blood component separation.
      </p>
    </div>

    
    <div className="bg-white hover:bg-red-50 border border-red-100 p-6 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl">
       <AlarmCheck size={14} />
      <h3 className="text-lg font-semibold text-red-600 mb-2">Quick Process</h3>
      <p className="text-gray-700 text-sm">
        The entire donation process takes just 8–10 minutes of your time.
      </p>
    </div>

    
    <div className="bg-white hover:bg-red-50 border border-red-100 p-6 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl">
      <h3 className="text-lg font-semibold text-red-600 mb-2">Safe & Secure</h3>
      <p className="text-gray-700 text-sm">
        All donations follow strict medical protocols and safety standards.
      </p>
    </div>

    
    <div className="bg-white hover:bg-red-50 border border-red-100 p-6 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl">
      <h3 className="text-lg font-semibold text-red-600 mb-2">Health Benefits</h3>
      <p className="text-gray-700 text-sm">
        Regular donation helps maintain iron levels and boosts cardiovascular health.
      </p>
    </div>
  </div>
</div>
        
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-red-500 mb-4">Benefits of Donating Blood</h2>
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            <li>Helps patients with cancer, blood disorders, and trauma injuries</li>
            <li>Supports surgical procedures and emergency treatments</li>
            <li>Provides a sense of purpose and community contribution</li>
            <li>Offers free health screening with each donation</li>
            <li>Helps maintain healthy iron levels in your body</li>
          </ul>
        </div>

      
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-red-500 mb-4">Who Can Donate</h2>
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            <li>Adults aged 18–65 years</li>
            <li>Weighing at least 50kg (110 lbs)</li>
            <li>In good general health</li>
            <li>No recent illness or medication that affects blood donation</li>
          </ul>
        </div>

        
        <div className="text-center mt-10">
          <p className="text-lg font-medium mb-4">
            Every <span className="text-red-600 font-bold">2 seconds</span>, someone needs blood.
            <br />
            Your donation could be the difference between life and death.
          </p>
          <a
            href="/donate"
            className="inline-block bg-red-600 text-white text-lg font-semibold px-6 py-3 rounded-full hover:bg-red-700 transition"
          >
            Donate Now
          </a>
        </div>
    
    </section>
    </>
  )
}