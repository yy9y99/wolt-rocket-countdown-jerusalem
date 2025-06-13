
import React, { useState, useEffect } from 'react';
import { toZonedTime, fromZonedTime } from 'date-fns-tz';
import { differenceInMinutes, addMinutes } from 'date-fns';
import CircularProgress from './CircularProgress';

const CountdownTimer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [totalMinutes, setTotalMinutes] = useState<number>(45);
  
  // Hardcoded destination time - 45 minutes from now in Jerusalem time
  const JERUSALEM_TZ = 'Asia/Jerusalem';
  
  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const nowInJerusalem = toZonedTime(now, JERUSALEM_TZ);
      
      // Set destination time to 45 minutes from the initial load time
      const destinationTime = addMinutes(nowInJerusalem, 45);
      
      const minutesLeft = differenceInMinutes(destinationTime, nowInJerusalem);
      
      if (minutesLeft <= 0) {
        setTimeLeft(null); // Show question marks
      } else {
        setTimeLeft(minutesLeft);
      }
    };

    // Calculate immediately
    calculateTimeLeft();
    
    // Update every minute
    const interval = setInterval(calculateTimeLeft, 60000);
    
    return () => clearInterval(interval);
  }, []);

  const progress = timeLeft !== null ? ((totalMinutes - timeLeft) / totalMinutes) * 100 : 100;

  return (
    <div className="flex flex-col items-center justify-center space-y-6">
      {/* Map background with route indicator */}
      <div 
        className="w-full h-48 rounded-lg relative overflow-hidden mb-2"
        style={{
          backgroundImage: `url('/lovable-uploads/52f29b77-882d-454b-a26a-f9eaba1ba3fd.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Blue location pin - positioned like in original */}
        <div className="absolute top-4 right-6 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
          <div className="w-4 h-4 bg-white rounded-full"></div>
        </div>
        
        {/* Route number badge */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-4 w-12 h-8 bg-blue-600 rounded border-2 border-white text-white text-sm flex items-center justify-center font-bold shadow-lg">
          20
        </div>
        
        {/* Hebrew city name - positioned like in original */}
        <div className="absolute top-4 left-4 text-gray-700 font-semibold text-lg">
          אביב-יפו
        </div>
      </div>

      {/* Circular countdown - smaller size */}
      <div className="relative">
        <CircularProgress progress={progress} size={200} strokeWidth={8} />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2">
              <span className="text-5xl font-bold text-gray-900">
                {timeLeft !== null ? timeLeft : '??'}
              </span>
              <span className="text-3xl">💜</span>
            </div>
          </div>
        </div>
      </div>

      {/* Destination info */}
      <div className="text-center space-y-1">
        <h2 className="text-2xl font-bold text-gray-900">Iran's rockets</h2>
        <p className="text-lg text-gray-600">
          {timeLeft !== null ? `Arriving in ${timeLeft} min` : 'Arrival time unknown'}
        </p>
      </div>

      {/* Bottom action buttons */}
      <div className="flex space-x-4 mt-6">
        <button className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
          <div className="w-6 h-6 bg-gray-600 rounded grid grid-cols-3 gap-0.5">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="bg-white rounded-sm"></div>
            ))}
          </div>
        </button>
        <button className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
          <div className="w-6 h-4 bg-gray-600 rounded-sm"></div>
        </button>
      </div>
    </div>
  );
};

export default CountdownTimer;
