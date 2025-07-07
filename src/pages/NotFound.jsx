import React from 'react';
import notFoundVideo from '../assets/videos/notfound.mp4';
import { Link } from 'react-router'; 

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4 text-center">
      <video className="w-full max-w-2xl mb-8 rounded shadow" src={notFoundVideo} autoPlay loop muted playsInline></video>
      <h1 className="text-3xl font-bold text-red-600 mb-2">Oops! Page not found</h1>
      <p className="text-gray-600 mb-4">
        The page you are looking for might have been removed or does not exist.
      </p>
      <Link
        to="/"
        className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-300">Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
