import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  InputBase,
  styled,
  TextareaAutosize,
} from "@mui/material";

import { AddCircle } from "@mui/icons-material";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { DataContext } from "../../context/DataProvider";
import { API } from "../../services/api";
import banner from "../../assets/create-blog-banner.jpg";

const Container = styled(Box)(({ theme }) => ({
  margin: "50px 100px",
  [theme.breakpoints.down("md")]: {
    margin: 0,
  },
}));

const Image = styled("img")({
  width: "100%",
  height: "50vh",
  objectFit: "cover",
});

const StyledFormControl = styled(FormControl)`
  margin-top: 10px;
  display: flex;
  flex-direction: row;
`;

const InputTextField = styled(InputBase)`
  flex: 1;
  font-size: 24px;
  margin: 0 15px;
  padding: 0 16px;
  border: 1px solid #cdc1ff;
  border-radius: 5px;
`;

const TextArea = styled(TextareaAutosize)`
  width: 100%;
  margin-top: 40px;
  font-size: 18px;
  border: 1px solid #cdc1ff;
  border-radius: 5px;
  &:focus-visible {
    outline: none;
  }
`;

const initalValue = {
  title: "",
  description: "",
  picture: "",
  username: "",
  categories: "",
  createdAt: new Date(),
};

const UpdateBlog = () => {
  const [post, setPost] = useState(initalValue);
  const [file, setFile] = useState("");
  const { account } = useContext(DataContext);

  const location = useLocation();
  const navigate = useNavigate();

  const imageUrl = post.picture ? post.picture : banner;
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      let response = await API.getPostById(id);
      if (response.isSuccess) {
        setPost(response.data);
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    const getImage = async () => {
      if (file) {
        const data = new FormData();
        data.append("name", file.name);
        data.append("file", file);

        const response = await API.uploadFile(data);
        post.picture = response.data;
      }
    };
    getImage();
    post.categories = location.search?.split("=")[1] || "All";
    post.username = account.username;
  }, [file]);

  const handleChange = (event) => {
    setPost({ ...post, [event.target.name]: event.target.value });
  };

  const handleUpdate = async () => {
    let response = await API.updatePost(post);
    if (response.isSuccess) {
      navigate(`/blog-details/${id}`);
    }
  };

  return (
    <Container>
      <Image src={imageUrl} alt="create blog banner" />

      <StyledFormControl>
        <label htmlFor="fileInput">
          <AddCircle color="action" fontSize="large" />
        </label>
        <input
          type="file"
          id="fileInput"
          style={{ display: "none" }}
          onChange={(e) => setFile(e.target.files[0])}
        />
        <InputTextField
          name="title"
          value={post.title}
          placeholder="Title"
          onChange={(e) => handleChange(e)}
        />
        <Button variant="contained" onClick={() => handleUpdate()}>
          Update
        </Button>
      </StyledFormControl>
      <TextArea
        minRows={5}
        name="description"
        placeholder="Tell Your Story..."
        value={post.description}
        onChange={(e) => handleChange(e)}
      />
    </Container>
  );
};

export default UpdateBlog;
