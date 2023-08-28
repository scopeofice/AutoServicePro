import React, { useState } from "react";
import axios from "axios";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
} from "mdb-react-ui-kit";
import Nav from "react-bootstrap/Nav";
import backgroundImage from "../img/Login.jpg";
import { Link, useNavigate } from "react-router-dom";

export default function LoginPage() {
  const nav = useNavigate();
  const backgroundStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async () => {
    // alert(email + " " + password)

      try {
        const response = await axios.post("http://localhost:8080/login", {
          email,
          password,
        });
  
        if (response.status === 200) {
          setData(response.data);
          // alert(response.data.email+" "+response.data.role);
          
          setEmail("");
          setPassword("");
          nav("/User", { state: { user: data } });
        } else {
          setErrorMessage("Invalid credentials. Please try again.");
        }
      } catch (error) {
        console.error("Login failed", error);
        setErrorMessage("An error occurred while logging in.");
      }
    };

  return (
    <MDBContainer fluid style={backgroundStyle}>
      <MDBContainer fluid>
        <MDBRow className="d-flex justify-content-center align-items-center h-100">
          <MDBCol col="12">
            <MDBCard
              className="bg-dark text-white my-5 mx-auto"
              style={{ borderRadius: "1rem", maxWidth: "400px" }}
            >
              <MDBCardBody className="p-5 d-flex flex-column align-items-center mx-auto w-100">
                <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                <p className="text-white-50 mb-5">
                  Please enter your login and password!
                </p>


                <MDBInput
                  wrapperClass="mb-4 mx-5 w-100"
                  labelClass="text-white"
                  label="Email"
                  id="formEmail"
                  type="text"
                  size="lg"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <MDBInput
                  wrapperClass="mb-4 mx-5 w-100"
                  labelClass="text-white"
                  label="Password"
                  id="formControlLg"
                  type="password"
                  size="lg"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <button
                  // className="w-100"
                  type="button"
                  onClick={handleLogin}
                >
                  Login
                </button>


                <div>{errorMessage && <p>{errorMessage}</p>}</div>

                <div>
                  <p className="mb-0">
                    Don't have an account?{" "}
                    <Nav.Link
                      as={Link}
                      to="/Registration"
                      className="text-white-50 fw-bold"
                    >
                      Sign Up
                    </Nav.Link>
                  </p>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </MDBContainer>
  );
}
