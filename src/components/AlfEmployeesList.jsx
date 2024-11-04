//===================================== 4) input modal
import React, { useState } from 'react';
import AlfNavbar from './AlfNavbar';
import { Button, FormControl, Dropdown, Modal, Form, Container, Row, Col } from 'react-bootstrap';
import '../css/AlfAttendance.css';
import AlfEachEmployeeList from './AlfEachEmployeeList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import TrySideNav from './TrySideNav';

const AlfEmployeesList = () => {
  const [show, setShow] = useState(false);
  const [searchName, setSearchName] = useState('');
  const [searchPhone, setSearchPhone] = useState('');
  const [selectedDesignation, setSelectedDesignation] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [employeeDetails, setEmployeeDetails] = useState([
    { id: 101, name: 'name 1', designation: 'Labour', salaryPerShift: 700, phoneNumber: '1234567890' },
    { id: 102, name: 'name 2', designation: 'Electrician', salaryPerShift: 800, phoneNumber: '1258796403' },
    { id: 103, name: 'name 3', designation: 'Plumber', salaryPerShift: 750, phoneNumber: '5369785214' },
    { id: 104, name: 'name 4', designation: 'Supervisor', salaryPerShift: 900, phoneNumber: '7894523654' },
    { id: 105, name: 'name 5', designation: 'Plumber', salaryPerShift: 700, phoneNumber: '7895612348' },
  ]);

  // New Employee Form Fields
  const [newName, setNewName] = useState('');
  const [newDesignation, setNewDesignation] = useState('');
  const [newSalary, setNewSalary] = useState('');
  const [newPhone, setNewPhone] = useState('');

  const handleClose = () => {
    setShow(false);
    resetForm();
  };
  const handleShow = () => setShow(true);

  // Reset form fields
  const resetForm = () => {
    setNewName('');
    setNewDesignation('');
    setNewSalary('');
    setNewPhone('');
  };

  // Add new employee to the list
  const handleSave = () => {
    const newId = Math.max(...employeeDetails.map(emp => emp.id)) + 1;
    const newEmployee = {
      id: newId,
      name: newName,
      designation: newDesignation,
      salaryPerShift: Number(newSalary),
      phoneNumber: newPhone,
    };
    setEmployeeDetails([...employeeDetails, newEmployee]);
    handleClose();
  };

  // Filter, search, and sort employees
  const filteredEmployees = employeeDetails
    .filter(employee =>
      employee.name.toLowerCase().includes(searchName.toLowerCase()) &&
      employee.phoneNumber.includes(searchPhone) &&
      (selectedDesignation ? employee.designation === selectedDesignation : true)
    )
    .sort((a, b) => {
      if (sortOrder === 'asc') return a.salaryPerShift - b.salaryPerShift;
      if (sortOrder === 'desc') return b.salaryPerShift - a.salaryPerShift;
      return 0;
    });

  // Unique designations for dropdown
  const uniqueDesignations = [...new Set(employeeDetails.map(emp => emp.designation))];

  return (
    <>
      {/* <AlfNavbar /> */}

      <Container fluid>
        <Row>
          <Col xs={1}>
            <TrySideNav selectedKey = "employees"/>
          </Col>

          <Col xs={11}>
          <div className='container-fluid'>
        <div className='row'>
          <div className='col-12 text-center'>
            <h1>List of All Employees</h1>
          </div>

          <div className='col-12 col-md-3'>
            <FormControl
              type='text'
              placeholder='Search by Name'
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
            />
          </div>

          <div className='col-12 col-md-3'>
            <FormControl
              type='text'
              placeholder='Search by Phone Number'
              value={searchPhone}
              onChange={(e) => setSearchPhone(e.target.value)}
            />
          </div>

          <div className='col-12 col-md-2'>
            <Dropdown>
              <Dropdown.Toggle variant='primary'>
                {selectedDesignation || 'Filter by Designation'}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => setSelectedDesignation('')}>All</Dropdown.Item>
                {uniqueDesignations.map((designation, index) => (
                  <Dropdown.Item key={index} onClick={() => setSelectedDesignation(designation)}>
                    {designation}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </div>

          <div className='col-12 col-md-2'>
            <Dropdown>
              <Dropdown.Toggle variant='primary'>Sort by Salary</Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => setSortOrder('asc')}>Ascending</Dropdown.Item>
                <Dropdown.Item onClick={() => setSortOrder('desc')}>Descending</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>

          <div className='col-12 col-md-2'>
            <Button variant='primary' onClick={handleShow}>
              <FontAwesomeIcon icon={faPlus} /> Create New Employee
            </Button>
          </div>

          <div className='col-12 employee-card-style-table mt-5'>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Designation</th>
                  <th>Salary Per Shift</th>
                  <th>Phone Number</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.map(employee => (
                  <tr key={employee.id}>
                    <AlfEachEmployeeList
                      empId={employee.id}
                      empName={employee.name}
                      empDesignation={employee.designation}
                      empSalaryPerShift={employee.salaryPerShift}
                      empPhNo={employee.phoneNumber}
                    />
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

          

          

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId='formName'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter name'
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId='formDesignation'>
              <Form.Label>Designation</Form.Label>
              <Form.Control
                as='select'
                value={newDesignation}
                onChange={(e) => setNewDesignation(e.target.value)}
              >
                <option value=''>Select designation</option>
                <option value='Labour'>Labour</option>
                <option value='Electrician'>Electrician</option>
                <option value='Plumber'>Plumber</option>
                <option value='Supervisor'>Supervisor</option>
                <option value='Engineer'>Engineer</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId='formSalary'>
              <Form.Label>Salary Per Shift</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter salary'
                value={newSalary}
                onChange={(e) => setNewSalary(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId='formPhone'>
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter phone number'
                value={newPhone}
                onChange={(e) => setNewPhone(e.target.value.replace(/\D/g, ''))} // Only allows numbers
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>Close</Button>
          <Button variant='primary' onClick={handleSave}>Save Changes</Button>
        </Modal.Footer>
      </Modal>
          </Col>
        </Row>
      </Container>
      
    </>
  );
};

export default AlfEmployeesList;

