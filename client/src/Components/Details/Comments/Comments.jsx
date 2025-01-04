import React, { useContext, useEffect, useState } from "react";
import { Box, Button, styled, TextareaAutosize } from "@mui/material";

import { DataContext } from "../../../context/DataProvider";
import { API } from "../../../services/api";

import Comment from "./Comment";

const Container = styled(Box)`
  margin-top: 100px;
  display: flex;
`;

const Image = styled("img")({
  width: 50,
  height: 50,
  borderRadius: "50%",
});

const StyledTextArea = styled(TextareaAutosize)`
  height: 100px !important;
  width: 100%;
  margin: 0 20px;
`;

const initialValue = {
  name: "",
  postId: "",
  comments: "",
  createdAt: new Date(),
};

const Comments = ({ post }) => {
  const url = "https://static.thenounproject.com/png/12017-200.png";

  const [comment, setComment] = useState(initialValue);

  const [allComments, setAllComments] = useState([]);

  const [toggle, setToggle] = useState(false);

  const { account } = useContext(DataContext);

  useEffect(() => {
    const getComments = async () => {
      let response = await API.getAllComments(post._id);
      if (response.isSuccess) {
        setAllComments(response.data);
      }
    };
    getComments();
  }, [toggle, post._id]);

  const handleChange = (e) => {
    setComment({
      ...comment,
      name: account.username,
      postId: post._id,
      comments: e.target.value,
    });
  };

  const handleComment = async () => {
    const response = await API.newComment(comment);
    if (response.isSuccess) {
      setComment(initialValue);
    }
    setToggle((prevState) => !prevState);
  };
  return (
    <Box>
      <Container>
        <Image src={url} alt="comment avt" />
        <StyledTextArea
          minRows={5}
          placeholder="Your Views ...."
          value={comment.comments}
          onChange={(e) => handleChange(e)}
        />
        <Button
          variant="contained"
          color="primary"
          size="medium"
          style={{ height: 40 }}
          onClick={() => handleComment()}
        >
          Post
        </Button>
      </Container>
      <Box>
        {allComments &&
          allComments.length > 0 &&
          allComments.map((comment) => (
            <Comment comment={comment} setToggle={setToggle} />
          ))}
      </Box>
    </Box>
  );
};

export default Comments;
