import React from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody } from 'mdb-react-ui-kit';
import CustomerTables from './CustomerTables';
import EmployeeTables from './EmployeeTables';
import AdminTables from './AdminTables';
import backgroundimg from '../img/page.jpg';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';


export default function UserHomepage() {

  const location = useLocation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (location.state && location.state.user) {
      setUser(location.state.user);
    }
  }, [location.state]);


  // const [user,setUser]=useState({firstName: 'John',
  // lastName: 'Doe',
  // email: 'john@example.com',
  // phoneNumber: '123-456-7890',});


  // const userRole="CUSTOMER";
  // const userRole = "ADMIN";
  // const userRole="EMPLOYEE";


  // const backgroundStyle = {
  //   background: 'rgb(200, 200, 200)', // Match the dark theme background color
  //   color: 'white', // Match the text color for visibility
  //   backgroundSize: 'cover',
  //   backgroundPosition: 'center',
  //   backgroundRepeat: 'no-repeat',
  // };
  const backgroundStyle = {
    background: `url(${backgroundimg})`,
    backgroundSize: 'fill',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  };


  
  const [editMode, setEditMode] = useState(false);
  const [editedUser, setEditedUser] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phoneNumber: user.phoneNumber,
  });
  const handleEditProfile = () => {
    setEditMode(true);
  };


  // Update the user's profile and exit edit mode
const handleSaveProfile = () => {
  setUser({
    firstName: editedUser.firstName,
    lastName: editedUser.lastName,
    email: editedUser.email,
    phoneNumber: editedUser.phoneNumber,
  });
  setEditedUser({
    firstName: editedUser.firstName,
    lastName: editedUser.lastName,
    email: editedUser.email,
    phoneNumber: editedUser.phoneNumber,
  });
  setEditMode(false);
};

const nav=useNavigate();

const handleLogout=()=>{
  nav("/Logout")
}





  return (
    <MDBContainer fluid style={backgroundStyle}>
      <MDBContainer fluid>
        <MDBRow className='d-flex justify-content-center align-items-center h-100'>
          <MDBCol col='12'>
            <MDBCard
              className='my-5 mx-auto'
              style={{ borderRadius: '1rem', maxWidth: '90%' }}
            >
              <MDBCardBody className='p-3 mx-auto w-100' style={{ fontSize: '20px' }}>
                <div className="d-flex justify-content-end align-items-center mb-3">
                  {editMode ? (
                    <button className="btn btn-primary me-2" onClick={handleSaveProfile}>
                      Save
                    </button>
                  ) : (
                    <button className="btn btn-primary me-2" onClick={handleEditProfile}>
                      Edit
                    </button>
                  )}
                  <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
                </div>

                <div className="d-flex flex-column">
                  <h2 className='fw-bold mb-10 text-uppercase'>Welcome!</h2>
                </div>
                <hr />
                <div className="text-start">
                  <p>
                    <strong>First Name:</strong>
                    {editMode ? (
                      <input
                        type="text"
                        value={editedUser.firstName}
                        onChange={(e) =>
                          setEditedUser({ ...editedUser, firstName: e.target.value })
                        }
                      />
                    ) : (
                      editedUser.firstName
                    )}
                  </p>
                  <p>
                    <strong>Last Name:</strong>
                    {editMode ? (
                      <input
                        type="text"
                        value={editedUser.lastName}
                        onChange={(e) =>
                          setEditedUser({ ...editedUser, lastName: e.target.value })
                        }
                      />
                    ) : (
                      editedUser.lastName
                    )}
                  </p>
                  <p>
                    <strong>Email:</strong> {editedUser.email}
                  </p>
                  <p>
                    <strong>Phone Number:</strong>
                    {editMode ? (
                      <input
                        type="text"
                        value={editedUser.phoneNumber}
                        onChange={(e) =>
                          setEditedUser({ ...editedUser, phoneNumber: e.target.value })
                        }
                      />
                    ) : (
                      editedUser.phoneNumber
                    )}
                  </p>
                </div>

              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
        <MDBRow className='d-flex justify-content-center align-items-center h-100'>
          <MDBCol col='12'>
            <MDBCard
              className='my-5 mx-auto'
              style={{ borderRadius: '1rem', maxWidth: '90%' }}
            >
              <div>
                {user.role === 'CUSTOMER' ? <CustomerTables /> : null}
                {user.role === 'EMPLOYEE' ? <EmployeeTables /> : null}
                {user.role === 'ADMIN' ? <AdminTables /> : null}
              </div>

            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </MDBContainer>
  );
}
