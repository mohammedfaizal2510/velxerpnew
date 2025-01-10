//===================================== 4) input modal
import React, { useState, useEffect } from 'react';
import AlfNavbar from './AlfNavbar';
import { Button, FormControl, Dropdown, Modal, Form, Container, Row, Col } from 'react-bootstrap';
import '../css/AlfAttendance.css';
import AlfEachEmployeeList from './AlfEachEmployeeList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit } from '@fortawesome/free-solid-svg-icons';
import TrySideNav from './TrySideNav';
import axios from 'axios';

const AlfEmployeesList = () => {
  const [show, setShow] = useState(false);
  const [searchName, setSearchName] = useState('');
  const [searchPhone, setSearchPhone] = useState('');
  const [selectedDesignation, setSelectedDesignation] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [uname, setuna] = useState('');
  const [employeeDetails, setEmployeeDetails] = useState([]);


  useEffect(() => {
        axios.get(`${import.meta.env.VITE_SER}emp`,{headers:{auth:sessionStorage.getItem('auth')}}).then(t=>{
            setEmployeeDetails(t.data)
        })
  }, []);


  const [accessPrevAttendance, setaccessPrevAttendance] = useState(false);
  const [accessAddEmployee, setaccessAddEmployee] = useState(false);
  const [accessEditSalary, setaccessEditSalary] = useState(false);

  // New Employee Form Fields
  const [newName, setNewName] = useState('');
  const [newDesignation, setNewDesignation] = useState('');
  const [newSalary, setNewSalary] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newPassword, setNewPassword] = useState('');


  
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
        emp._id === selectedEmployee._id ? {...emp, totalSalary: emp.totalSalary - parseInt(payAmount) } : emp
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
    setNewPassword('');
        setuna('');
    setaccessPrevAttendance(false);
    setaccessAddEmployee(false);
    setaccessEditSalary(false);

    setIsEditing(false);
    setEditingEmployeeId(null);

  };

  // Add new employee to the list
  const handleSave = () => {
    if (isEditing){
            axios.put(`${import.meta.env.VITE_SER}emp`,{name: newName,
          designation: newDesignation,
          salaryPerShift: Number(newSalary),
          phoneNumber: newPhone,
          pass: newPassword,
          accessPrevAttendance,
          accessAddEmployee,uname,
          accessEditSalary},{headers:{admin:sessionStorage.getItem("admin") || sessionStorage.getItem("auth"),auth:sessionStorage.getItem('auth'),edit:editingEmployeeId}}).then(t=>{
                    setEmployeeDetails(p=>p.map(e=>e._id==editingEmployeeId?t.data:e))
                })
    }
    else{
      const newEmployee = {
        name: newName,
        designation: newDesignation,
        salaryPerShift: Number(newSalary),
        phoneNumber: newPhone,
        pass: newPassword,
        totalSalary: 0,
                uname,
        accessPrevAttendance: accessPrevAttendance,
        accessAddEmployee: accessAddEmployee,
        accessEditSalary: accessEditSalary,
      };
            axios.get(`${import.meta.env.VITE_SER}ava`,{headers:{auth:uname}}).then(()=>{
            axios.post(`${import.meta.env.VITE_SER}emp`,newEmployee,{headers:{admin:sessionStorage.getItem("admin") || sessionStorage.getItem("auth"),auth:sessionStorage.getItem('auth')}}).then(t=>{
                t.data == '👍' && setEmployeeDetails([...employeeDetails, newEmployee]);
            })
            }).catch(()=>{
                    // user name taken
                })
    }
    handleClose();
  };


  const handleEdit = (employee) => {
    setIsEditing(true);
    setEditingEmployeeId(employee._id);
    setNewName(employee.name);
    setNewDesignation(employee.designation);
    setNewSalary(employee.salaryPerShift);
    setNewPhone(employee.phoneNumber);
    setNewPassword(employee.password);
    setaccessPrevAttendance(employee.accessPrevAttendance);
    setaccessAddEmployee(employee.accessAddEmployee);
    setaccessEditSalary(employee.accessEditSalary);
    handleShow();
  };

  // Filter, search, and sort employees
  const filteredEmployees = employeeDetails?.filter(employee =>
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

          <div className='col-12 employee-card-style-table mt-5 neumorphic-container'>
            <table className='neumorphic-table'>
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
                  <tr key={employee._id}>
                    <AlfEachEmployeeList
                      empId={employee._id}
                      empName={employee.name}
                      empDesignation={employee.designation}
                      empSalaryPerShift={employee.salaryPerShift}
                      empPhNo={employee.phoneNumber}
                      totalpay = {employee.totalpay}
                    />
                    <td>
                      <button className='mr-2 project-button p-2 pl-3 pr-3' onClick={() => handlePayModalShow(employee)}>pay</button>
                      <button className="project-button p-2 pl-3 pr-3 " onClick={() => handleEdit(employee)}><FontAwesomeIcon icon={faEdit} />Edit</button>
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

            <Form.Group controlId='formName'>
              <Form.Label>UserName</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter name'
                value={uname}
                onChange={(e) => setuna(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Enter password'
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
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
            
          </Col>
        </Row>
      </Container>
      
    </>
  );
};

export default AlfEmployeesList ;


