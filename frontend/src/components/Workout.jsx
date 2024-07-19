import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";

const Workout = ({ userData, setUserData }) => {
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [slug, setSlug] = useState(""); // State to hold the current slug

  useEffect(() => {
    // Update slug whenever userData.program changes
    const newSlug = userData.program.join("-");
    setSlug(newSlug);
  }, [userData.program]);

  useEffect(() => {
    const fetchWorkout = async () => {
      setLoading(true); // Set loading state to true when starting fetch

      try {
        if (!slug) {
          return; // Return early if slug is empty
        }

        console.log("Fetching workout with slug:", slug); // Log the slug for debugging

        const response = await fetch(
          `http://localhost:5000/api/workouts/${slug}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setUserData({ ...userData, workout: data });
        console.log("Received workout data:", data); // Log the received data for debugging
        setSelectedWorkout(data);
        setLoading(false); // Set loading state to false after successful fetch
        // setUserData({ ...userData, program: [] });
      } catch (error) {
        console.error("Error fetching workout:", error);
        setError(error.message || "Error fetching workout");
        setLoading(false); // Set loading state to false on error
      }
    };

    fetchWorkout();
  }, [slug]); // Fetch whenever slug changes

  const weekDays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const trainingDays = ["Monday", "Wednesday", "Friday"];

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching workout: {error}</div>;
  }

  if (!selectedWorkout) {
    return <div>Workout not found</div>;
  }
  if (userData.program.length !== 3) {
    console.log("redirection");
    alert("click on the start now button");
    return <Navigate to="/" />;
  }
  return (
    <section className="min-h-screen p-4">
      <h1 className="font-bold text-lg mb-4 sm:text-xl text-center md:text-4xl text-white whitespace-nowrap">
        <span className="bg-gradient-to-tl from-orange-500 via-transparent to-orange-500 rounded-lg p-2 leading-relaxed">
          YOUR
        </span>{" "}
        CUSTOM{" "}
        <span className="bg-gradient-to-tl from-orange-500 via-transparent to-orange-500 rounded-lg p-2 leading-loose">
          PLAN
        </span>
      </h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-900 text-white border-separate border-spacing-2">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b border-gray-500 text-center font-bold bg-gray-600">
                Day
              </th>
              <th className="px-4 py-2 border-b border-gray-500 text-center font-bold bg-gray-600">
                Exercise
              </th>
              <th className="px-4 py-2 border-b border-gray-500 text-center font-bold bg-gray-600">
                Sets
              </th>
              <th className="px-4 py-2 border-b border-gray-500 text-center font-bold bg-gray-600">
                Reps
              </th>
              <th className="px-4 py-2 border-b border-gray-500 text-center font-bold bg-gray-600">
                Weight
              </th>
            </tr>
          </thead>
          <tbody>
            {weekDays.map((day, dayIndex) =>
              trainingDays.includes(day) ? (
                selectedWorkout.exercises.map((exercise, exerciseIndex) => (
                  <tr
                    key={`${dayIndex}-${exerciseIndex}`}
                    className="bg-white text-black"
                  >
                    {exerciseIndex === 0 && (
                      <td
                        rowSpan={selectedWorkout.exercises.length}
                        className="px-4 py-2 border-b border-gray-800 text-center font-bold bg-gray-600 text-white"
                      >
                        {day}
                      </td>
                    )}
                    <td className="px-4 py-2 border-b border-gray-800 text-center font-bold bg-gray-900 text-white">
                      {exercise.name}
                    </td>
                    <td className="px-4 py-2 border-b border-gray-800 text-center font-bold bg-gray-900 text-white">
                      {exercise.sets}
                    </td>
                    <td className="px-4 py-2 border-b border-gray-800 text-center font-bold bg-gray-900 text-white">
                      {exercise.reps}
                    </td>
                    <td className="px-4 py-2 border-b border-gray-800 text-center font-bold bg-gray-900 text-white">
                      {exercise.weight}
                    </td>
                  </tr>
                ))
              ) : (
                <tr
                  key={dayIndex}
                  className="bg-gray-900 text-white bg-gray-600"
                >
                  <td className="px-4 py-2 border-b border-gray-500 text-center font-bold">
                    {day}
                  </td>
                  <td
                    colSpan="4"
                    className="px-4 py-2 border-b border-gray-800 text-center font-bold"
                  >
                    Rest Day
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mt-8">
        <Link
          to="/signup"
          className="bg-orange-700 hover:bg-orange-800 transition duration-200 text-white font-bold py-2 px-4 rounded border-2 border-gray-300"
        >
          Sign Up
        </Link>
      </div>
    </section>
  );
};

export default Workout;
