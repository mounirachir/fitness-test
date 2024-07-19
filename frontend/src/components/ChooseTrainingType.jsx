// ChooseTrainingType.jsx

import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import HomeTrain from "../assets/home.jpg";
import GymTrain from "../assets/gym.jpg";
import Hybrid from "../assets/hybrid.webp";

const ChooseTrainingType = ({ onBack, onNext, userData, setUserData }) => {
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
      <div className="top-[1%] left-[1%] absolute md:top-10 md:left-10">
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
          TRAINING{" "}
          <span className="bg-gradient-to-tl from-orange-500 via-transparent to-orange-500 rounded-lg p-2 leading-loose">
            TYPE
          </span>
        </h1>
        <p className="text-lg text-white text-center mb-5 mt-2">
          Choose where you want to train based on your preference.
        </p>

        {/* Cards */}
        <div className="grid lg:grid-cols-3 lg:mr-5 gap-10 lg:gap-32 ">
          {/* Card 1: Home Training */}
          <div
            className="lg:w-[110%] text-white text-center border-2 border-gray-300 rounded-lg p-2 hover:bg-gradient-to-tl from-orange-500 via-transparent to-gray-900 cursor-pointer transition duration-200"
            onClick={(e) => {
              e.target.id = "home";
              handleCardClick(e);
            }}
          >
            <h2 className="font-bold text-3xl">Home Training</h2>
            <h5 className="mb-4">Train At The Comfort Of Your Own Home</h5>
            <div className="w-[90%] ml-2">
              <img
                src={HomeTrain}
                alt="Home Training"
                className="m-2 border-transparent rounded-lg h-40 md:w-[100%]"
              />
            </div>
          </div>

          {/* Card 2: Gym Training */}
          <div
            className="lg:w-[110%] text-white text-center border-2 border-gray-300 rounded-lg p-2 hover:bg-gradient-to-tl from-orange-500 via-transparent to-gray-900 cursor-pointer transition duration-200"
            onClick={(e) => {
              e.target.id = "gym";
              handleCardClick(e);
            }}
          >
            <h2 className="font-bold text-3xl">Gym Training</h2>
            <h5 className="mb-4">Become A Weight-Lifting Machine</h5>
            <div className="w-[90%] ml-2">
              <img
                src={GymTrain}
                alt="Gym Training"
                className="m-2 border-transparent rounded-lg h-44 md:w-[100%]"
              />
            </div>
          </div>

          {/* Card 3: Hybrid Training */}
          <div
            className="lg:w-[110%] text-white text-center border-2 border-gray-300 rounded-lg p-2 hover:bg-gradient-to-tl from-orange-500 via-transparent to-gray-900 cursor-pointer transition duration-200"
            onClick={(e) => {
              e.target.id = "hybrid";
              handleCardClick(e);
            }}
          >
            <h2 className="font-bold text-3xl">Hybrid Training</h2>
            <h5 className="mb-4">Train Everywhere And Anywhere</h5>
            <div className="w-[90%] ml-2">
              <img
                src={Hybrid}
                alt="Hybrid Training"
                className="m-2 border-transparent rounded-lg h-44"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChooseTrainingType;
