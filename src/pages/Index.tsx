
import React from 'react';
import CountdownTimer from '../components/CountdownTimer';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-sm px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">W</span>
          </div>
          <span className="font-semibold text-gray-900">Rocket Delivery</span>
        </div>
        <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
      </div>

      {/* Main content - reduced padding */}
      <div className="flex-1 px-6 py-4">
        <CountdownTimer />
      </div>
    </div>
  );
};

export default Index;
