import React, { useState, useEffect } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody } from 'mdb-react-ui-kit';
import backgroundimg from '../img/page.jpg';
import { useNavigate, useLocation } from 'react-router-dom';

import CustomerTables from './CustomerTables';
import EmployeeTables from './EmployeeTables';
import AdminTables from './AdminTables';

export default function UserHomepage() {
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [editedUser, setEditedUser] = useState(null);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    if (location.state && location.state.user) {
      setUser(location.state.user);
      setEditedUser({ ...location.state.user });
    }
  }, [location.state]);

  const backgroundStyle = {
    background: `url(${backgroundimg})`,
    backgroundSize: 'fill',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  };

  const handleEditProfile = () => {
    setEditMode(true);
  };

  const handleSaveProfile = async () => {
    try {
      const response = await fetch('http://localhost:8080/users', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedUser),
      });

      if (response.ok) {
        setUser(editedUser);
        setEditMode(false);
      } else {
        console.error('Failed to update user profile');
      }
    } catch (error) {
      console.error('An error occurred while updating user profile:', error);
    }
  };

  const handleCancelEdit = () => {
    setEditedUser({ ...user });
    setEditMode(false);
  };


  const nav = useNavigate();

  const handleLogout = () => {
    nav('/Logout');
  };

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
                    <div>
                    <button className="btn btn-primary me-2" onClick={handleSaveProfile}>
                      Save
                    </button>
                     <button className="btn btn-secondary me-2" onClick={handleCancelEdit}>
                     Cancel
                   </button>
                   </div>
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
                        type='text'
                        value={editedUser?.firstName || ''}
                        onChange={(e) => setEditedUser({ ...editedUser, firstName: e.target.value })}
                      />
                    ) : (
                      user?.firstName
                    )}
                  </p>
                  <p>
                    <strong>Last Name:</strong>
                    {editMode ? (
                      <input
                        type='text'
                        value={editedUser?.lastName || ''}
                        onChange={(e) => setEditedUser({ ...editedUser, lastName: e.target.value })}
                      />
                    ) : (
                      user?.lastName
                    )}
                  </p>
                  <p>
                    <strong>Phone Number:</strong>
                    {editMode ? (
                      <input
                        type='text'
                        value={editedUser?.phoneNumber || ''}
                        onChange={(e) => setEditedUser({ ...editedUser, phoneNumber: e.target.value })}
                      />
                    ) : (
                      user?.phoneNumber
                    )}
                  </p>
                  <p>
                    <strong>Email:</strong> {user?.email}
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
                {user?.role === 'CUSTOMER' ? <CustomerTables user={user} /> : null}
                {user?.role === 'EMPLOYEE' ? <EmployeeTables /> : null}
                {user?.role === 'ADMIN' ? <AdminTables /> : null}
              </div>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </MDBContainer>
  );
}
