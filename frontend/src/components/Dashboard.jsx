import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import Quiz from "./Quiz";
import ProgressBar from "./ProgressBar";
import EditWorkout from "./EditWorkout";

const Dashboard = ({ token, setToken, userData, setUserData, msg, setMsg }) => {
  const [totalScore, setTotalScore] = useState(0);
  const [daysPassed, setDaysPassed] = useState(0);

  const [showWorkout, setShowWorkout] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);
  const [dailyScoreMessage, setDailyScoreMessage] = useState("");
  const [tomorrow, setTomorrow] = useState(null); // State to hold tomorrow's date
  const navigate = useNavigate();

  // Questions array
  const questions = [
    { question: "Did you train today?" },
    { question: "Did you add reps or weight to an exercise today?" },
    {
      question: "Did you add sets or reduce rest time for an exercise today?",
    },
    { question: "Did you follow your diet today?" },
    { question: "Did you drink 3 liters of water today?" },
    { question: "Did you do 10k steps today?" },
    { question: "Did you sleep 8 hours last night?" },
    { question: "Did you take your supplements today?" },
    { question: "Did you eat all your meals today?" },
    { question: "Did you enjoy the quiz?" },
  ];

  useEffect(() => {
    const fetchUserData = async () => {
      if (token || localStorage.getItem("token")) {
        try {
          const decoded = jwtDecode(token || localStorage.getItem("token"));
          const response = await fetch(
            `http://localhost:5000/api/auth/user/${decoded.user.id}`
          );
          if (response.ok) {
            const data = await response.json();
            console.log(data);
            setUserData(data.user);
            setTotalScore(data.user.score || 0);
            setDaysPassed(data.user.daysPassed || 0);
            setMsg(data.msg);
          } else {
            throw new Error("Failed to fetch user data from server.");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        navigate("/login");
      }
    };

    fetchUserData();
  }, [token, navigate]);

  useEffect(() => {
    setShowWorkout(true);
    console.log("show workout", showWorkout);
  }, [showWorkout]);

  const handleQuizFinish = async (dailyScore) => {
    const updatedTotalScore = totalScore + dailyScore;
    setTotalScore(updatedTotalScore);
    setQuizFinished(true);
    setDailyScoreMessage(`Your daily score is: ${dailyScore} out of 20 pts`);

    try {
      const decoded = jwtDecode(token);

      const response = await fetch(
        `http://localhost:5000/api/auth/user/${decoded.user.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            score: updatedTotalScore,
            daysPassed: daysPassed, // Make sure daysPassed is defined in your scope
            workout: userData.workout || "", // Ensure workout is included or set a default
            workoutUpdated: userData.workoutUpdated,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update user progress");
      }

      const data = await response.json();
      setUserData((prevUserData) => ({
        ...prevUserData,
        score: updatedTotalScore,
      }));
      console.log(data.msg); // Log success message
    } catch (error) {
      console.error("Error updating user progress:", error.message);
    }
  };

  if (msg === "") {
    return (
      token && (
        <section className="flex flex-col justify-center items-center relative min-h-screen">
          <Quiz
            userData={userData}
            setUserData={setUserData}
            questions={questions}
            onFinish={handleQuizFinish}
            daysPassed={daysPassed}
            totalScore={totalScore}
            msg={msg}
            setMsg={setMsg}
          />
        </section>
      )
    );
  } else {
    return (
      token && (
        <section className="flex flex-col justify-center items-center relative min-h-screen">
          

          <h1 className="font-bold text-2xl md:text-5xl text-white mb-10 text-center bg-gradient-to-tl from-orange-500 via-transparent to-orange-500 rounded-lg p-4 leading-relaxed">
            <span>Your Progress Has Been Saved,</span>
            <br />
            <span>Come Back Tomorrow For More Gains!</span>
            <br />
            <span>
              {new Date(
                new Date(userData.workoutUpdated).getTime() +
                  24 * 60 * 60 * 1000
              ).toLocaleString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                day: "numeric",
                month: "long", // 'long' for full month name like "July"
                year: "numeric",
                hour12: false, // Use 24-hour format
              })}
            </span>
          </h1>
        </section>
      )
    );
  }
};
export default Dashboard;
