import React from 'react'
import PinNavbar from './PinNavbar'
import { Col, Container, Row } from 'react-bootstrap'
import PinSideNav from './PinSideNav'

const PinMaterialReques = () => {
  return (
    <>
      {/* <PinNavbar/> */}
      <Container>
        <Row>
          <Col xs={1}>
            {/* <PinNavbar /> */}
            <PinSideNav selectedKey = "requestmaterial"/>
          </Col>
          <Col xs={11}>
          <div className="container-fluid">
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
