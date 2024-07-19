import React, { useState } from "react";
import ProgressBar from "./ProgressBar";
import EditWorkout from "./EditWorkout"; // Import EditWorkout component

const Quiz = ({
  questions,
  onFinish,
  userData,
  setUserData,
  daysPassed,
  totalScore,
  msg,
  setMsg,
}) => {
  const [dailyScore, setDailyScore] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [showEditWorkout, setShowEditWorkout] = useState(false); // State to show/hide edit workout section

  const handleAnswer = (isYes) => {
    const scoreToAdd = isYes ? 2 : 0;
    setDailyScore((prevScore) => prevScore + scoreToAdd);
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);

    if (currentQuestionIndex === questions.length - 1) {
      setIsQuizFinished(true);
      onFinish(dailyScore + scoreToAdd);
    }
  };

  const handleUpdatePlan = () => {
    setShowEditWorkout(true); // Set showEditWorkout to true to replace Quiz with EditWorkout
  };

  return (
    <>
      {!showEditWorkout ? (
        <>
          <ProgressBar
            progress={(totalScore / 1000) * 100}
            daysPassed={daysPassed}
            totalScore={totalScore}
          />
          <h1 className="font-bold text-lg sm:text-xl text-center md:text-4xl text-white whitespace-nowrap">
            <span className="bg-gradient-to-tl from-orange-500 via-transparent to-orange-500 rounded-lg p-2 leading-relaxed">
              WELCOME
            </span>{" "}
            TO THE{" "}
            <span className="bg-gradient-to-tl from-orange-500 via-transparent to-orange-500 rounded-lg p-2 leading-loose">
              FIT-CLUB
            </span>
          </h1>
          <p className="text-lg text-white text-center m-2">
            Here you can track all of your progress <br />
          </p>
          {userData && (
            <h2 className="text-lg md:text-4xl font-bold text-4xl text-white bg-gradient-to-tl from-orange-500 via-transparent to-orange-500 rounded-lg p-2 leading-loose">
              {userData.name.toUpperCase()}
            </h2>
          )}
          <div className="p-3 bg-gradient-to-tl from-orange-500 via-transparent to-gray-900 border-2 rounded border-gray-300 w-80 md:w-96 md:h-44 flex flex-col justify-between items-center text-center overflow-hidden m-3">
            {!isQuizFinished ? (
              <>
                <h2 id="question" className="text-xl text-white">
                  {questions[currentQuestionIndex]?.question}
                </h2>
                <div className="flex gap-3 m-5 justify-center items-center">
                  <button
                    onClick={() => handleAnswer(true)}
                    id="yes"
                    className="bg-transparent hover:bg-gray-900 transition duration-200 text-white font-bold py-2 px-4 rounded border-2 border-gray-300 w-36 md:w-44"
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => handleAnswer(false)}
                    id="no"
                    className="bg-transparent hover:bg-gray-900 transition duration-200 text-white font-bold py-2 px-4 rounded border-2 border-gray-300 w-36 md:w-44"
                  >
                    No
                  </button>
                </div>
              </>
            ) : (
              <>
                <h2 className="text-3xl text-center text-white py-4">
                  Your score for today is : <br />
                  {dailyScore} out of 20 Pts
                </h2>
                <button
                  onClick={handleUpdatePlan} // Call handleUpdatePlan
                  className="bg-orange-700 hover:bg-orange-800 transition duration-200 text-white font-bold p-2 rounded border-2 border-gray-300"
                >
                  Update Plan
                </button>
              </>
            )}
          </div>
        </>
      ) : (
        <EditWorkout
          userData={userData}
          setUserData={setUserData}
          daysPassed={daysPassed}
          totalScore={totalScore}
          msg={msg}
          setMsg={setMsg}
        />
      )}
    </>
  );
};

export default Quiz;
