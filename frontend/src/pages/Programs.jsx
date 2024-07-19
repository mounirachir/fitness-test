import React, { useState } from "react";
import ChooseProgramType from "../components/ChooseProgramType";
import ChooseTrainingType from "../components/ChooseTrainingType";
import ChooseWorkoutLength from "../components/ChooseWorkoutLength";
import TDEECalculator from "../components/TDEECalculator";
import Workout from "../components/Workout";

const Programs = ({ userData, setUserData }) => {
  const [currentStep, setCurrentStep] = useState(1);

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
    // Reset userData choices based on currentStep
    switch (currentStep) {
      case 2:
        setUserData((prev) => ({
          ...prev,
          program: prev.program.filter(
            (p) => p !== "muscle" && p !== "fat" && p !== "both"
          ),
        }));
        break;
      case 3:
        setUserData((prev) => ({
          ...prev,
          program: prev.program.filter(
            (p) => p !== "home" && p !== "gym" && p !== "hybrid"
          ),
        }));
        break;
      case 4:
        setUserData((prev) => ({
          ...prev,
          program: prev.program.filter((p) => p !== "short" && p !== "normal"),
        }));
        break;
      default:
        break;
    }
  };

  const handleTDEESubmit = (data) => {
    setUserData(data); // Save TDEE form data if needed for Fitness Plan calculation
    setCurrentStep(5); // Navigate to Fitness Plan step
  };

  // Render component based on currentStep
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <ChooseProgramType
            onNext={handleNext}
            userData={userData}
            setUserData={setUserData}
          />
        );
      case 2:
        return (
          <ChooseTrainingType
            onBack={handleBack}
            onNext={handleNext}
            userData={userData}
            setUserData={setUserData}
          />
        );
      case 3:
        return (
          <ChooseWorkoutLength
            onBack={handleBack}
            onNext={handleNext}
            userData={userData}
            setUserData={setUserData}
          />
        );
      case 4:
        return (
          <TDEECalculator
            onBack={handleBack}
            onNext={handleTDEESubmit}
            userData={userData}
            setUserData={setUserData}
          />
        );
      case 5:
        return <Workout userData={userData} setUserData={setUserData} />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-black overflow-x-hidden min-h-screen relative">
      {renderStep()}
    </div>
  );
};

export default Programs;
