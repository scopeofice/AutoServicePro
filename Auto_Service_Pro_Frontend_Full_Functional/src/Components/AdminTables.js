import React, { useState, useEffect } from 'react';
import { Tabs, Tab, Table, Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';

const AdminTables = () => {
    // const [users, setUsers] = useState([
    //     {
    //         id: 1,
    //         firstName: 'John',
    //         lastName: 'Doe',
    //         email: 'john@example.com',
    //         phoneNumber: '123-456-7890',
    //         role: 'customer'
    //     },
    //     // ...other user objects
    // ]);

    var i = 1;
    var j = 1;


    // const [services, setServices] = useState([
    //     {
    //         id: 1,
    //         serviceName: 'Service 1',
    //         description: 'Description of Service 1',
    //         price: 100
    //     },
    //     // ...other service objects
    // ]);

    const [showRoleChangeModal, setShowRoleChangeModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const [showAddServiceModal, setShowAddServiceModal] = useState(false);
    const [newService, setNewService] = useState({
        // serviceId: 0,
        serviceName: '',
        description: '',
        price: 0
    });

    const [services, setServices] = useState([]);

    // Fetch services from the API on component mount
    useEffect(() => {
        axios.get('http://localhost:8080/admin/service')
            .then(response => {
                setServices(response.data);
            })
            .catch(error => {
                console.error('Error fetching services:', error);
            });
    }, []);

    // const handleAddService = () => {
    //     // Add the new service and close the modal
    //     setServices([...services, newService]);
    //     setShowAddServiceModal(false);
    // };

    // const handleDeleteService = (serviceId) => {
    //     // Send a DELETE request to the API
    //     alert(serviceId)
    //     axios.delete(`http://localhost:8080/admin/service/${serviceId}`)
    //         .then(response => {
    //             // Remove the deleted service from the state
    //             setServices(prevServices => prevServices.filter(service => service.id !== serviceId));
    //             console.log('Service deleted successfully');
    //         })
    //         .catch(error => {
    //             console.error('Error deleting service:', error);
    //         });
    // };

    const handleDeleteService = (serviceId) => {
        // Send a DELETE request to the API
        axios.delete(`http://localhost:8080/admin/service/${serviceId}`)
            .then(response => {
                // Remove the deleted service from the state
                setServices(prevServices => prevServices.filter(service => service.serviceId !== serviceId));
                console.log('Service deleted successfully');
            })
            .catch(error => {
                console.error('Error deleting service:', error);
            });
    };



    // const handleRoleChange = (user) => {
    //     setSelectedUser(user);
    //     setShowRoleChangeModal(true);
    // };

    // const handleChangeRole = () => {
    //     // Update the user's role and close the modal
    //     const updatedUsers = users.map(user =>
    //         user.id === selectedUser.id ? { ...user, role: user.role === 'customer' ? 'employee' : 'customer' } : user
    //     );
    //     setUsers(updatedUsers);
    //     setShowRoleChangeModal(false);
    // };

    const [users, setUsers] = useState([]);
    // const [showRoleChangeModal, setShowRoleChangeModal] = useState(false);
    // const [selectedUser, setSelectedUser] = useState(null);

    // Fetch users from the API on component mount
    useEffect(() => {
        axios.get('http://localhost:8080/admin/user')
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => {
                console.error('Error fetching users:', error);
            });
    }, []);


    const handleRoleChange = (user) => {
        setSelectedUser(user);
        setShowRoleChangeModal(true);
    };

    const handleChangeRole = () => {
        if (selectedUser.role === 'ADMIN') {
            // Do not allow role change for admin user
            setShowRoleChangeModal(false);
            return;
        }

        // Update the user's role and close the modal
        const updatedUsers = users.map(user =>
            user.userId === selectedUser.userId
                ? { ...user, role: user.role === 'EMPLOYEE' ? 'CUSTOMER' : 'EMPLOYEE' }
                : user
        );

        setUsers(updatedUsers);
        
        
        if (selectedUser.role !== 'ADMIN') {
            axios.put(`http://localhost:8080/admin/user/`, selectedUser)
        .then(response => {
                    console.log('User role updated successfully');
                })
                .catch(error => {
                    console.error('Error updating user role:', error);
                });
        }

        setShowRoleChangeModal(false);
    };












    // const handleRoleChange = (user) => {
    //     setSelectedUser(user);
    //     setShowRoleChangeModal(true);
    // };

    // const handleChangeRole = () => {
    //     // Update the user's role and close the modal
    //     const updatedUsers = users.map(user => user.userId === selectedUser.userId ? { ...user, role: selectedUser.role ==='CUSTOMER' ? 'EMPLOYEE' : 'CUSTOMER' } : user
    //     );
    //     setUsers(updatedUsers);
    //     // alert(selectedUser.role);
    //     axios.put(`http://localhost:8080/admin/user/${selectedUser.userId}`, { role: selectedUser.role }).then(response => {
    //         console.log('User role updated successfully');}).catch(error => {console.error('Error updating user role:', error);
    //     });
    //     setShowRoleChangeModal(false);
    // };
    const handleAddService = () => {
        // Send a POST request to add the new service
        axios.post('http://localhost:8080/admin/service', newService)
            .then(response => {
                // Add the new service to the state and close the modal
                setServices([...services, response.data]);
                setShowAddServiceModal(false);
                console.log('Service added successfully');
            })
            .catch(error => {
                console.error('Error adding service:', error);
            });
        setShowAddServiceModal(false);
    };



    // setShowRoleChangeModal(false);

    const [showEditServiceModal, setShowEditServiceModal] = useState(false);

    const [editingService, setEditingService] = useState(null);
    const [editedService, setEditedService] = useState({
        serviceName: '',
        description: '',
        price: 0
    });

    // const handleEditService = (service) => {
    //     setEditingService(service);
    //     setEditedService({
    //         serviceId: service.serviceId,
    //         serviceName: service.serviceName,
    //         description: service.description,
    //         price: service.price
    //     });
    //     setShowEditServiceModal(true);
    // };
    // const handleSaveEditedService = () => {
    //     alert(editedService.serviceName+" "+editedService.serviceId+" "+editedService.price)
    //     axios.put(`http://localhost:8080/admin/service/${editedService.serviceId}`, editedService)
    //         .then(response => {
    //             alert(response.data.price)
    //             // Update the service in the services state array
    //             const updatedServices = services.map(service =>
    //                 service.serviceId === editingService.serviceId ? { ...service, ...editedService } : service
    //             );
    //             setServices(updatedServices);
    //             console.log('Service edited and saved successfully');
    //         })
    //         .catch(error => {
    //             console.error('Error editing and saving service:', error);
    //         });

    //     setShowEditServiceModal(false);
    // };


    // ... (previous code)

const handleEditService = (service) => {
    setEditingService(service);
    setEditedService({  // Set initial editedService state with the values of the selected service
        serviceId: service.serviceId,
        serviceName: service.serviceName,
        description: service.description,
        price: service.price
    });
    setShowEditServiceModal(true);
};

const handleSaveEditedService = () => {

    axios.put(`http://localhost:8080/admin/service`, editedService)
        .then(response => {
            const updatedServices = services.map(service =>
                service.serviceId === editingService.serviceId ? { ...service, ...editedService } : service
            );
            setServices(updatedServices);
            console.log('Service edited and saved successfully');
        })
        .catch(error => {
            console.error('Error editing and saving service:', error);
        });

    setShowEditServiceModal(false);
};






    return (
        <div>
            <Tabs defaultActiveKey="customers" id="admin-tabs" className="mb-3" fill>
                <Tab eventKey="customers" title="Customers">
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                                <th>Phone Number</th>
                                <th>Role</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user.userId}>
                                    <td>{i++}</td>
                                    <td>{user.firstName}</td>
                                    <td>{user.lastName}</td>
                                    <td>{user.email}</td>
                                    <td>{user.phoneNumber}</td>
                                    <td>{user.role}</td>
                                    <td>
                                        <Button variant="primary" size="sm" onClick={() => handleRoleChange(user)}>
                                            Switch Role
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Tab>
                <Tab eventKey="services" title="Services">
                    <Button variant="success" className="mb-3" onClick={() => setShowAddServiceModal(true)}>
                        Add New Service
                    </Button>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Service Name</th>
                                <th>Description</th>
                                <th>Price</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {services.map(service => (
                                <tr key={service.serviceId}>
                                    <td>{j++}</td>
                                    <td>{service.serviceName}</td>
                                    <td>{service.description}</td>
                                    <td>{service.price}</td>
                                    <td>
                                        <Button variant="danger" size="sm" onClick={() => handleDeleteService(service.serviceId)}>
                                            Delete
                                        </Button>
                                        <Button
                                            variant="primary"
                                            size="sm"
                                            onClick={() => handleEditService(service)}
                                        >
                                            Edit
                                        </Button>

                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Tab>
            </Tabs>

            {/* Modal for Role Change */}
            <Modal show={showRoleChangeModal} onHide={() => setShowRoleChangeModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Switch User Role</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you want to switch the role of {selectedUser && selectedUser.firstName}?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowRoleChangeModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleChangeRole}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Modal for Adding New Service */}
            <Modal show={showAddServiceModal} onHide={() => setShowAddServiceModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Service</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="serviceName">
                            <Form.Label>Service Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter service name"
                                value={newService.serviceName}
                                onChange={(e) => setNewService({ ...newService, serviceName: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group controlId="description">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Enter description"
                                value={newService.description}
                                onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group controlId="price">
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter price"
                                value={newService.price}
                                onChange={(e) => setNewService({ ...newService, price: e.target.value })}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowAddServiceModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleAddService}>
                        Add Service
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showEditServiceModal} onHide={() => setShowEditServiceModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Service</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="editedServiceName">
                            <Form.Label>Service Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter service name"
                                value={editedService.serviceName}
                                onChange={(e) => setEditedService({ ...editedService, serviceName: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group controlId="editedDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Enter description"
                                value={editedService.description}
                                onChange={(e) => setEditedService({ ...editedService, description: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group controlId="editedPrice">
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter price"
                                value={editedService.price}
                                onChange={(e) => setEditedService({ ...editedService, price: e.target.value })}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowEditServiceModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleSaveEditedService}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>

        </div>
    );
}

export default AdminTables;
