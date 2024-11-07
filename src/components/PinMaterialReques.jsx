import React from 'react'
import PinNavbar from './PinNavbar'
import { Col, Container, Row } from 'react-bootstrap'
import PinSideNav from './PinSideNav'
import PinNavihation from './PinNavihation'

const PinMaterialReques = () => {
  return (
    <>
      {/* <PinNavbar/> */}
      <Container fluid>
        <Row>
          <Col xs={1}>
            {/* <PinNavbar /> */}
            <PinSideNav selectedKey = "requestmaterial"/>
          </Col>
          <Col xs={11}>
          <PinNavihation/>
          <div className="container-fluid mt-5">
            <div className="row">
              <div className="col-12">
                <h1 className='text-center'>Request Materials</h1>
                <hr></hr>
              </div>

              <div className="col-12">
                <h1 className='text-center'>Materials In Site</h1>
                <hr></hr>
              </div>
            </div>
          </div>
          </Col>
        </Row>
      </Container>
      
    </>
  )
}

export default PinMaterialReques
