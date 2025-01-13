import React, { useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap'
import PinSideNav from './PinSideNav'
import PinNavihation from './PinNavihation';

const PinSalary = () => {

    

  return (
    <>
      <Container fluid>
        <Row>
            <Col xs={1}>
                <PinSideNav selectedKey = "salary" />
            </Col>
            <Col xs={11}>
            <PinNavihation/>
                <div className="container-fluid mt-5">
                    <div className="row">
                        <div className="col-12">
                            <h1 className='n-text'>Salary</h1>
                            <p>Subscriber Name / Project Name / Salary</p>
                        </div>

                        <div className="col-12 mt-4">
                            <hr style={{borderTop:"1px solid"}}/>
                        </div>

                        <div className="col-12">
                          
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
