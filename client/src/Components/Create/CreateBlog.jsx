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
import { useLocation, useNavigate } from "react-router-dom";
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

const CreateBlog = () => {
  const [post, setPost] = useState(initalValue);
  const [file, setFile] = useState();
  const { account } = useContext(DataContext);

  const location = useLocation();
  const navigate = useNavigate();

  const imageUrl = post.picture ? post.picture : banner;

  // useEffect(() => {
  //     const getImage = async () => {
  //       if (file) {
  //         const data = new FormData();
  //         data.append("name", file.name);
  //         data.append("file", file);

  //         const response = await API.uploadFile(data);
  //         post.picture = response.data;
  //       }
  //     };
  //     getImage();
  //     post.categories = location.search?.split("=")[1] || "All";
  //     post.username = account.username;
  //   }, [file]);

  useEffect(() => {
    const getImage = async () => {
      if (file) {
        const data = new FormData();
        data.append("name", file.name);
        data.append("file", file);

        try {
          const response = await API.uploadFile(data);
          if (response.isSuccess) {
            setPost((prevPost) => ({
              ...prevPost,
              picture: response.data.path, // Ensure this matches the backend response
            }));
          } else {
            console.error("Image upload failed:", response);
          }
        } catch (error) {
          console.error("Image upload error:", error);
        }
      }
    };

    getImage();
    post.categories = location.search?.split("=")[1] || "All";
    post.username = account.username;
  }, [file]);

  const handleChange = (event) => {
    setPost({ ...post, [event.target.name]: event.target.value });
  };

  const handleSubmit = async () => {
    let response = await API.createPost(post);
    if (response.isSuccess) {
      navigate("/");
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
          placeholder="Title"
          onChange={(e) => handleChange(e)}
        />
        <Button variant="contained" onClick={() => handleSubmit()}>
          Publish
        </Button>
      </StyledFormControl>
      <TextArea
        minRows={5}
        name="description"
        placeholder="Tell Your Story..."
        onChange={(e) => handleChange(e)}
      />
    </Container>
  );
};

export default CreateBlog;
