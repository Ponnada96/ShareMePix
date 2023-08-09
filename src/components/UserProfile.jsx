import React, { useEffect, useState } from "react";
import { AiOutlineLogout } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "./Spinner";
import { client } from "../client";
import {
  userCreatedPinsQuery,
  userQuery,
  userSavedPinsQuery,
} from "../utils/data";
import { googleLogout } from "@react-oauth/google";
import MasonryLayout from "./MasonryLayout";

const randomImage =
  "https://source.unsplash.com/1600x900/?nature,photography,technology";

const activeBtnStyles =
  "bg-red-500 text-white font-bold p-2 rounded-full w-20 outline-none";
const notActiveBtnStyles =
  "bg-primary text-black p-2 rounded-full w-20 outline-none";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [pins, setPins] = useState(null);
  const [text, setText] = useState("created");
  const [activeBtn, setActveBtn] = useState("created");
  const navigate = useNavigate();
  const { userId } = useParams();

  useState(() => {
    client.fetch(userQuery(userId)).then((response) => setUser(response[0]));
  }, [userId]);

  useEffect(() => {
    if (text === "created") {
      const createdPinsQuery = userCreatedPinsQuery(userId);
      client.fetch(createdPinsQuery).then((response) => {
        console.log("createdPinsQuery", response);
        setPins(response);
      });
    } else {
      const savedPinsQuery = userSavedPinsQuery(userId);
      client.fetch(savedPinsQuery).then((response) => {
        setPins(response);
      });
    }
  }, [text, userId]);

  if (!user) return <Spinner message="Loading profile" />;
  return (
    <div className="relative pb-2 h-full justify-center items-center">
      <div className="flex flex-col pb-5">
        <div className="relative flex flex-col mb-7">
          <div className="flex flex-col justify-center items-center">
            <img
              className="w-full h-370 2xl:h-510 shadow-lg object-cover"
              src={randomImage}
              alt="banner-pic"
            />
            {console.log(user)}
            <img
              src={user.image}
              className="w-20 h-20 rounded-full -mt-10"
              alt="user-pic"
            />
            <h1 className="text-3xl font-bold text-center mt-3">
              {user.userName}
            </h1>
            <div className="absolute top-0 z-10 right-0 p-2">
              {userId === user._id && (
                <button
                  type="button"
                  className="bg-white p-2 rounded-full cursor-pointer outline-none shadow-md"
                >
                  <AiOutlineLogout
                    color="red"
                    fontSize={21}
                    onClick={() => {
                      googleLogout();
                      navigate("/login");
                    }}
                  />
                </button>
              )}
            </div>
            <div className="text-center mb-7 flex gap-4">
              <button
                type="button"
                onClick={(e) => {
                  console.log(e.target.textContent);
                  setText(e.target.textContent);
                  setActveBtn("created");
                }}
                className={`${
                  activeBtn === "created" ? activeBtnStyles : notActiveBtnStyles
                }`}
              >
                Created
              </button>
              <button
                type="button"
                onClick={(e) => {
                  console.log(e.target.textContent);
                  setText(e.target.textContent);
                  setActveBtn("saved");
                }}
                className={`${
                  activeBtn === "saved" ? activeBtnStyles : notActiveBtnStyles
                }`}
              >
                Saved
              </button>
            </div>
            {pins?.length > 0 ? (
              <div>
                <MasonryLayout pins={pins} />
              </div>
            ) : (
              <div className="flex font-bold text-xl w-full justify-center items-center">
                No Pins Found!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
