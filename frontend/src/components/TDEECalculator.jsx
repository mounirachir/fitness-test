import React from "react";
import { FaArrowLeft } from "react-icons/fa";

const TDEECalculator = ({ onBack, onNext, userData, setUserData }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform TDEE calculation logic here
    console.log("Calculate TDEE with:", userData);
    onNext(userData); // Pass formData to parent's onNext function to move to the next step
  };

  return (
    <section className="min-h-screen relative">
      {/* Back button */}
      <div className="top-[20%] left-[45%] absolute md:top-10 md:left-10">
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
            CALCULATE
          </span>{" "}
          YOUR{" "}
          <span className="bg-gradient-to-tl from-orange-500 via-transparent to-orange-500 rounded-lg p-2 leading-loose">
            TDEE
          </span>
        </h1>
        <p className="text-lg text-white text-center mb-5 mt-2">
          Calculate your Total Daily Energy Expenditure (TDEE) based on your
          information.
        </p>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col md:grid md:grid-cols-2 gap-4 w-[50%] m-auto mt-8"
        >
          {/* Age */}
          <div className="flex flex-col">
            <label className="text-white" htmlFor="age">
              Age
            </label>
            <input
              type="number"
              id="age"
              name="age"
              value={userData.age}
              onChange={handleInputChange}
              className="rounded p-2"
              required
              placeholder="Enter Age..."
              min={18} // Set minimum value to 18
            />
          </div>

          {/* Gender */}
          <div className="flex flex-col">
            <label className="text-white" htmlFor="gender">
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              value={userData.gender}
              onChange={handleInputChange}
              className="rounded p-2"
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          {/* Weight */}
          <div className="flex flex-col">
            <label className="text-white whitespace-nowrap" htmlFor="weight">
              Weight (kg)
            </label>
            <input
              type="number"
              id="weight"
              name="weight"
              value={userData.weight}
              onChange={handleInputChange}
              className="rounded p-2"
              required
              placeholder="Enter Weight..."
              min={60} // Set minimum value to 40
            />
          </div>

          {/* Height */}
          <div className="flex flex-col">
            <label className="text-white whitespace-nowrap" htmlFor="height">
              Height (cm)
            </label>
            <input
              type="number"
              id="height"
              name="height"
              value={userData.height}
              onChange={handleInputChange}
              className="rounded p-2"
              required
              placeholder="Enter Height..."
              min={160} // Set minimum value to 150
            />
          </div>

          {/* Activity Level */}
          <div className="flex flex-col md:col-span-2">
            <label className="text-white" htmlFor="activityLevel">
              Activity Level
            </label>
            <select
              id="activityLevel"
              name="activityLevel"
              value={userData.activityLevel}
              onChange={handleInputChange}
              className="rounded p-2 text-sm "
              required
            >
              <option value="">Select Activity Level</option>
              <option value="sedentary">
                Sedentary (little to no exercise)
              </option>
              <option value="lightlyActive">
                Lightly Active (light exercise/sports 1-3 days/week)
              </option>
              <option value="moderatelyActive">
                Moderately Active (moderate exercise/sports 3-5 days/week)
              </option>
              <option value="veryActive">
                Very Active (hard exercise/sports 6-7 days a week)
              </option>
              <option value="superActive">
                Super Active (very hard exercise/sports, physical job, training
                twice a day)
              </option>
            </select>
          </div>

          {/* Calculate Button */}
          <button
            type="submit"
            className="bg-orange-700 hover:bg-orange-800 transition duration-200 text-white font-bold py-2 px-4 rounded border-2 border-gray-300 rounded p-2 col-span-2 text-center"
          >
            Generate Fitness Plan
          </button>
        </form>
      </div>
    </section>
  );
};

export default TDEECalculator;
