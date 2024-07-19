import React, { useState, useEffect } from "react";
import emailjs from "emailjs-com";

const Contact = ({ userData, setUserData }) => {
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
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .send(
        "service_xgao39p",
        "template_mpg2ofp",
        formData,
        "T0DwtB5bjFh8ZvSGZ"
      )
      .then(
        (response) => {
          console.log("SUCCESS!", response.status, response.text);
          alert("Email sent successfully!");
        },
        (error) => {
          console.error("FAILED...", error);
          alert("Failed to send email. Please try again later.");
        }
      );

    // Reset form fields after submission
    setFormData({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <section id="contact" className=" min-h-screen">
      <div className="flex flex-col justify-center items-center p-4">
        <h1 className="font-bold text-2xl text-white mt-5 text-center md:text-4xl whitespace-nowrap">
          <span className="bg-gradient-to-tl from-orange-500 via-transparent to-orange-500 rounded-lg p-2 leading-relaxed">
            CONTACT
          </span>{" "}
          VIA{" "}
          <span className="bg-gradient-to-tl from-orange-500 via-transparent to-orange-500 rounded-lg p-2 leading-loose">
            EMAIL
          </span>
        </h1>
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-center p-4"
      >
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          required
          className="w-[60%] p-3 m-2 text-xl rounded border-2 border-gray-300 md:p-5"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
          className="w-[60%] p-3 md:p-5 m-3 text-xl rounded border-2 border-gray-300"
        />
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Message"
          required
          className="w-[60%] h-32 p-3 md:p-5 m-2 text-xl rounded border-2 border-gray-300 resize-none"
        ></textarea>
        <button
          className="md:text-2xl lg:text-xl m-2 bg-orange-700 hover:bg-orange-800 transition duration-200
               text-white font-bold py-2 px-4 rounded border-2 border-gray-300 "
          type="submit"
        >
          Send
        </button>
      </form>
    </section>
  );
};

export default Contact;
