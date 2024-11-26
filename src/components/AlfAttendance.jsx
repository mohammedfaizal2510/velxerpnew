// =========================3) removes the already added employees in the modal dropdown 
import React, { useState, useEffect } from 'react';
import { FormControl, Button, Container, Row, Col, Modal, Dropdown } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import AlfEachAttendance from './AlfEachAttendance';
import PinSideNav from './PinSideNav';
import PinNavihation from './PinNavihation';
import {useLocation, } from 'react-router-dom'
import axios from 'axios';
const AlfAttendance = () => {
    const loc = useLocation();
  const currentDate = new Date();
  const [selectedDate, setSelectedDate] = useState(currentDate);
  const [searchTerm, setSearchTerm] = useState("");
  const [totalSalaryPaid, setTotalSalaryPaid] = useState(0);
  const [userAttendanceDetails, setUserAttendanceDetails] = useState([]);
  const [show, setShow] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const [availableEmployees,set] = useState([]);
  // const employeeDetails = JSON.parse(localStorage.getItem('employeeDetails'));
  
  const formattedDate = selectedDate.toLocaleDateString('en-GB'); 

  // Load from localStorage on mount
  useEffect(() => {
        axios.get(`${import.meta.env.VITE_SER}emps`,{headers:{auth:loc.state.att}}).then(t=>t.data).then(setUserAttendanceDetails)
        axios.get(`${import.meta.env.VITE_SER}uck`,{headers:{auth:sessionStorage.getItem('auth')}}).then(t=>t.data.emplyee.filter(v=>loc.state.att?!loc.state.att.includes(v):true)).then(d=>{
        axios.get(`${import.meta.env.VITE_SER}emps`,{headers:{auth:d}}).then(t=>t.data.filter(v=>v.designation!='Supervisor')).then(set)
        })
  }, []);

  // Save to localStorage whenever userAttendanceDetails updates
  // useEffect(() => {
  //   localStorage.setItem('userAttendanceDetails', JSON.stringify(userAttendanceDetails));
  //   const total = userAttendanceDetails.reduce((sum, employee) => sum + employee.totalPay, 0);
  //   setTotalSalaryPaid(total);
  // }, [userAttendanceDetails]);

  // Function to handle search
  const handleSearch = () => {
    return userAttendanceDetails.filter((employee) =>
      employee.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Filter out already added employees
  const addEmployee = () => {
    if (selectedEmployee) {
      const employee = employeeDetails.find(emp => emp._id == selectedEmployee);
      if (employee) {
        setUserAttendanceDetails(prevDetails => [
          ...prevDetails,
          {
            id: employee.id,
            name: employee.name,
            salaryPerShift: employee.salaryPerShift,
            isPresent: false,
            shiftWorked: 0,
            totalPay: 0,
            salaryDate: formattedDate,
          },
        ]);
      }
      setShow(false);
      setSelectedEmployee(null);
    }
  };

  return (
    <>
      <Container fluid>
        <Row>
          <Col xs={1}>
            <PinSideNav selectedKey="attendance" />
          </Col>
          <Col xs={11}>
            <PinNavihation />
            <div className='container-fluid mt-5'>
              <div className="row">
                <div className="col-12 text-center">
                  <h1 className='mb-3'>Mark Your Attendance Here</h1>
                  <h3 className='d-inline pr-3'>Select The Date :</h3>
                  <div className="date-picker-container d-inline mb-3">
                    <DatePicker
                      selected={selectedDate}
                      onChange={(date) => setSelectedDate(date)}
                      dateFormat="dd-MM-yyyy"
                      className="date-picker"
                      maxDate={new Date()}
                    />
                  </div>
                </div>

                <div className='col-12 text-center mb-3' style={{ display: "flex", gap: "10px" }}>
                  <FormControl type="text" placeholder="Search by name" onChange={(e) => setSearchTerm(e.target.value)} />
                  <Button onClick={handleSearch}>Search</Button>
                  <Button variant="primary" onClick={handleShow}>Add Employee</Button>
                </div>

                {handleSearch().length === 0 ? (
                  <p>No Employees Found</p>
                ) : (
                  handleSearch().map((eachEmployee, index) => (
                    <AlfEachAttendance
                      key={index}
                      {...eachEmployee}
                      setUserAttendanceDetails={setUserAttendanceDetails}
                    />
                  ))
                )}

                <Modal show={show} onHide={handleClose}>
                  <Modal.Header>
                    <Modal.Title>Add Employee to Attendance</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Dropdown onSelect={(e) => setSelectedEmployee(e)}>
                      <Dropdown.Toggle variant="success" id="dropdown-basic">
                        Select Employee
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        {availableEmployees.map((employee) => (
                          <Dropdown.Item key={employee._id} eventKey={employee._id}>
                            {employee.name} (ID: {employee._id})
                          </Dropdown.Item>
                        ))}
                      </Dropdown.Menu>
                    </Dropdown>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                    <Button variant="primary" onClick={addEmployee}>Add</Button>
                  </Modal.Footer>
                </Modal>
              </div>
            </div>
          </Col> 
        </Row>
      </Container>
    </>
  )
}

export default AlfAttendance;

