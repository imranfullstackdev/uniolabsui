import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand
            style={{
              background: "#7600dc",
              color: "#fff",
              padding: "12px",
              marginLeft: "20px",
              marginRight: "20px",
              borderRadius:"12px"
            }}
          >
            Unio Labs
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavLink
                to="/"
                style={({ isActive }) => ({
                  textDecoration: isActive ? "none" : "none",
                  color: isActive ? "#fff" : "#545e6f",
                  background: isActive ? "#7600dc" : "#f0f0f0",
                  borderRadius: isActive ? "12px" : "12px",
                  padding: isActive ? "12px" : "20px",
                  marginLeft: isActive ? "20px" : "20px",
                  marginRight: isActive ? "20px" : "20px",
                })}
              >
                Home
              </NavLink>
              <NavLink
                to="/AddDish"
                style={({ isActive }) => ({
                  color: isActive ? "#fff" : "#545e6f",
                  background: isActive ? "#7600dc" : "#f0f0f0",
                  borderRadius: isActive ? "12px" : "12px",
                  padding: isActive ? "12px" : "20px",
                  marginLeft: isActive ? "20px" : "20px",
                  marginRight: isActive ? "20px" : "20px",
                })}
              >
                AddDish
              </NavLink>
              <NavLink
                to="/ViewDish"
                style={({ isActive }) => ({
                  color: isActive ? "#fff" : "#545e6f",
                  background: isActive ? "#7600dc" : "#f0f0f0",
                  borderRadius: isActive ? "12px" : "20px",
                  padding: isActive ? "12px" : "20px",
                  marginLeft: isActive ? "20px" : "20px",
                  marginRight: isActive ? "20px" : "20px",
                })}
              >
                View All
              </NavLink>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
