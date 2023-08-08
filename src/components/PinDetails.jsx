import React, { useEffect, useState } from "react";
import { MdDownloadForOffline } from "react-icons/md";
import { v4 as uuidv4 } from "uuid";
import { client, urlFor } from "../client";
import MasnoryLayout from "./MasonryLayout";
import { pinDetailMorePinQuery, pinDetailQuery } from "../utils/data";
import Spinner from "./Spinner";
import { Link, useParams } from "react-router-dom";

const PinDetails = ({ user }) => {
  const [pins, setPins] = useState(null);
  const [pinDetail, setpinDetail] = useState(null);
  const [comment, setComment] = useState("");
  const [addingComment, setAddingComment] = useState(false);
  const { pinId } = useParams();

  const fecthPinDetails = () => {
    let query = pinDetailQuery(pinId);

    client.fetch(query).then((data) => {
      setpinDetail(data[0]);
      if (data[0]) {
        query = pinDetailMorePinQuery(data[0]);
        client.fetch(query).then((response) => {
          setPins(response);
        });
      }
    });
  };

  const addComment = () => {
    if (comment) {
      setAddingComment(true);
      client
        .patch(pinId)
        .setIfMissing({ comments: [] })
        .insert("after", "comments[-1]", [
          {
            comment,
            _key: uuidv4(),
            postedBy: {
              _type: "postedBy",
              _ref: user._id,
            },
          },
        ])
        .commit()
        .then(() => {
          fecthPinDetails();
          setComment("");
          setAddingComment(false);
        });
    }
  };

  useEffect(() => {
    fecthPinDetails();
  }, [pinId]);

  if (!pinDetail) return <Spinner message="Loading Pin.." />;
  return (
    <>
      <div
        className="flex xl:flex-row flex-col m-auto bg-white"
        style={{ maxWidth: "1500px", borderRadius: "32px" }}
      >
        <div className="flex justify-center items-center md:items-start flex-initial">
          <img
            src={pinDetail?.image && urlFor(pinDetail.image).url()}
            alt="pin-image"
            className="rounded-t-3xl rounded-b-lg"
          />
        </div>
        <div className="w-full p-5 flex-1 xl:min-w-620">
          <div className="flex items-center justify-between">
            <div className="flex gap-2 items-center">
              <a
                href={`${pinDetail.image.asset.url}?dl=`}
                download
                onClick={(e) => e.stopPropagation()}
                className="bg-gray-300 w-9 h-9 rounded-full flex items-center justify-center text-slate-900 text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none"
              >
                <MdDownloadForOffline />
              </a>
            </div>
            <div className="flex gap-2 items-center">
              {pinDetail.destination && (
                <a
                  href={pinDetail.destination}
                  rel="noreferrer"
                  target="_blank"
                >
                  {pinDetail.destination?.length > 20
                    ? pinDetail.destination?.slice(8, 20)
                    : pinDetail.destination?.slice(8)}
                </a>
              )}
            </div>
          </div>
          <div>
            <h1 className="text-4xl font-bold mt-3 break-words ">
              {pinDetail.title}
            </h1>
            <p className="mt-3 pl-2">{pinDetail.about}</p>
          </div>
          <Link
            to={`/user-profile/${pinDetail.postedBy._id}`}
            className="flex gap-2 mt-5 items-center bg-white rounded-lg"
            relative="route"
          >
            <img
              className="w-8 h-8 rounded-full object-cover"
              src={pinDetail.postedBy.image}
              alt="user profile"
            ></img>
            <p className="font-semibold capitalize">
              {pinDetail.postedBy.userName}
            </p>
          </Link>
          <h2 className="text-2xl mt-5">Comments</h2>
          <div className="max-h-370 overflow-y-auto">
            {pinDetail?.comments?.map((comment, i) => (
              <div
                className="flex gap-2 mt-5 items-center bg-white rounded-lg"
                key={i}
              >
                <img
                  src={comment.postedBy.image}
                  alt="user-profile"
                  className="w-10 h-10 rounded-full cursor-pointer"
                ></img>
                <div className="flex flex-col">
                  <p className="font-semibold capitalize">
                    {comment.postedBy.userName}
                  </p>
                  <p>{comment.comment}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap mt-6 gap-3 items-center justify-center">
            <Link
              to={`/user-profile/${pinDetail.postedBy._id}`}
              className="flex gap-2 items-center bg-white rounded-lg"
              relative="route"
            >
              <img
                className="w-10 h-10 rounded-full cursor-pointer"
                src={pinDetail.postedBy.image}
                alt="user profile"
              ></img>
            </Link>
            <input
              type="text"
              className="flex-1 border-gray-100 outline-none border-2 p-2 rounded-2xl focus:border-gray-300"
              placeholder="Add a comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></input>
            <button
              type="button"
              className="bg-red-500 py-3 text-white font-semibold rounded-full px-6 text-base outline-none"
              onClick={addComment}
            >
              {addingComment ? "Posting.." : "Post"}
            </button>
          </div>
        </div>
      </div>
      {pins?.length > 0 ? (
        <>
          <h2 className="text-center text-lg font-bold mt-8 mb-4">
            More like this
          </h2>
          <MasnoryLayout pins={pins} />
        </>
      ) : (
        <Spinner message={"loading more spinners"} />
      )}
    </>
  );
};

export default PinDetails;
