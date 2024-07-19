// ChooseProgramType.jsx

import React from "react";

import LoseFat from "../assets/lose-fat.jpg";
import Image2 from "../assets/image2.png";
import Both from "../assets/both.png";

const ChooseProgramType = ({ onNext, userData, setUserData }) => {
  const handleCardClick = (e) => {
    setUserData((prev) => ({
      ...prev,
      program: [...prev.program, e.target.id],
    }));
    console.dir(e.target);
    onNext(); // Navigate to the next step
  };

  return (
    <section className="min-h-screen">
      <div className="relative flex flex-col justify-center items-center p-4 mt-5">
        <h1 className="font-bold text-lg sm:text-xl text-center md:text-4xl text-white whitespace-nowrap">
          <span className="bg-gradient-to-tl from-orange-500 via-transparent to-orange-500 rounded-lg p-2 leading-relaxed">
            CHOOSE
          </span>{" "}
          YOUR{" "}
          <span className="bg-gradient-to-tl from-orange-500 via-transparent to-orange-500 rounded-lg p-2 leading-loose">
            PROGRAM
          </span>
        </h1>
        <p className="text-lg text-white text-center mb-5 mt-2">
          Get your custom program based on your preference <br />
        </p>

        <div className="grid lg:grid-cols-3 lg:mr-5 gap-10 lg:gap-32">
          <div
            id="muscle"
            className="lg:w-[110%] text-white text-center border-2 border-gray-300 rounded-lg p-2 hover:bg-gradient-to-tl from-orange-500 via-transparent to-gray-900 cursor-pointer transition duration-200"
            onClick={(e) => {
              e.target.id = "muscle";
              handleCardClick(e);
            }}
          >
            <h2 className="font-bold text-3xl">Build Muscle</h2>
            <h5 className="mb-4">Get Jacked With Our Programs</h5>
            <div className="w-[90%] ml-2">
              <img
                src={Image2}
                alt="Build Muscle"
                className="m-2 border-transparent rounded-lg h-44 md:w-[100%] "
              />
            </div>
          </div>
          <div
            name="fat"
            className="lg:w-[110%] text-white text-center border-2 border-gray-300 rounded-lg p-2 hover:bg-gradient-to-tl from-orange-500 via-transparent to-gray-900 cursor-pointer transition duration-200"
            onClick={(e) => {
              e.target.id = "fat";
              handleCardClick(e);
            }}
          >
            <h2 className="font-bold text-3xl">Lose Fat</h2>
            <h5 className="mb-4">Become More Athletic</h5>
            <div className="w-[90%] ml-2">
              <img
                src={LoseFat}
                alt="Lose Fat"
                className="m-2 border-transparent rounded-lg h-44 md:w-[100%]"
              />
            </div>
          </div>
          <div
            name="both"
            className="lg:w-[110%] text-white text-center border-2 border-gray-300 rounded-lg p-2 hover:bg-gradient-to-tl from-orange-500 via-transparent to-gray-900 cursor-pointer transition duration-200"
            onClick={(e) => {
              e.target.id = "both";
              handleCardClick(e);
            }}
          >
            <h2 className="font-bold text-3xl">Do Both</h2>
            <h5 className="mb-4">Because Why Not ?</h5>
            <div className="w-[90%] ml-2">
              <img
                src={Both}
                alt="Do Both"
                className="m-2 border-transparent rounded-lg h-44"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChooseProgramType;
