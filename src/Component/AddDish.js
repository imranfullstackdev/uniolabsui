import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { NavLink } from "react-router-dom";
import axios from "axios";

const AddDish = () => {
  // name;
  // email;
  // password;
  // dish;
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    dish: "",
    dishname: "",
  });
  const [image, setImage] = useState();
  const [imageName, setimageName] = useState("");
  const navigate = useNavigate();
  // name, email, password, Cpassword, mobile
  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const selectHandler = (e) => {
    setImage(e.target.files[0]);
    setimageName(e.target.files[0].name);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (
      !data.name ||
      !data.email ||
      !data.password ||
      !data.dish ||
      !data.dishname
    ) {
      toast.error("Please enter All The details", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      try {
        // if image exist
        if (image) {
          // if image is of different type
          if (
            image.type === "image/jpeg" ||
            image.type === "image/png" ||
            image.type === "image/jpg"
          ) {
            // validating image size
            if (image.size <= 1023800000000) {
              // if everey thing goes well
              let { body } = data;
              e.preventDefault();
              localStorage.setItem("image", JSON.stringify(image.name));
              const formData = new FormData();
              formData.append("file", image);
              formData.append("fileName", imageName);
              formData.append("name", data.name);
              formData.append("email", data.email);
              formData.append("password", data.password);
              formData.append("dish", data.dish);
              formData.append("dishname", data.dishname);

              console.log(formData, "form");

              const options = {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
                body: JSON.stringify(body),
              };
              try {
                const res = await axios.post(
                  "http://localhost:8000/addUser",
                  formData,
                  data.name,
                  data.email,
                  data.password,
                  data.dish,
                  data.dishname
                );
                // before sending this send the user id
                console.log(res);
                toast("data uploaded sucessfully");
                navigate("/ViewDish");
              } catch (ex) {
                console.log(ex);
              }
            } else {
              toast(
                `the image size is ${Math.round(
                  image.size / 1024
                )}KB please upload image with 100kB`
              );
            }
          } else {
            toast("please enter a valid image");
          }
        } else {
          toast("please enter a image");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  console.log("images", image);
  return (
    <>
      <div className="h-100 d-flex align-items-center justify-content-center border-2">
        <Form onSubmit={submitHandler} encype="multipart/form-data">
          <Form.Group className="mb-3">
            <Form.Label>NAME</Form.Label>
            <Form.Control
              type="text"
              placeholder="ENTER NAME"
              name="name"
              value={data.name}
              onChange={changeHandler}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              value={data.email}
              onChange={changeHandler}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              value={data.password}
              onChange={changeHandler}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Enter dish Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Dish name"
              name="dishname"
              value={data.dishname}
              onChange={changeHandler}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Dish Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter Dish Description"
              name="dish"
              value={data.dish}
              onChange={changeHandler}
            />
          </Form.Group>
          <input
            type="file"
            name="myImage"
            onChange={(event) => {
              setImage(event.target.files[0]);
              console.log("Files", event.target.files[0]);
            }}
          />

          <Button variant="primary" type="submit">
            Submit
          </Button>
          <NavLink to="/">Alredy a User</NavLink>
        </Form>
        <ToastContainer />
      </div>
    </>
  );
};

export default AddDish;
