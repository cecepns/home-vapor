import React from 'react';

const TailwindTest = () => {
  return (
    <div className="p-8 bg-blue-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-blue-900 mb-6">
          Tailwind CSS v3 Setup Complete! 🎉
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              Responsive Design
            </h2>
            <p className="text-gray-600">
              This card demonstrates responsive grid layout and hover effects.
            </p>
          </div>
          
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg shadow-md p-6 text-white">
            <h2 className="text-xl font-semibold mb-3">
              Gradients & Colors
            </h2>
            <p>
              Beautiful gradients and color utilities are now available.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              Custom Styling
            </h2>
            <p className="text-gray-600">
              Combine Tailwind with your existing custom styles seamlessly.
            </p>
          </div>
        </div>
        
        <div className="mt-8 p-4 bg-yellow-100 border border-yellow-300 rounded-lg">
          <p className="text-yellow-800">
            <strong>Success!</strong> Tailwind CSS v3 is now properly configured and ready to use in your React project.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TailwindTest;
