import React, { useState } from 'react'
import AlfNavbar from './AlfNavbar'
import '../css/AlfInventry.css'
import { Button, Col, Container, Row } from 'react-bootstrap'
import TrySideNav from './TrySideNav'

const AlfInventry = () => {
  const [availableInventry, setAvailableInventry] = useState(
    [
      {inId: 10001, inName: "Cement", quant:10, unit: '', inImg:"https://res.cloudinary.com/dzysiltcv/image/upload/v1731402024/velx/cement_pxdann.jpg"},
      {inId: 10002, inName: "M Sand", quant:0, unit: '', inImg:"https://res.cloudinary.com/dzysiltcv/image/upload/v1731402024/velx/black_sand_g5tzmg.jpg"},
      {inId: 10003, inName: "P Sand", quant:0, unit: '', inImg:"https://res.cloudinary.com/dzysiltcv/image/upload/v1731402024/velx/black_sand_g5tzmg.jpg"},
      {inId: 10004, inName: "River Sand", quant:0, unit: '', inImg:"https://res.cloudinary.com/dzysiltcv/image/upload/v1731402024/velx/M_Sand_bhyg8o.jpg"},
      {inId: 10005, inName: "Gravel", quant:0, unit: '', inImg:""},
      {inId: 10006, inName: "Slurry",quant:0, unit: '',  inImg:""},
      {inId: 10007, inName: "Aggregate", quant:0, unit: '', inImg:""},
      {inId: 10008, inName: "Brick", quant:0, unit: '', inImg:""},
      {inId: 10009, inName: "Block", quant:0, unit: '', inImg:""},
      {inId: 10010, inName: "Sheet", quant:0, unit: '', inImg:""},
      {inId: 10011, inName: "Steel Bar", quant:0, unit: '', inImg:""},
      {inId: 10012, inName: "Wire", quant:0, unit: '', inImg:"https://res.cloudinary.com/dzysiltcv/image/upload/v1731402575/velx/wire_rqqddx.jpg"},
    ]
  )
  return (
    <>
      {/* <AlfNavbar/> */}
      <Container fluid>
        <Row>
          <Col xs={1}>
            <TrySideNav selectedKey="inventory"/>
          </Col>
          <Col xs={11}>
          <div className='container-fluid'>
            <div className='row'>
              <div className='col-12 text-center'>
                <h3>Showcase What you have</h3>
              </div>

              {availableInventry.length === 0 ? (
                <p>No Available Products</p>
              ) : (
                availableInventry.map((eachInventry) => (
                  <div className='col-12 col-sm-6 col-md-4 col-lg-3'>
                    <div className='inventry-catrd text-center'>
                      <img src={eachInventry.inImg} className='w-75 mt-3 mb-3' style={{borderRadius:"50%"}} alt='Loading...'/>
                      <h3>{eachInventry.inName}</h3> 
                      <h3>{eachInventry.inStock ? (
                        <p>Stock Avaulable</p>
                      ) : (
                        <p>Out Of Stock</p>
                      )}</h3>
                    </div>
                  </div>
                ))
              )}

              {/* <div className='col-12 col-sm-6 col-md-4 col-lg-3'>
                <div className='inventry-catrd text-center'>
                  <img src='https://res.cloudinary.com/dzysiltcv/image/upload/v1731402024/velx/cement_pxdann.jpg' className='w-100' style={{borderRadius:"10px"}} alt='Loading...'/>
                  <h3>{availableInventry[0].inName}</h3>
                  <h3>In stock</h3>
                </div>
              </div>

              <div className='col-12 col-sm-6 col-md-4 col-lg-3'>
                <div className='inventry-catrd text-center'>
                  <img src='https://res.cloudinary.com/dzysiltcv/image/upload/v1728896383/Velx-logo_targ2r.png' alt='Loading...'/>
                  <h3>Cement</h3>
                  <h3>Available Quantity</h3>
                </div>
              </div>

                <div className='inventry-catrd text-center'>
                  <img src='https://res.cloudinary.com/dzysiltcv/image/upload/v1728896383/Velx-logo_targ2r.png' alt='Loading...'/>
                  <h3>Cement</h3>
                  <h3>Available Quantity</h3>
                </div>
              </div>

              <div className='col-12 col-sm-6 col-md-4 col-lg-3'>
                <div className='inventry-catrd text-center'>
                  <img src='https://res.cloudinary.com/dzysiltcv/image/upload/v1728896383/Velx-logo_targ2r.png' alt='Loading...'/>
                  <h3>Cement</h3>
                  <h3>Available Quantity</h3>
                </div>
              </div> */}
            </div>
          </div>
          </Col>
        </Row>
      </Container>
      
    </>
  )
}

export default AlfInventry
