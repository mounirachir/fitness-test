import React, { useEffect } from "react";
import MyPic from "../assets/my pic.jpg";
import { FaInstagram } from "react-icons/fa";
import { AiOutlineYoutube } from "react-icons/ai";
import { FiGithub } from "react-icons/fi";
import { FaLinkedinIn } from "react-icons/fa";

const About = ({ userData, setUserData }) => {
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
  }, []);
  return (
    <section id="about" className=" min-h-screen ">
      <div className="flex flex-col justify-center items-center p-4">
        <h1 className="font-bold text-2xl mb-2 text-white  md:text-4xl">
          <span className="bg-gradient-to-tl from-orange-500 via-transparent to-orange-500 rounded-lg p-2 leading-relaxed">
            ABOUT
          </span>{" "}
          ME{" "}
          <span className="bg-gradient-to-tl from-orange-500 via-transparent to-orange-500 rounded-lg p-2 leading-loose">
            PAGE
          </span>
        </h1>
        <h2 className="font-bold text-center text-lg md:text-2xl m-5 text-white">
          Hello, I'm MnR, the Developer of This Web App
        </h2>
        <img
          src={MyPic}
          alt=""
          className="w-[30%] md:w-[15%] m-2 border-4 border-gray-300 rounded-lg"
        />
        <p className="text-center text-md md:text-xl text-white m-5">
          You can find me on social media by clicking on the icons below
        </p>
        <div className="flex gap-4 text-4xl">
          <a
            href="https://www.instagram.com/mounir___achir/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram className="cursor-pointer bg-black hover:text-orange-600 transition duration-200 text-gray-300 rounded-lg" />
          </a>
          <a
            href="https://www.linkedin.com/in/mounir-achir-7375a7317/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedinIn className="cursor-pointer bg-black hover:text-orange-600 transition duration-200 text-gray-300 rounded-lg" />
          </a>
          <a
            href="https://www.youtube.com/channel/UC1hVGE69n1a4aCXEzDYYyuA"
            target="_blank"
            rel="noopener noreferrer"
          >
            <AiOutlineYoutube className="cursor-pointer bg-black hover:text-orange-600 transition duration-200 text-gray-300 rounded-lg" />
          </a>
          <a
            href="https://github.com/mounirachir"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FiGithub className="cursor-pointer bg-black hover:text-orange-600 transition duration-200 text-gray-300 rounded-lg" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default About;
