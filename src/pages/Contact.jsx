import { ArrowLeft } from "lucide-react";
import lifelinelogo from "../assets/Images/lifelinelogo.jpg";


export default function Conatct() {
  
  return (
    <>
     <div className="bg-gradient-to-bl from-white to-red-300">
       <header className=""> 
      <div className=" bg-white max-w-5xl mx-auto px-6 py-4 flex justify-between items-center ">
        
        <div className="flex items-center gap-2">
          <span className="text-red-600 text-2xl"><img src={lifelinelogo} alt=""  className="w-16 h-16"/></span>
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

    
      <div className=" py-10 px-4 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Join the LifeLine Network
        </h2>
        <p className="text-gray-700 text-lg max-w-2xl mx-auto">
          Partner with us to save lives. If you're a hospital interested in joining
          our blood donation network, we'd love to hear from you.
        </p>
      </div>
    </header>
   <div className="min-h-screen py-12 px-6 md:px-16 ">
      <div className="max-w-7xl mx-auto grid  lg:grid-cols-3 gap-8">
        {/* Left Side: Form */}
        <div className="bg-white p-6 rounded-lg shadow-lg lg:col-span-2">
          <h2 className="text-2xl font-bold text-red-600 mb-6 flex items-center gap-2">
            <span className="text-3xl">📋</span> Hospital Partnership Form
          </h2>

          <form className="grid grid-cols- md:grid-cols-1 gap-2">
            <div className="col-span-1">
              <label className="font-medium">Hospital Name *</label>
              <input
                type="text"
                placeholder="Enter your hospital name"
                className="mt-1 w-full  border rounded-lg p-2"
              />
            </div>

            <div>
              <label className="font-medium">Contact Person *</label>
              <input
                type="text"
                placeholder="Blood bank manager or designated contact"
                className="mt-1 w-full border rounded-lg p-2"
              />
            </div>

            <div>
              <label className="font-medium">Email Address *</label>
              <input
                type="email"
                placeholder="contact@hospital.com"
                className="mt-1 w-full border rounded-lg p-2"
              />
            </div>

            <div>
              <label className="font-medium">Phone Number *</label>
              <input
                type="tel"
                placeholder="0244123456"
                className="mt-1 w-full border rounded-lg p-2"
              />
            </div>

            <div className="col-span-2">
              <label className="font-medium">Hospital Location *</label>
              <input
                type="text"
                placeholder="City, Region"
                className="mt-1 w-full border rounded-lg p-2"
              />
            </div>

            <div className="col-span-2">
              <label className="font-medium">Message</label>
              <textarea
                rows={4}
                placeholder="Tell us about your hospital's blood donation needs and how you'd like to partner with LifeLine..."
                className="mt-1 w-full border rounded-lg p-2"
              />
            </div>

            <div className="col-span-2">
              <button
                type="submit"
                className="w-full bg-red-600 text-white font-semibold py-2 rounded-lg hover:bg-red-700 transition"
              >
                Send Partnership Request
              </button>
            </div>
          </form>
        </div>

        {/* Right Side: Contact & Benefits */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Get in Touch</h3>
            <div className="text-gray-700 space-y-2">
              <p>
                <span className="text-blue-600 mr-2">📞</span> <strong>Phone:</strong> +233 20 123 4567
              </p>
              <p>
                <span className="text-green-600 mr-2">📧</span> <strong>Email:</strong> partnerships@lifeline.gh
              </p>
              <p>
                <span className="text-red-600 mr-2">📍</span> <strong>Office:</strong> Accra, Ghana
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Why Partner with LifeLine?</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Access to a large network of voluntary donors</li>
              <li>Real-time blood request posting and management</li>
              <li>Streamlined donor-hospital communication</li>
              <li>Professional dashboard for blood bank technologists</li>
              <li>Free platform with no hidden fees</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    </div>
    </>
  )
}