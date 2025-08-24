"use client";

import { useEffect, useState } from "react";

const LiveIndicator = () => {
  const [isLiveTime, setIsLiveTime] = useState(false);

  useEffect(() => {
    const checkTime = () => {
      const now = new Date();
      const localHours = now.getUTCHours() + 6;
      const localMinutes = now.getUTCMinutes();
      const totalMinutes = localHours * 60 + localMinutes;

      const startMinutes = 10 * 60 -30; // 10:30 AM
      const endMinutes = 14 * 60 + 30; // 2:30 PM

      setIsLiveTime(totalMinutes >= startMinutes && totalMinutes <= endMinutes);
    };

    checkTime(); 

    const interval = setInterval(checkTime, 60 * 1000); 
    return () => clearInterval(interval);
  }, []);

  if (!isLiveTime) return null;

  return (
    <p className="flex items-center gap-2 font-bold text-red-500">
      <span className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
      LIVE
    </p>
  );
};

export default LiveIndicator;
