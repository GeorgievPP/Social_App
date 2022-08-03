import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Avatar,
  Typography,
} from "@mui/material";

const Comment = ({ c }) => {
  return (
    <Card>
      <CardHeader
        avatar={<Avatar aria-label="recipe">{c.split(": ")[0][0]}</Avatar>}
        title={c.split(": ")[0]}
        subheader="September 14, 2016"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {c.split(":")[1]}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Comment;
