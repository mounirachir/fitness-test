// ChooseWorkoutLength.jsx

import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import Short from "../assets/short.webp";
import Normal from "../assets/normal.webp";

const ChooseWorkoutLength = ({ onBack, onNext, userData, setUserData }) => {
  const handleCardClick = (e) => {
    setUserData((prev) => ({
      ...prev,
      program: [...prev.program, e.target.id],
    }));
    onNext(); // Navigate to the next step
  };

  return (
    <section className="min-h-screen relative">
      {/* Back button */}
      <div className="top-[1%] left-[0%] absolute md:top-10 md:left-10">
        <button
          className="bg-gray-900 text-white rounded-full p-3 hover:bg-orange-500 transition duration-200"
          onClick={onBack}
        >
          <FaArrowLeft size={20} />
        </button>
      </div>

      {/* Step Title and Description */}
      <div className="flex flex-col justify-center items-center p-4 mt-5">
        <h1 className="font-bold text-lg sm:text-xl text-center md:text-4xl text-white whitespace-nowrap">
          <span className="bg-gradient-to-tl from-orange-500 via-transparent to-orange-500 rounded-lg p-2 leading-relaxed">
            CHOOSE
          </span>{" "}
          WORKOUT{" "}
          <span className="bg-gradient-to-tl from-orange-500 via-transparent to-orange-500 rounded-lg p-2 leading-loose">
            LENGTH
          </span>
        </h1>
        <p className="text-lg text-white text-center mb-5 mt-2">
          Choose the duration of your workouts based on your preference.
        </p>

        {/* Cards */}
        <div className="grid lg:grid-cols-2 lg:mr-4 gap-10 lg:gap-32">
          {/* Card 1: Short Workouts */}
          <div
            className="text-white text-center border-2 border-gray-300 rounded-lg p-2 hover:bg-gradient-to-tl from-orange-500 via-transparent to-gray-900 cursor-pointer transition duration-200"
            onClick={(e) => {
              e.target.id = "short";
              handleCardClick(e);
            }}
          >
            <h2 className="font-bold text-3xl">Short Workouts</h2>
            <h5 className="mb-4">Have No Time? No Problem, No Excuses</h5>
            <div className="w-[90%] ml-2">
              <img
                src={Short}
                alt="Short Workouts"
                className="m-2 border-transparent rounded-lg h-44"
              />
            </div>
          </div>

          {/* Card 2: Normal Workouts */}
          <div
            className="text-white text-center border-2 border-gray-300 rounded-lg p-2 hover:bg-gradient-to-tl from-orange-500 via-transparent to-gray-900 cursor-pointer transition duration-200"
            onClick={(e) => {
              e.target.id = "normal";
              handleCardClick(e);
            }}
          >
            <h2 className="font-bold text-3xl">Normal Workouts</h2>
            <h5 className="mb-4">Cover Every Body Part</h5>
            <div className="w-[90%] ml-2">
              <img
                src={Normal}
                alt="Normal Workouts"
                className="m-2 border-transparent rounded-lg h-44"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChooseWorkoutLength;
