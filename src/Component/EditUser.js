import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { ToastContainer, toast } from "react-toastify";

const Editimg = ({ img }) => {
  console.log(img, "imgedit");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [image, setImage] = useState();

  const [data, setData] = useState(img);
  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const EditHandler = async (e, id) => {
    e.preventDefault();
    console.log(id);
    if (
      !data.name ||
      !data.email ||
      !data.password ||
      !data.dish ||
      !data.dishname
    ) {
      toast.error("PLEASE ENTER ALL THE DETAILS", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      try {
        const addimg = await fetch(`http://localhost:8000/EditUser/${id}`, {
          method: "put",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(data),
        });
        const res = await addimg.json();
        console.log(res);
        if (addimg.status === 200) {
          toast.success(res.mess, {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        } else {
          toast.error(res.err, {
            position: "bottom-left",
            autoClose: 1000,
            hideProgressBar: false,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        EDIT
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="h-100 d-flex align-items-center justify-content-center border-2">
            <Form
              onSubmit={(e) => {
                EditHandler(e, img._id);
              }}
              encype="multipart/form-data"
            >
              <Form.Group className="mb-3">
                <Form.Label>NAME</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="ENTER NAME"
                  name="name"
                  defaultValue={img.name}
                  onChange={changeHandler}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  defaultValue={img.email}
                  onChange={changeHandler}
                />
              </Form.Group>
              
              <Form.Group className="mb-3">
                <Form.Label>Enter dish Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Dish name"
                  name="dishname"
                  defaultValue={img.dishname}
                  onChange={changeHandler}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Dish Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter Dish Description"
                  name="dish"
                  defaultValue={img.dish}
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

              <Button variant="primary" type="submit" onClick={handleClose}>
                Submit
              </Button>
            </Form>
            <ToastContainer />
          </div>
        </Modal.Body>
       
        <Modal.Footer>
          <Button variant="secondary" >
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Editimg;
