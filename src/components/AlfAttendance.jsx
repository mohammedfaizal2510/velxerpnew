import React, { useState, useEffect } from 'react'
import AlfNavbar from './AlfNavbar'
import { FormControl, Form, Button, Container, Row, Col , Modal} from 'react-bootstrap'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import '../css/AlfAttendance.css'
import AlfEachAttendance from './AlfEachAttendance'
import PinNavbar from './PinNavbar'
import PinSideNav from './PinSideNav'
import PinNavihation from './PinNavihation'

const AlfAttendance = () => {
  const currentDate = new Date();
  const [selectedDate, setSelectedDate] = useState(currentDate);
  const [searchTerm, setSearchTerm] = useState("");
  const [totalSalaryPaid, setTotalSalaryPaid] = useState(0);
  
  const formattedDate = selectedDate.toLocaleDateString('en-GB'); 

  const employeeDetails = [
    { id: 101, name: 'name 1', designation: 'Labour', salaryPerShift: 700, phoneNumber: '1234567890', totalSalary: 15000, doj:"", workingInSite:false,accessPrevAttendance: false, accessAddEmployee: false, accessEditSalary: false },
    { id: 102, name: 'name 2', designation: 'Electrician', salaryPerShift: 800, phoneNumber: '1258796403', totalSalary: 0,doj:"", workingInSite:false, accessPrevAttendance: false, accessAddEmployee: false, accessEditSalary: false },
    { id: 103, name: 'name 3', designation: 'Plumber', salaryPerShift: 750, phoneNumber: '5369785214', totalSalary: 7000,doj:"", workingInSite:false, accessPrevAttendance: false, accessAddEmployee: false, accessEditSalary: false },
    { id: 104, name: 'name 4', designation: 'Supervisor', salaryPerShift: 900, phoneNumber: '7894523654', totalSalary: 0,doj:"", workingInSite:false, accessPrevAttendance: false, accessAddEmployee: false, accessEditSalary: false },
    { id: 105, name: 'name 5', designation: 'Plumber', salaryPerShift: 700, phoneNumber: '7895612348', totalSalary: 10000,doj:"", workingInSite:false, accessPrevAttendance: false, accessAddEmployee: false, accessEditSalary: false },
  ];

  const [userAttendanceDetails, setUserAttendanceDetails] = useState([
    {
      id: 101,
      name: "Mohammed",
      salaryPerShift: 700,
      isPresent: false,
      shiftWorked: 0,
      totalPay: 0,
      salaryDate: formattedDate,
    },
    {
      id: 102,
      name: "Faizal",
      salaryPerShift: 700,
      isPresent: false,
      shiftWorked: 0,
      totalPay: 0,
      salaryDate: formattedDate,
    }
  ]);

  // Calculate total salary paid whenever attendance details are updated
  useEffect(() => {
    const total = userAttendanceDetails.reduce((sum, employee) => sum + employee.totalPay, 0);
    setTotalSalaryPaid(total);
  }, [userAttendanceDetails]);

  // Function to handle search
  const handleSearch = () => {
    return userAttendanceDetails.filter((employee) => employee.name.toLowerCase().includes(searchTerm.toLowerCase()));
  };

  //for add employee modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  

  return (
    <>
      {/* <AlfNavbar /> */}
      {/* <PinNavbar/> */}
      <Container fluid>
        <Row>
          <Col xs={1}>
            <PinSideNav selectedKey = "attendance"/>
          </Col>
          <Col xs={11}>
          <PinNavihation />
          <div className='container-fluid mt-5'>
            <div className="row">
              <div className="col-12 text-center">
                <h1 className='mb-3'>Mark Your Attendance Here</h1>
                <h3 className='d-inline pr-3'>Select The Date :</h3>
                {/* <DatePicker 
                selected={selectedDate} 
                onChange={(date) => setSelectedDate(  date)} className='mb-2'/> */}
                  {/* Date Picker */}
                <div className="date-picker-container d-inline mb-3">
                  <DatePicker
                    selected={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                    dateFormat="dd-MM-yyyy"
                    className="date-picker"
                    maxDate={new Date()}
                  />
                </div>
                {/* <h3 className='mb-3'>{formattedDate}</h3> */}
                <h4 className='mt-3'>Total Salary : ₹{totalSalaryPaid}</h4>
              </div>

              <div className='col-12 text-center mb-3' style={{ display: "flex", gap: "10px" }}>
                <FormControl type="text" placeholder="Search by name" onChange={(e) => setSearchTerm(e.target.value)} />
                <Button onClick={handleSearch}>Search</Button>
                <Button variant="primary" onClick={() => setShow(true)}>Add Employee</Button>
              </div>

              {handleSearch().length === 0 ? (
                <p>No Employees Found</p>
              ) : (
                handleSearch().map((eachEmployee, index) => (
                  <AlfEachAttendance
                    key={index}
                    id={eachEmployee.id}
                    name={eachEmployee.name}
                    salaryPerShift={eachEmployee.salaryPerShift}
                    isPresent={eachEmployee.isPresent}
                    shiftWorked={eachEmployee.shiftWorked}
                    totalPay={eachEmployee.totalPay}
                    salaryDate={eachEmployee.salaryDate}
                    setUserAttendanceDetails={setUserAttendanceDetails}
                  />
                ))
              )}

              <div className="col-12">

              <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                  <Modal.Title>Add Employees Available to this Site</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                          {/* list here all the availabe employees name and salary per shift from "employeeDetails" dataset 
                          if "employeeDetails.workingInSite" is true then the employee should not be able to select to this site to add the employee
                          if "employeeDetails.workingInSite" is false then the employee should be able to select to this site to add the employee
                          at the top of this modal show the filter for "designation" which shows all the available designation from the "employeeDetails" dataset and based on the designation the employee name ans salarypershift should be listed to select
                          then on clicking add button in the modal will call AlfEachAttendance and create the card to mark the attendance 
                           */}

                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>Close</Button>
                  <Button variant="primary" onClick={handleClose}>Add</Button>
                </Modal.Footer>
              </Modal> 
              </div>
            </div>
          </div>
          </Col> 
        </Row>
      </Container>
      
      
    </>
  )
}

export default AlfAttendance

