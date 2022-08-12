import React from "react";
// MUI
import {
  Card,
  CardHeader,
  CardContent,
  Avatar,
  Typography,
} from "@mui/material";

const Comment = ({ c }) => {
  console.log(c);
  return (
    <Card>
      <CardHeader
        avatar={<Avatar aria-label="recipe">{c.jimHelper[0]}</Avatar>}
        title={c.jimHelper}
        // subheader="September 14, 2016"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {c.comment}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Comment;
