import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import EditUser from "./EditUser";

const ViewDish = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState([]);
  useEffect(() => {
    if (!localStorage.getItem("Token")) {
      alert("Please login to View this page");
      navigate("/");
    }
  }, []);

  const getImages = async () => {
    const getAllImages = await fetch(`http://localhost:8000/allUser`);
    const res = await getAllImages.json();
    setUser(res);
  };
  useEffect(() => {
    getImages();
  }, []);

  console.log("user", user);
  const DeleteImg = async (id) => {
    // console.log(id)
    const dltuser = await fetch(`http://localhost:8000/dlt/${id}`, {
      method: "Delete",
    });
    alert("deleted sucessfully");
    getImages();
  };
  return (
    <>
      <h1>all images</h1>
      <div className="allImages">
        {user.length === 0 ? (
          <h1>NO IMAGES TO DISPLAY</h1>
        ) : (
          user.map((img) => {
            return (
              <>
                <div
                  style={{
                    width: "18rem",
                    display: "flex",
                    flexWrap: "wrap",
                    padding: "12px",
                  }}
                  key={img._id}
                >
                  <Card
                    style={{ width: "18rem", display: "flex", padding: "12px" }}
                    key={img._id}
                  >
                    <Card.Img
                      variant="top"
                      src={`{localStorage.getItem(
                        "image"
                      )}`}
                    />
                    <Card.Body>
                      <Card.Title>{img.name}</Card.Title>
                      <Card.Text>DISH:{img.dishname}</Card.Text>
                      <Card.Text>DESSCRIPTION:{img.dish}</Card.Text>
                      <div className="d-flex ">
                        <Button
                          variant="primary"
                          onClick={() => DeleteImg(img._id)}
                        >
                          Delete
                        </Button>
                        <Card.Text>
                          <td>
                            <EditUser img={img} />
                          </td>
                        </Card.Text>
                      </div>
                    </Card.Body>
                  </Card>
                </div>
              </>
            );
          })
        )}
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </>
  );
};

export default ViewDish;
