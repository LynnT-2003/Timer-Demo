"use client";
import { useState, useEffect } from "react";

export default function Home() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    milliseconds: 0,
  });
  const [isTimeUp, setIsTimeUp] = useState(false);

  useEffect(() => {
    // Set the target date and time for the event
    const eventDate = new Date("2024-09-27T16:30:00"); // Adjust the date and time as needed

    const timerInterval = setInterval(() => {
      const now: number = new Date().getTime(); // Get current time in milliseconds
      const eventTime: number = eventDate.getTime(); // Get event time in milliseconds
      const timeDifference: number = eventTime - now;

      if (timeDifference <= 0) {
        clearInterval(timerInterval);
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          milliseconds: 0,
        });
        setIsTimeUp(true);
        return;
      }

      const days = Math.floor(timeDifference / (24 * 60 * 60 * 1000));
      const hours = Math.floor(
        (timeDifference % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000)
      );
      const minutes = Math.floor(
        (timeDifference % (60 * 60 * 1000)) / (60 * 1000)
      );
      const seconds = Math.floor((timeDifference % (60 * 1000)) / 1000);
      const milliseconds = Math.floor(timeDifference % 1000);

      setTimeLeft({
        days,
        hours,
        minutes,
        seconds,
        milliseconds,
      });
    }, 1);

    return () => clearInterval(timerInterval);
  }, []);

  return (
    <>
      <div className="flex h-screen items-center bg-slate-900">
        {isTimeUp ? (
          <div className="w-[90vw] mx-[5vw]">
            <h1 className="text-center">Event Started!</h1>
            <p className="text-center">
              The countdown is over. The event has begun.
            </p>
          </div>
        ) : (
          <div className="md:mx-[25vw] mx-[20vw] md:[50vw] w-[80vw] md:w-[50vw] bg-slate-800 text-center">
            <h1 className="">Countdown to Event</h1>
            <div className="flex ml-[8vw] md:ml-[11vw]">
              <h1 className="md:text-3xl bg-slate-700">
                {timeLeft.days}d : {timeLeft.hours}h : {timeLeft.minutes}m :{" "}
              </h1>
              <h1 className="md:text-3xl">
                {timeLeft.seconds}s : {timeLeft.milliseconds}ms
              </h1>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
