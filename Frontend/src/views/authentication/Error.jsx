import { Link } from 'react-router-dom';
import ErrorImg from 'src/assets/images/backgrounds/404-error-idea.gif';

const Error = () => (
  <div className="flex flex-col min-h-screen items-center justify-center text-center bg-gray-50 dark:bg-gray-900">
    <div className="w-full max-w-2xl mx-auto px-4">
      <img src={ErrorImg} alt="404" className="w-full max-w-md mx-auto mb-8" />
      <h1 className="text-h1 font-bold mb-4 text-gray-900 dark:text-gray-100">Opps!!!</h1>
      <h4 className="text-h4 mb-4 text-gray-700 dark:text-gray-300">This page you are looking for could not be found.</h4>
      <Link
        to="/"
        className="inline-block bg-primary text-white px-6 py-3 rounded-lg font-semibold shadow-custom hover:bg-primary-dark transition"
      >
        Go Back to Home
      </Link>
    </div>
  </div>
);

export default Error;
