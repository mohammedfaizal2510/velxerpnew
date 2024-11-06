//===================================== 4) input modal
import React, { useState } from 'react';
import AlfNavbar from './AlfNavbar';
import { Button, FormControl, Dropdown, Modal, Form, Container, Row, Col } from 'react-bootstrap';
import '../css/AlfAttendance.css';
import AlfEachEmployeeList from './AlfEachEmployeeList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit } from '@fortawesome/free-solid-svg-icons';
import TrySideNav from './TrySideNav';

const AlfEmployeesList = () => {
  const [show, setShow] = useState(false);
  const [searchName, setSearchName] = useState('');
  const [searchPhone, setSearchPhone] = useState('');
  const [selectedDesignation, setSelectedDesignation] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [employeeDetails, setEmployeeDetails] = useState([
    { id: 101, name: 'name 1', designation: 'Labour', salaryPerShift: 700, phoneNumber: '1234567890', totalSalary: 15000, accessPrevAttendance: false, accessAddEmployee: false, accessEditSalary: false },
    { id: 102, name: 'name 2', designation: 'Electrician', salaryPerShift: 800, phoneNumber: '1258796403', totalSalary: 0, accessPrevAttendance: false, accessAddEmployee: false, accessEditSalary: false },
    { id: 103, name: 'name 3', designation: 'Plumber', salaryPerShift: 750, phoneNumber: '5369785214', totalSalary: 7000, accessPrevAttendance: false, accessAddEmployee: false, accessEditSalary: false },
    { id: 104, name: 'name 4', designation: 'Supervisor', salaryPerShift: 900, phoneNumber: '7894523654', totalSalary: 0, accessPrevAttendance: false, accessAddEmployee: false, accessEditSalary: false },
    { id: 105, name: 'name 5', designation: 'Plumber', salaryPerShift: 700, phoneNumber: '7895612348', totalSalary: 10000, accessPrevAttendance: false, accessAddEmployee: false, accessEditSalary: false },
  ]);

  const [accessPrevAttendance, setaccessPrevAttendance] = useState(false);
  const [accessAddEmployee, setaccessAddEmployee] = useState(false);
  const [accessEditSalary, setaccessEditSalary] = useState(false);

  // New Employee Form Fields
  const [newName, setNewName] = useState('');
  const [newDesignation, setNewDesignation] = useState('');
  const [newSalary, setNewSalary] = useState('');
  const [newPhone, setNewPhone] = useState('');


  
// for edit employee details 
  const [isEditing, setIsEditing] = useState(false); 
  const [editingEmployeeId, setEditingEmployeeId] = useState(null);


  // pay for employee 
  const [payModalShow, setPayModalShow] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [payAmount, setPayAmount] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  const handlePayModalClose = () => {
    setPayModalShow(false);
    setPayAmount('');
    setSelectedEmployee(null);
    setAlertMessage('');
  }

  const handlePayModalShow = (employee) => {
    setSelectedEmployee(employee);
    setPayModalShow(true);
  };

  const handlePaySave = () => {
    if (parseInt(payAmount) > selectedEmployee.totalSalary) {
      setAlertMessage("Entered amount is greater than the total salary available to pay.");
    }
    else{
      const updatedEmployees = employeeDetails.map(emp => 
        emp.id === selectedEmployee.id ? {...emp, totalSalary: emp.totalSalary - parseInt(payAmount) } : emp
      );
      setEmployeeDetails(updatedEmployees);
      handlePayModalClose();

    }
  }



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
    if (isEditing){
      setEmployeeDetails(employeeDetails.map(emp => 
        emp.id === editingEmployeeId? {...emp, name: newName, designation: newDesignation, salaryPerShift: Number(newSalary), phoneNumber: newPhone} : emp
      ));
    }
    else{
      const newId = Math.max(...employeeDetails.map(emp => emp.id)) + 1;
      const newEmployee = {
        id: newId,
        name: newName,
        designation: newDesignation,
        salaryPerShift: Number(newSalary),
        phoneNumber: newPhone,
        totalSalary: 0,
        accessPrevAttendance: accessPrevAttendance,
        accessAddEmployee: accessAddEmployee,
        accessEditSalary: accessEditSalary,
      };
      setEmployeeDetails([...employeeDetails, newEmployee]);
    }
    handleClose();
  };


  const handleEdit = (employee) => {
    setIsEditing(true);
    setEditingEmployeeId(employee.id);
    setNewName(employee.name);
    setNewDesignation(employee.designation);
    setNewSalary(employee.salaryPerShift);
    setNewPhone(employee.phoneNumber);
    handleShow();
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
              <Dropdown.Toggle variant='primary'>Sort by Pay</Dropdown.Toggle>
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
                  <th>Salary</th>
                  <th>Phone Number</th>
                  <th>Actions</th>
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
                      totalSalary = {employee.totalSalary}
                    />
                    <td>
                      <Button className='mr-2' onClick={() => handlePayModalShow(employee)}>pay</Button>
                      <Button onClick={() => handleEdit(employee)}><FontAwesomeIcon icon={faEdit} />Edit</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

          

          

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditing? "Edit Employee" : "Create New Employee"}</Modal.Title>
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


            {newDesignation === 'Supervisor'? (
              <div>
                <hr></hr>
                <Form.Group>
                  <Form.Label></Form.Label>
                  <Form.Check
                    type='checkbox'
                    label='Give Access to Attendancex'
                    checked={accessPrevAttendance}
                    onChange={(e) => setaccessPrevAttendance(e.target.checked)}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label></Form.Label>
                  <Form.Check
                    type='checkbox'
                    label='Give Access to Add Employee'
                    checked={accessAddEmployee}
                    onChange={(e) => setaccessAddEmployee(e.target.checked)}
                    className='custom-checkbox-style'
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label></Form.Label>
                  <Form.Check
                    type='checkbox'
                    label='Give Access to Edit Salary'
                    checked={accessEditSalary}
                    onChange={(e) => setaccessEditSalary(e.target.checked)}
                  />
                </Form.Group>
                <hr></hr>
              </div>
            ) : (null)}
            
            {/* checked={enableAttendance} */}
                {/* onChange={(e) => setEnableAttendance(e.target.checked)} */}
                {/* </Form.Check> */}
            

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
          <Button variant='primary' onClick={handleSave}>{isEditing?'Save Changes':'Create Employee'}</Button>
        </Modal.Footer>
      </Modal>


      {/* Payment Modal */}
      <Modal show={payModalShow} onHide={handlePayModalClose}>
              <Modal.Header closeButton>
                <Modal.Title>Pay Employee</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {alertMessage && <Alert variant="danger">{alertMessage}</Alert>}
                <p>Total Salary Available to Pay: {selectedEmployee ? selectedEmployee.totalSalary : 0}</p>
                <Form.Group controlId="payAmount">
                  <Form.Label>Enter Amount to Pay</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter amount"
                    value={payAmount}
                    onChange={(e) => setPayAmount(e.target.value)}
                  />
                </Form.Group>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handlePayModalClose}>Close</Button>
                <Button variant="primary" onClick={handlePaySave}>Save Payment</Button>
              </Modal.Footer>
            </Modal>



      {/* <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditing? "Edit Employee" : "Create New Employee"}</Modal.Title>
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
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>Close</Button>
          <Button variant='primary' onClick={handleClose}>save</Button>
        </Modal.Footer>
      </Modal> */}
          </Col>
        </Row>
      </Container>
      
    </>
  );
};

export default AlfEmployeesList ;


