
import React, { useState, useEffect } from 'react';
import { toZonedTime, fromZonedTime } from 'date-fns-tz';
import { differenceInMinutes, addMinutes } from 'date-fns';

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

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Map section */}
      <div 
        className="w-full h-64 relative"
        style={{
          backgroundImage: `url('/lovable-uploads/52f29b77-882d-454b-a26a-f9eaba1ba3fd.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Blue location pin */}
        <div className="absolute top-6 right-8 w-6 h-6 bg-blue-500 rounded-full border-2 border-white shadow-lg">
          <div className="w-2 h-2 bg-white rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
        </div>
        
        {/* Route number badge */}
        <div className="absolute top-28 left-1/2 transform -translate-x-1/2 w-10 h-6 bg-blue-600 rounded-sm border border-white text-white text-xs flex items-center justify-center font-bold shadow-sm">
          20
        </div>
        
        {/* Hebrew city name */}
        <div className="absolute top-6 left-6 text-gray-800 font-medium text-base">
          תל אביב-יפו
        </div>
      </div>

      {/* White content section */}
      <div className="flex-1 bg-white px-6 py-8 flex flex-col items-center justify-center space-y-8">
        {/* Large timer display */}
        <div className="flex items-center justify-center space-x-3">
          <span className="text-8xl font-light text-gray-900" style={{ fontFamily: 'system-ui, -apple-system' }}>
            {timeLeft !== null ? timeLeft : '??'}
          </span>
          <span className="text-5xl">💜</span>
        </div>

        {/* Destination info */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-semibold text-gray-900">Iran's rockets</h1>
          <p className="text-xl text-gray-600 font-light">
            {timeLeft !== null ? `Arriving in ${timeLeft} min` : 'Arrival time unknown'}
          </p>
        </div>

        {/* Bottom section with buttons */}
        <div className="flex items-center justify-center space-x-6 mt-12">
          {/* Menu/grid icon */}
          <button className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center">
            <div className="w-7 h-7 grid grid-cols-3 gap-1">
              {[...Array(9)].map((_, i) => (
                <div key={i} className="w-1.5 h-1.5 bg-gray-600 rounded-sm"></div>
              ))}
            </div>
          </button>
          
          {/* Message icon */}
          <button className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center">
            <div className="w-7 h-5 bg-gray-600 rounded-sm relative">
              <div className="absolute -bottom-1 left-2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-gray-600"></div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
