import { ArrowLeft } from "lucide-react";
import {Users} from "lucide-react";
import { AlarmCheck } from "lucide-react";
import { HeartHandshake, ShieldCheck, Award, Handshake } from "lucide-react";
import lifelinelogo from "../assets/Images/lifelinelogo.jpg";


export default function About() {
  
  return (
    <>
   <section className="bg-red-200 text-gray-800 py-12 px-6 md:px-16 lg:px-32">
     <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        
        <div className="flex items-center gap-2">
          <span className="text-red-600 text-2xl"><img src={lifelinelogo} alt="" className="w-14" /></span>
        
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

        <h1 className="text-4xl font-bold text-black mb-6 mt-4">About <span className="text-red-600">LifeLine</span></h1>

        <p className="text-lg mb-8">
          LifeLine is Ghana's premier blood donation platform, connecting voluntary donors with hospitals in urgent need of blood.
          Every day, countless lives hang in the balance, waiting for a hero to step forward.
        </p>


          {/* Mission & Vision */}
        <div className="grid gap-12 md:grid-cols-2 my-12">
          <div className="bg-white border border-red-100 p-8 rounded-xl shadow-lg transform transition duration-500 hover:scale-105">
            <h2 className="text-3xl font-bold text-center text-red-600 mb-4">Our Mission</h2>
            <p className="text-gray-700 leading-relaxed">
              To provide a reliable and efficient bridge between voluntary blood donors and healthcare institutions,
              ensuring that every patient in Ghana has timely access to safe blood and blood products.
            </p>
          </div>
          <div className="bg-white border border-red-100 p-8 rounded-xl shadow-lg transform transition duration-500 hover:scale-105">
            <h2 className="text-3xl font-bold text-center text-red-600 mb-4">Our Vision</h2>
            <p className="text-gray-700 leading-relaxed">
              To foster a culture of voluntary blood donation nationwide, leveraging technology and community engagement
              to make blood shortages a thing of the past.
            </p>
          </div>
        </div>

      {/* ===== Core Values ===== */}
<div className="mb-16">
  <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-10">OUR <span className="text-red-600">CORE</span>  VALUES</h2>
  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
    <div className="bg-white hover:bg-red-50 border border-red-100 p-6 rounded-xl shadow-lg transform transition duration-300 hover:-translate-y-1">
      <HeartHandshake size={20} className="text-red-600 mb-2" />
      <h3 className="text-lg font-semibold text-red-600 mb-2">Compassion</h3>
      <p className="text-gray-700 text-sm">We care deeply about donors and recipients, treating everyone with empathy and respect.</p>
    </div>
    <div className="bg-white hover:bg-red-50 border border-red-100 p-6 rounded-xl shadow-lg transform transition duration-300 hover:-translate-y-1">
      <Users size={20} className="text-red-600 mb-2" />
      <h3 className="text-lg font-semibold text-red-600 mb-2">Community</h3>
      <p className="text-gray-700 text-sm">We believe in the power of collective action to save lives.</p>
    </div>
    <div className="bg-white hover:bg-red-50 border border-red-100 p-6 rounded-xl shadow-lg transform transition duration-300 hover:-translate-y-1">
      <ShieldCheck size={20} className="text-red-600 mb-2" />
      <h3 className="text-lg font-semibold text-red-600 mb-2">Safety</h3>
      <p className="text-gray-700 text-sm">We uphold the highest medical and ethical standards in every donation.</p>
    </div>
    <div className="bg-white hover:bg-red-50 border border-red-100 p-6 rounded-xl shadow-lg transform transition duration-300 hover:-translate-y-1">
      <Award size={20} className="text-red-600 mb-2" />
      <h3 className="text-lg font-semibold text-red-600 mb-2">Excellence</h3>
      <p className="text-gray-700 text-sm">We strive for continuous improvement and innovation in our services.</p>
    </div>
  </div>
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