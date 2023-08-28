import React from "react";
import { MDBBtn, MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody } from "mdb-react-ui-kit";
import { Link, useNavigate } from "react-router-dom";
import logout from "../img/exit-logout-svgrepo-com.svg"

export default function LogoutPage() {
  const nav = useNavigate();

  const handleLogout = () => {
    //session out
    nav("/");
  };

  return (
    <MDBContainer fluid>
      <MDBContainer fluid>
        <MDBRow className="d-flex justify-content-center align-items-center h-100">
          <MDBCol col="12">
            <MDBCard
              className="bg-dark text-white my-5 mx-auto"
              style={{ borderRadius: "1rem", maxWidth: "400px" }}
            >
              <MDBCardBody className="p-5 d-flex flex-column align-items-center mx-auto w-100">
                <h2 className="fw-bold mb-2 text-uppercase">Logout</h2>
                <img src={logout} alt="Logout" style={{ width: "80px", height: "80px" }} />
                <p className="text-white-50 mb-5">Are you sure you want to logout?</p>

                <button type="button" onClick={handleLogout}>
                  Logout
                </button>

                <div>
                  <p className="mb-0">
                    Back to{" "}
                    <Link to="/" className="text-white-50 fw-bold">
                      Home
                    </Link>
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
