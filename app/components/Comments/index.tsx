import React from "react";
import Comment from "./Comment";

import { CommentsProps } from "@/app/types";
import { fetchUserComments } from "../../utils/users";

const Comments: React.FC<CommentsProps> = ({ comments }) => {
  return (
    <div className="space-y-4">
      {comments.map((comment, index) => (
        <Comment key={index} {...comment} fetchReplies={fetchUserComments} />
      ))}
    </div>
  );
};

export default Comments;
