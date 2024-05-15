import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import React from "react";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";

const BlogCard = ({ title, description, imageURL, userName, isUser, id }) => {
  console.log("id is ", id);
  const navigate = useNavigate();
  const handleEdit = (e) => {
    navigate(`/myblogs/${id}`);
    // console.log(id);
  };

  console.log(title, isUser);
  return (
    <div>
      <Card
        sx={{
          width: "40%",
          margin: "auto",
          padding: "2",
          boxShadow: " 5px 5px 10px #ccc",
          ":hover": {
            boxShadow: " 10px 10px 20px #ccc",
          },
        }}
      >
        {isUser && (
          <Box display={"flex"}>
            <IconButton onClick={handleEdit} sx={{ marginLeft: "auto" }}>
              <ModeEditIcon />
            </IconButton>
            <IconButton
            // onClick={handleDelete}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        )}
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
              {userName}
            </Avatar>
          }
          title={title}
          subheader="September 14, 2016"
        />
        <CardMedia
          component="img"
          height="194"
          image={imageURL}
          alt="Paella dish"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            <b>{userName}</b> {":"} {description}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default BlogCard;
