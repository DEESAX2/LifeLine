import notFoundImg from '../assets/Images/notfound.png';
import { Link } from 'react-router';

export default function NotFound() {
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4 text-center">
      <img src={notFoundImg} alt="Page not found" className="w-100 md:w-[50rem] mb-8" />
      <h1 className="text-3xl font-bold mb-2">Oops! Page not found</h1>
      <p className="text-gray-600 mb-4">The page you are looking for doesn't exist.</p>
      <Link to="/" className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition-colors shadow">Return Home</Link>
    </div>
  )
}