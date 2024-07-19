import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Hero_Image from "../assets/hero_image.png";

const Home = ({ userData, setUserData, token, setToken }) => {
  const navigate = useNavigate();

  useEffect(() => {
    setUserData({
      email: "",
      password: "",
      name: "",
      confirmPassword: "",
      age: "",
      gender: "",
      weight: "",
      height: "",
      activityLevel: "",
      program: [],
    });

    if (token) {
      navigate("/dashboard");
    }
  }, [token]);

  return (
    !token && (
      <div className="min-h-screen flex flex-col">
        <section className="grid lg:grid-cols-2 gap-4 flex-grow">
          {/* left side */}
          <div className="flex flex-col justify-center items-center p-4 m-auto md:p-8">
            <h1 className="font-bold text-2xl mb-4 lg:mr-20 text-white text-center lg:text-left md:text-4xl lg:text-3xl whitespace-nowrap">
              <span className="bg-gradient-to-tl from-orange-500 via-transparent to-orange-500 rounded-lg p-2 leading-relaxed">
                EveryBody
              </span>
              <br />
              Can Have Their Dream {""}
              <span className="bg-gradient-to-tl from-orange-500 via-transparent to-orange-500 rounded-lg p-2 leading-loose">
                Body
              </span>
            </h1>
            <p className="text-lg md:text-2xl lg:text-xl text-white text-center lg:text-left">
              We make health and fitness easy and simple for everyone
              <br />
              Get your custom program and start your journey.
            </p>
            <div className="flex justify-center md:justify-start items-center m-5 gap-3">
              <Link
                to="/programs"
                className="md:text-2xl lg:text-xl bg-orange-700 hover:bg-orange-800 transition duration-200 text-white font-bold md:py-3 py-2 px-4 rounded border-2 border-gray-300"
              >
                Start Now
              </Link>
            </div>
          </div>
          {/* right side */}
          <div className="p-5 justify-center items-center hidden lg:flex">
            <img
              src={Hero_Image}
              alt="Hero"
              className="w-full md:w-[45%] h-auto "
            />
          </div>
        </section>
      </div>
    )
  );
};

export default Home;
