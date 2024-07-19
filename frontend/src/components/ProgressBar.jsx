import React from "react";

const ProgressBar = ({ progress, daysPassed, totalScore }) => {
  return (
    <div className="rotate-90 lg:rotate-180 -top-5 md:top-0 lg:top-28 left-[5%] lg:left-[75%] absolute right-4 flex flex-col items-center md:m-5">
      {/* Display total score */}
      <div className="absolute left-0 md:left-40 lg:-left-10 top-32 md:top-32 lg:top-[100%] -rotate-90 lg:rotate-180 text-white text-center lg:m-4">
        <p className="text-lg font-bold whitespace-nowrap">
          Total Score : {totalScore} / 1000 Points
        </p>
      </div>
      <div className="relative w-10 h-72 bg-gray-50 border-4 border-orange-700 rounded-full overflow-hidden">
        {/* Progress bar */}
        <div
          className="absolute left-0 bg-gradient-to-t from-orange-500 to-orange-700"
          style={{ width: "100%", height: `${progress}%` }}
        ></div>
      </div>

      {/* Display days passed */}
      <div className="absolute right-0 md:right-40 lg:right-0 top-32 md:top-32 lg:-top-10 -rotate-90 lg:rotate-180 text-white text-center ">
        <p className="text-lg font-bold whitespace-nowrap">
          Days Passed : {daysPassed} / 100 Days
        </p>
      </div>
    </div>
  );
};

export default ProgressBar;
