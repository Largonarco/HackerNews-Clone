"use client";

import Link from "next/link";
import { IoChevronDownOutline, IoChevronUpOutline } from "react-icons/io5";

import dayjs from "dayjs";
import React, { useState } from "react";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const Comment: React.FC<any> = ({ id, by, time, text, kids, parent, depth = 0, fetchReplies }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [replies, setReplies] = useState<Comment[]>([]);
  const [showReplies, setShowReplies] = useState(false);

  const toggleReplies = async () => {
    if (kids && kids.length > 0 && replies.length === 0) {
      const fetchedReplies = await fetchReplies(kids);
      setReplies(fetchedReplies);
    }

    setShowReplies(!showReplies);
  };

  return (
    <div
      className={`mt-4 border-l-2 border-gray-200 dark:border-gray-800 pl-4 ${
        depth > 0 ? "ml-4" : ""
      }`}>
      <div className="text-sm text-gray-600">
        <Link href={`/user/${by}`} className="font-medium hover:underline">
          {by}
        </Link>{" "}
        commented {dayjs.unix(time).fromNow()} |{" "}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="ml-2 text-gray-500 hover:text-gray-800 ">
          [{isExpanded ? "collapse" : "expand"}]
        </button>
      </div>

      {isExpanded && (
        <>
          <div
            className="mt-2 text-gray-800 dark:text-black text-wrap"
            dangerouslySetInnerHTML={{ __html: text }}
            style={{
              overflowWrap: "break-word",
              wordBreak: "break-word",
              hyphens: "auto",
            }}
          />

          {kids && kids.length > 0 && depth < 5 && (
            <div className="mt-2">
              <button
                onClick={toggleReplies}
                className="text-sm text-gray-500 hover:underline flex items-center">
                {showReplies ? (
                  <>
                    <IoChevronUpOutline className="w-4 h-4 mr-1" />
                    Hide replies
                  </>
                ) : (
                  <>
                    <IoChevronDownOutline className="w-4 h-4 mr-1" />
                    Show {kids.length} {kids.length === 1 ? "reply" : "replies"}
                  </>
                )}
              </button>

              {showReplies && (
                <div className="mt-2">
                  {replies.map((reply, index) => (
                    <Comment {...reply} key={index} depth={depth + 1} fetchReplies={fetchReplies} />
                  ))}
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Comment;
