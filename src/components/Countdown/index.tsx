import { useEffect, useState } from "react";
import { getCountDownTime } from "./getCountDownTime";

export interface ICountdownTimerProps {
  date: string;
  isTimeUnix?: boolean;
  className?: string;
  variant?: any;
  callback?: () => void;
}

export const CountdownTimer: React.FC<ICountdownTimerProps> = (
  props: ICountdownTimerProps
) => {
  const { date, isTimeUnix, className, variant, callback } = props;
  const [callbackCalled, setCallbackCalled] = useState(false);
  const [timeLeft, setTimeLeft] = useState(
    getCountDownTime({ dataWithTime: date, isTimeUnix }),
  );

  useEffect(() => {
    const timer = setInterval(() => {
      const time = getCountDownTime({ dataWithTime: date, isTimeUnix });
      setTimeLeft(time);
      if (
        time.seconds <= 0 &&
        time.days <= 0 &&
        time.minutes <= 0 &&
        time.hours <= 0 &&
        !callbackCalled &&
        callback
      ) {
        callback();
        setCallbackCalled(true);
      }
    }, 1000);
    return () => clearInterval(timer);
  });

  return (
    <div className=" flex items-center gap-1 text-xs font-normal text-[#121212] min-w-max font-bold">
      {timeLeft.days > 0 && <span>{timeLeft.days} d</span>}
      <span> {timeLeft.hours} h</span>
      <span> {timeLeft.minutes} m</span>
      <span> {timeLeft.seconds} s</span>
    </div>
  );
};
