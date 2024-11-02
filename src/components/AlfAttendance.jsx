import React, { useState, useEffect } from 'react'
import AlfNavbar from './AlfNavbar'
import { FormControl, Form, Button, Container, Row, Col } from 'react-bootstrap'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import './AlfAttendance.css'
import AlfEachAttendance from './AlfEachAttendance'
import PinNavbar from './PinNavbar'
import PinSideNav from './PinSideNav'

const AlfAttendance = () => {
  const currentDate = new Date();
  const [selectedDate, setSelectedDate] = useState(currentDate);
  const [searchTerm, setSearchTerm] = useState("");
  const [totalSalaryPaid, setTotalSalaryPaid] = useState(0);
  
  const formattedDate = selectedDate.toLocaleDateString('en-GB'); 

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
          <div className='container-fluid'>
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
            </div>
          </div>
          </Col> 
        </Row>
      </Container>
      
      
    </>
  )
}

export default AlfAttendance

