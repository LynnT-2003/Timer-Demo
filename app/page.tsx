// "use client";
// import { useState, useEffect, useRef } from "react";

// export default function Home() {
//   // Set the target date and time for the event
//   const eventDate = new Date("2024-09-27T16:30:00");

//   const [timeLeft, setTimeLeft] = useState({
//     days: 0,
//     hours: 0,
//     minutes: 0,
//     seconds: 0,
//   });
//   const [isTimeUp, setIsTimeUp] = useState(false);

//   const msValue = useRef(999); // Using useRef to keep track of milliseconds without causing re-renders
//   const msElem = useRef<HTMLHeadingElement | null>(null); // Explicit typing for milliseconds display

//   useEffect(() => {
//     const timerInterval = setInterval(() => {
//       const now = new Date().getTime();
//       const eventTime = eventDate.getTime();
//       const timeDifference = eventTime - now;

//       if (timeDifference <= 0) {
//         clearInterval(timerInterval);
//         setTimeLeft({
//           days: 0,
//           hours: 0,
//           minutes: 0,
//           seconds: 0,
//         });
//         msValue.current = 0;
//         setIsTimeUp(true);
//         return;
//       }

//       const days = Math.floor(timeDifference / (24 * 60 * 60 * 1000));
//       const hours = Math.floor(
//         (timeDifference % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000)
//       );
//       const minutes = Math.floor(
//         (timeDifference % (60 * 60 * 1000)) / (60 * 1000)
//       );
//       const seconds = Math.floor((timeDifference % (60 * 1000)) / 1000);

//       setTimeLeft({ days, hours, minutes, seconds });
//     }, 1000);

//     return () => {
//       clearInterval(timerInterval);
//     };
//   }, []);

//   useEffect(() => {
//     if (isTimeUp) return; // Skip updating milliseconds if time is up

//     const decrementPerMs = 999 / 1000; // Calculate the decrement per millisecond

//     const updateMilliseconds = () => {
//       if (msElem.current) {
//         msValue.current -= decrementPerMs; // Decrement by calculated amount
//         if (msValue.current < 0) {
//           msValue.current = 0; // Ensure it does not go below 0
//         }
//         msElem.current.innerHTML = `${Math.floor(msValue.current)}`; // Display the integer part
//       }
//     };

//     const interval = setInterval(() => {
//       updateMilliseconds();
//     }, 1); // Update every millisecond

//     return () => {
//       clearInterval(interval);
//     };
//   }, [isTimeUp]);

//   return (
//     <>
//       <div className="flex h-screen items-center bg-slate-900">
//         {/* <p>{Math.random()}</p> */}
//         {isTimeUp ? (
//           <div className="w-[90vw] mx-[5vw]">
//             <h1 className="text-center">Event Started!</h1>
//             <p className="text-center">
//               The countdown is over. The event has begun.
//             </p>
//           </div>
//         ) : (
//           <div className="w-full text-center">
//             <h1 className="">Countdown to Event </h1>
//             <div className="flex justify-center">
//               <h1 className="md:text-3xl">
//                 {timeLeft.days}d : {timeLeft.hours}h : {timeLeft.minutes}m :{" "}
//                 {timeLeft.seconds}s :
//               </h1>
//               <div className="md:w-[100px] w-[50px] ml-1">
//                 <h1 className="md:text-3xl" ref={msElem}></h1>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </>
//   );
// }

"use client";
import { useState, useEffect, useRef } from "react";

export default function Home() {
  // Set the target date and time for the event
  const eventDate = new Date("2024-09-27T16:30:00");

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isTimeUp, setIsTimeUp] = useState(false);

  const msValue = useRef(999); // Using useRef to keep track of milliseconds
  const msElem = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      const now = new Date().getTime();
      const eventTime = eventDate.getTime();
      const timeDifference = eventTime - now;

      if (timeDifference <= 0) {
        clearInterval(timerInterval);
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
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

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => {
      clearInterval(timerInterval);
    };
  }, []);

  useEffect(() => {
    if (isTimeUp) return;

    let startTime = performance.now();
    const duration = 1000;
    const decrementPerMs = 999 / duration;

    const updateMilliseconds = (currentTime: number) => {
      const elapsedTime = currentTime - startTime;
      msValue.current = Math.max(
        999 - Math.floor(decrementPerMs * (elapsedTime % duration)),
        0
      );

      if (msElem.current) {
        msElem.current.innerHTML = `${Math.floor(msValue.current)}`;
      }

      if (elapsedTime % duration < duration - 1) {
        requestAnimationFrame(updateMilliseconds);
      } else {
        startTime = performance.now();
        requestAnimationFrame(updateMilliseconds);
      }
    };

    requestAnimationFrame(updateMilliseconds);

    return () => {
      // Cleanup if needed
    };
  }, [isTimeUp]);

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
          <div className="w-full text-center">
            <h1 className="">Countdown to Event. </h1>
            <div className="flex justify-center">
              <h1 className="md:text-3xl">
                {timeLeft.days}d : {timeLeft.hours}h : {timeLeft.minutes}m :{" "}
                {timeLeft.seconds}s :
              </h1>
              <div className="md:w-[100px] w-[50px] ml-1">
                <h1 className="md:text-3xl" ref={msElem}></h1>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
