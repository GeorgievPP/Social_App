import React from "react";

import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";

export const Likes = ({likes, userId}) => {
  if (likes.length > 0) {
    return likes.find((like) => like === userId) ? (
      <>
        <ThumbUpAltIcon fontSize="small" />
        &nbsp;
        {likes.length > 2
          ? `You and ${likes.length - 1} others`
          : `${likes.length} like${likes.length > 1 ? "s" : ""}`}
      </>
    ) : (
      <>
        <ThumbUpOffAltIcon fontSize="small" />
        &nbsp;{likes.length} {likes.length === 1 ? "Like" : "Likes"}
      </>
    );
  }

  return (
    <>
      <ThumbUpOffAltIcon fontSize="small" />
      &nbsp;Like
    </>
  );
};
