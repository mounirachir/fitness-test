import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import ProgressBar from "./ProgressBar";

const EditWorkout = ({
  token,
  setToken,
  userData,
  setUserData,
  daysPassed,
  totalScore,
  msg,
  setMsg,
}) => {
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    if (userData && userData.workout) {
      setSelectedWorkout(userData.workout);
      setLoading(false);
    }
  }, [userData]);

  const toggleEdit = (exerciseId) => {
    setSelectedWorkout((prevWorkout) => ({
      ...prevWorkout,
      exercises: prevWorkout.exercises.map((exercise) =>
        exercise._id === exerciseId
          ? { ...exercise, editable: !exercise.editable }
          : exercise
      ),
    }));
  };

  const handleInputChange = (e, exerciseId, field) => {
    const { value } = e.target;
    setSelectedWorkout((prevWorkout) => ({
      ...prevWorkout,
      exercises: prevWorkout.exercises.map((exercise) =>
        exercise._id === exerciseId ? { ...exercise, [field]: value } : exercise
      ),
    }));
  };

  const handleSubmit = async () => {
    try {
      const decoded = jwtDecode(token || localStorage.getItem("token"));
      const response = await fetch(
        `http://localhost:5000/api/auth/user/${decoded.user.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            score: userData.score,
            daysPassed: userData.daysPassed,
            workout: selectedWorkout,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      console.log("Workout updated successfully!");
      const updatedUserData = await response.json();
      setUserData(updatedUserData.user); // Update user data in the frontend state
      setMsg(updatedUserData.msg);
      alert(updatedUserData.msg);
      setShowMessage(true); // Show the message after successful update
    } catch (error) {
      console.error("Error updating workout:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching workout: {error}</div>;
  }

  if (!selectedWorkout) {
    return <div>Workout not found</div>;
  }

  return (
    <section className="min-h-screen p-4 w-[100%] md:min-w-full overflow-x-auto">
      <h1 className=" mt-5 font-bold text-lg sm:text-xl text-center md:text-4xl text-white whitespace-nowrap">
        <span className="bg-gradient-to-tl from-orange-500 via-transparent to-orange-500 rounded-lg p-2 leading-relaxed">
          YOUR
        </span>{" "}
        CUSTOM{" "}
        <span className="bg-gradient-to-tl from-orange-500 via-transparent to-orange-500 rounded-lg p-2 leading-loose">
          PLAN
        </span>
      </h1>

      <table className="min-w-full bg-gray-900 text-white border-separate border-spacing-2">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b border-gray-500 text-center font-bold bg-gray-600 w-[20%]">
              Exercise
            </th>
            <th className="px-4 py-2 border-b border-gray-500 text-center font-bold bg-gray-600 w-[20%]">
              Sets
            </th>
            <th className="px-4 py-2 border-b border-gray-500 text-center font-bold bg-gray-600 w-[20%]">
              Reps
            </th>
            <th className="px-4 py-2 border-b border-gray-500 text-center font-bold bg-gray-600 w-[20%]">
              Weight
            </th>
            <th className="px-4 py-2 border-b border-gray-500 text-center font-bold bg-gray-600 w-[20%]">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {selectedWorkout.exercises.map((exercise) => (
            <tr key={exercise._id} className="bg-white text-black">
              <td className="px-4 py-2 border-b border-gray-800 text-center font-bold bg-gray-900 text-white">
                {exercise.editable ? (
                  <input
                    type="text"
                    value={exercise.name}
                    onChange={(e) => handleInputChange(e, exercise._id, "name")}
                    className="bg-gray-700 text-white font-bold py-2 px-4 rounded m-2 w-[70%] text-center"
                  />
                ) : (
                  exercise.name
                )}
              </td>
              <td className="px-4 py-2 border-b border-gray-800 text-center font-bold bg-gray-900 text-white">
                {exercise.editable ? (
                  <input
                    type="text"
                    value={exercise.sets}
                    onChange={(e) => handleInputChange(e, exercise._id, "sets")}
                    className="bg-gray-700 text-white font-bold py-2 px-4 rounded m-2 w-[70%] text-center"
                  />
                ) : (
                  exercise.sets
                )}
              </td>
              <td className="px-4 py-2 border-b border-gray-800 text-center font-bold bg-gray-900 text-white">
                {exercise.editable ? (
                  <input
                    type="text"
                    value={exercise.reps}
                    onChange={(e) => handleInputChange(e, exercise._id, "reps")}
                    className="bg-gray-700 text-white font-bold py-2 px-4 rounded m-2 w-[70%] text-center"
                  />
                ) : (
                  exercise.reps
                )}
              </td>
              <td className="px-4 py-2 border-b border-gray-800 text-center font-bold bg-gray-900 text-white">
                {exercise.editable ? (
                  <input
                    type="text"
                    value={exercise.weight}
                    onChange={(e) =>
                      handleInputChange(e, exercise._id, "weight")
                    }
                    className="bg-gray-700 text-white font-bold py-2 px-4 rounded m-2 w-[70%] text-center"
                  />
                ) : (
                  exercise.weight
                )}
              </td>
              <td className="px-4 py-2 border-b border-gray-800 text-center font-bold bg-gray-900 text-white">
                <button
                  className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded m-2"
                  onClick={() => toggleEdit(exercise._id)}
                >
                  {exercise.editable ? "Save" : "Edit"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-center mt-4">
        <button
          onClick={handleSubmit}
          className="bg-orange-700 hover:bg-orange-800 transition duration-200 text-white font-bold py-2 px-4 rounded border-2 border-gray-300 mb-5"
        >
          Update Workout Plan
        </button>
      </div>
    </section>
  );
};

export default EditWorkout;
