import React, { useContext } from "react";
import { Typography, Box, styled } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { API } from "../../../services/api";
import { DataContext } from "../../../context/DataProvider";

const Component = styled(Box)`
  margin-top: 30px;
  background: #f5f5f5;
  padding: 10px;
`;

const Container = styled(Box)`
  display: flex;
  margin-bottom: 5px;
`;

const Name = styled(Typography)`
  font-weight: 600;
  font-size: 18px;
  margin-right: 20px;
`;

const StyledDate = styled(Typography)`
  font-size: 14px;
  color: #878787;
`;

const DeleteIcon = styled(Delete)`
  margin-left: auto;
`;
const Comment = ({ comment, setToggle }) => {
  const { account } = useContext(DataContext);

  const handleComment = async () => {
    let response = await API.deleteComment(comment._id);
    if (response.isSuccess) {
      setToggle((prevState) => !prevState);
    }
  };

  return (
    <Component>
      <Container>
        <Name>{comment.name}</Name>

        <StyledDate>{new Date(comment.createdAt).toDateString()}</StyledDate>
        {comment.name === account.username && (
          <DeleteIcon onClick={() => handleComment()} color="error" />
        )}
      </Container>
      <Typography>{comment.comments}</Typography>
    </Component>
  );
};

export default Comment;
