import React, { useState } from 'react'
import AlfNavbar from './AlfNavbar'
import '../css/AlfInventry.css'
import { Button, Col, Container, Row } from 'react-bootstrap'
import TrySideNav from './TrySideNav'

const AlfInventry = () => {
  const [availableInventry, setAvailableInventry] = useState(
    [
      {inId: 1001, inName: "Cement", inStock:true, inImg:"https://res.cloudinary.com/dzysiltcv/image/upload/v1731402024/velx/cement_pxdann.jpg"},
      {inId: 1002, inName: "M Sand", inStock:true, inImg:"https://res.cloudinary.com/dzysiltcv/image/upload/v1731402024/velx/black_sand_g5tzmg.jpg"},
      {inId: 1003, inName: "P Sand", inStock:true, inImg:"https://res.cloudinary.com/dzysiltcv/image/upload/v1731402024/velx/black_sand_g5tzmg.jpg"},
      {inId: 1004, inName: "River Sand", inStock:true, inImg:"https://res.cloudinary.com/dzysiltcv/image/upload/v1731402024/velx/M_Sand_bhyg8o.jpg"},
      {inId: 1005, inName: "Gravel", inStock:true, inImg:""},
      {inId: 1006, inName: "Slurry",inStock:true,  inImg:""},
      {inId: 1007, inName: "Aggregate", inStock:true, inImg:""},
      {inId: 1008, inName: "Brick", inStock:true, inImg:""},
      {inId: 1009, inName: "Block", inStock:true, inImg:""},
      {inId: 1010, inName: "Sheet", inImg:""},
      {inId: 1011, inName: "Steel Bar", inStock:true, inImg:""},
      {inId: 1012, inName: "Wire", inStock:true, inImg:"https://res.cloudinary.com/dzysiltcv/image/upload/v1731402575/velx/wire_rqqddx.jpg"},
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
