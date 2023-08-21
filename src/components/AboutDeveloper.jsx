import React from "react";
import Profile from "../assets/Profile.png";

const AboutDeveloper = () => {
  return (
    <div className="flex h-screen flex-col bg-white md:justify-center md:items-center">
      <div className="flex flex-col justify-center items-center ">
        <p className="text-4xl font-bold flex">Profile</p>
        <p className="text-xl font-bold flex mt-6">
          I'm a Full Stack Developer
        </p>
      </div>
      <div className="mt-6 flex md:flex-row flex-col justify-center items-center gap-2">
        {/* <div className="flex w-96 flex-col">
          <h1 className="flex text-2xl font-bold justify-center">About me</h1>
          <p className="flex text-base font-medium flex-wrap mt-2 ">
            I am an allround web developer. I am a senior programmer with good
            knowledge of front-end techniques. Vitae sapien pellentesque
            habitant morbi tristique senectus et. Aenean sed adipiscing diam
            donec adipiscing tristique risus I am an allround web developer. I
            am a senior programmer with good knowledge of front-end techniques.
            Vitae sapien pellentesque habitant morbi tristique senectus et.
            Aenean sed adipiscing diam donec adipiscing tristique risus
          </p>
        </div> */}
        <div className="flex justify-center items-center ">
          <img
            src={Profile}
            alt="developer-profile"
            className="rounded-full w-96 "
          />
        </div>
        <div className="flex flex-col w-96 justify-center items-center">
          <h1 className="flex text-2xl font-bold">Details</h1>
          <div className="flex flex-col  ">
            <h1 className="text-base font-semibold">Name:</h1>
            <p className="text-base font-medium">Ponnada Durga Prasad</p>
            <h1 className="text-base font-semibold mt-2">Technologies</h1>
            <p className="flex text-base font-medium">
              C#, Asp.net Core, Angular, ReactJs, ReactNative, SqlServer, MySql
            </p>
            <h1 className="text-base font-semibold mt-2">Location:</h1>
            <p className="flex text-base font-medium">Hyderabad</p>
            <h1 className="text-base font-semibold mt-2">Contact:</h1>
            <p className="flex text-base font-medium">+91 8179738082</p>
            <p className="flex text-base font-medium">
              prasadponnada09@gmail.com
            </p>
            <h1 className=" text-base font-semibold mt-2">Git Profile:</h1>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://github.com/Ponnada96"
              className=" text-blue-600 font-semibold"
            >
              https://github.com/Ponnada96
            </a>
            <h1 className=" text-base font-semibold mt-2">Twitter:</h1>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://twitter.com/PrasadPonnada09"
              className=" text-blue-600 font-semibold"
            >
              https://twitter.com/PrasadPonnada09
            </a>
            <h1 className="flex text-base font-semibold mt-2">Linkdin:</h1>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://www.linkedin.com/in/ponnada-durga-prasad-8a5493152/"
              className="flex text-blue-600 font-semibold"
            >
              https://www.linkedin.com/in/ponnada-durga-prasad-8a5493152/
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutDeveloper;
