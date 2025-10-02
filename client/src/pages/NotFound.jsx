import React from "react";

const NotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <div className="text-6xl font-extrabold text-indigo-600">404</div>
        <h1 className="text-2xl text-gray-700 mt-4">Oops! Page not found</h1>
        <p className="text-gray-500 mt-2">
          The page you're looking for doesn't exist.
        </p>
        <div className="mt-6">
          <button
            className="btn btn-primary"
            onClick={() => (window.location.href = "/")}
          >
            Go to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
