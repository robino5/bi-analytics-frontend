"use client";

import { Clock } from "lucide-react";
import { useEffect, useState } from "react";

const PushDateTime = ({ pushdate }: { pushdate: any } ) => {
    const [isLiveTime, setIsLiveTime] = useState(false);

    useEffect(() => {
        const checkTime = () => {
            const now = new Date();
            const localHours = now.getUTCHours() + 6;
            const localMinutes = now.getUTCMinutes();
            const totalMinutes = localHours * 60 + localMinutes;

            const startMinutes = 10 * 60 + 30; // 10:30 AM
            const endMinutes = 15 * 60 + 5; // 3:05 PM

            setIsLiveTime(totalMinutes >= startMinutes && totalMinutes <= endMinutes);
        };

        checkTime();

        const interval = setInterval(checkTime, 60 * 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <span className="flex items-center gap-1 text-yellow-200 font-bold">
            {isLiveTime&&<Clock className="w-6 h-6 animate-spin-slow" />}
            {pushdate}
        </span>
    );
};

export default PushDateTime;
