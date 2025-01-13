import React from 'react'
import { Button, Col, Container, Row, Dropdown  } from 'react-bootstrap'
import PinSideNav from './PinSideNav'
import TrySideNav from './TrySideNav'
import PinSalary from './PinSalary'


const AlfReport = () => {
  return (
    <>
        <Container fluid>
            <Row xs = {1}>
                <Col xs={1}>
                    <TrySideNav selectedKey = "report" />
                </Col>
                <Col xs={11}>
                    <div className="container-fluid">
                        <div className='row'>
                            <div className='col-12'>
                                <h1 className='n-text'>Reports</h1>
                                <p>Subscriber Name / Reports</p>
                            </div>

                            <div className="col-12">
                                <hr/>
                            </div>

                            <div className='col-12 col-md-2'>
                                <Dropdown>
                                    <Dropdown.Toggle variant='primary' className='neumorphic-dropdown'>
                                        Select Name
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu className='neumorphic-dropdown-menu'>
                                        <Dropdown.Item>Name - 1</Dropdown.Item>
                                        <Dropdown.Item>Name - 2</Dropdown.Item>
                                        <Dropdown.Item>Name - 3</Dropdown.Item>
                                        <Dropdown.Item>Name - 4</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>

                            <div className='col-12 col-md-2'>
                                <Dropdown>
                                    <Dropdown.Toggle variant='primary' className='neumorphic-dropdown'>
                                        Select Project
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu className='neumorphic-dropdown-menu'>
                                        <Dropdown.Item>Project - 1</Dropdown.Item>
                                        <Dropdown.Item>Project - 2</Dropdown.Item>
                                        <Dropdown.Item>Project - 3</Dropdown.Item>
                                        <Dropdown.Item>Project - 4</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>  

                            <div className='col-12 col-md-2'>
                                <Dropdown>
                                    <Dropdown.Toggle variant='primary' className='neumorphic-dropdown'>
                                        Select Material
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu className='neumorphic-dropdown-menu'>
                                        <Dropdown.Item>Material - 1</Dropdown.Item>
                                        <Dropdown.Item>Material - 2</Dropdown.Item>
                                        <Dropdown.Item>Material - 3</Dropdown.Item>
                                        <Dropdown.Item>Material - 4</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>  

                            <div className='col-12 col-md-2'>
                                <Dropdown>
                                    <Dropdown.Toggle variant='primary' className='neumorphic-dropdown'>
                                        Select Designation
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu className='neumorphic-dropdown-menu'>
                                        <Dropdown.Item>Role - 1</Dropdown.Item>
                                        <Dropdown.Item>Role - 2</Dropdown.Item>
                                        <Dropdown.Item>Role - 3</Dropdown.Item>
                                        <Dropdown.Item>Role - 4</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>  

                            <div className='col-12 col-md-2'>
                                <Dropdown>
                                    <Dropdown.Toggle variant='primary' className='neumorphic-dropdown'>
                                        Select Project
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu className='neumorphic-dropdown-menu'>
                                        <Dropdown.Item>Projact - 1</Dropdown.Item>
                                        <Dropdown.Item>Projact - 2</Dropdown.Item>
                                        <Dropdown.Item>Projact - 3</Dropdown.Item>
                                        <Dropdown.Item>Projact - 4</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>  
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    </>
  )
}

export default AlfReport


// employee = {
//     name string,
//     role string,
//     salary Number,
//     dateOfJoinning date,
//     phone string,
//     email string,
//     site [id]
// }


// employee Salary Report
//     name
//     salary per shift

// Project Site report
// Material report