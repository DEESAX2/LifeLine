import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import lifelinelogo from "../assets/Images/lifelinelogo.jpg";
import contact from "../assets/Images/contact.png";

export default function Contact() {
  const [showImage, setShowImage] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowImage((prev) => !prev);
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="bg-gradient-to-r from-buttonred to-gray-300 min-h-screen">
        <header>
          <div className="bg-white max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="text-red-600 text-2xl">
                <img src={lifelinelogo} alt="" className="w-16 h-16" />
              </span>
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
          <div className="py-10 px-4 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Join the LifeLine Network
            </h2>
            <p className="text-gray-700 text-lg max-w-2xl mx-auto">
              Partner with us to save lives. If you're a hospital interested in joining
              our blood donation network, we'd love to hear from you.
            </p>
          </div>
        </header>

        <div className="grid md:grid-cols-2 gap-10 min-h-[60vh] py-12 px-4 md:px-16 items-center">
          {/* Left Side: Contact & Benefits */}
          <div className="space-y-6 order-2 md:order-1">
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

          {/* Right Side: Image with fade in/out */}
          <div className="flex justify-center order-1 md:order-2 mb-8 md:mb-0">
            <img
              src={contact}
              alt="Contact"
              className={`w-3/4 md:w-full max-w-md rounded-lg shadow transition-opacity duration-1000 ${
                showImage ? "opacity-100" : "opacity-0"
              }`}
            />
          </div>
        </div>
      </div>
    </>
  );
}