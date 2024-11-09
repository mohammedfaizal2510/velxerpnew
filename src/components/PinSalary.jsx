import React, { useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap'
import PinSideNav from './PinSideNav'

const PinSalary = () => {

    

  return (
    <>
      <Container fluid>
        <Row>
            <Col xs={1}>
                <PinSideNav selectedKey = "salary" />
            </Col>
            <Col xs={11}>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12 text-center">
                            <h1>Salary Management</h1>
                        </div>
                    </div>
                </div>
            </Col>
        </Row>
      </Container>
    </>
  )
}

export default PinSalary
